const sevenZip = require('7zip-min');
const child = require('child_process');
const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const appPath = require('../js/appPath');
const formats = require('../js/format');
const spinner = require('../js/spinner');

const isProtoype = (json, key) => Object.prototype.hasOwnProperty.call(json, key);

class mapcraftPackage
{
	constructor(json)
	{
		this.json = json;
		this.pluginsPath = appPath();
		this.components = JSON.parse(fs.readFileSync(path.join(this.pluginsPath, 'components.json')));
		this.list = [];
		for (const el of this.components)
			if (isProtoype(el, 'name') && isProtoype(el, 'uuid'))
				this.list.push({
					title: el.name,
					uuid: el.uuid,
					directory: `${el.name}_${el.uuid}`,
				});
		this.#main();
	}

	#main()
	{
		console.log(`📦 ${formats.format.underline}${formats.foreground.light.green}Package${formats.format.reset} 📦`);
		console.log(`${formats.foreground.light.cyan}Convert your plugin into a format that can be easily installed by Mapcraft users${formats.format.reset}\n`);
		prompts({
			type: 'select',
			name: 'plugin',
			message: 'Which plugin do you want to convert',
			choices: this.list,
			initial: 0,
		}).then((data) =>
		{
			spinner.start('The package is being created');
			const selectedPlugin = this.list[data.plugin];
			let dirPath = path.join(this.pluginsPath, selectedPlugin.directory);
			if (!fs.statSync(dirPath))
				dirPath = path.join(this.pluginsPath, selectedPlugin.title);
			fs.rm(path.join(this.pluginsPath, dirPath, 'node_modules'), { recursive: true, force: true }, (err) =>
			{
				if (err)
					throw new Error(err.message);
				child.exec(
					'yarn install --production=true',
					{
						cwd: dirPath,
						shell: true,
						windowsHide: true,
					},
				).on('exit', (code) =>
				{
					if (code !== 0)
					{
						console.error(`❌ Child command 'yarn' failed with ${code} error code`);
						process.exit(code);
					}
					sevenZip.pack(`${dirPath}/*`, path.join(dirPath, `${selectedPlugin.title}.mapcraft`), (err2) =>
					{
						spinner.stop();
						process.stdout.clearLine();
						process.stdout.cursorTo(0);
						if (err2)
							throw new Error(err2.message);
						console.log('🚀 The plugin is packaged !');
						console.log(`📪 You can find it at ${formats.format.underline}${path.join(dirPath, 'package.mapcraft')}${formats.format.reset}`);
						process.exit(0);
					});
				});
			});
		});
	}
}

module.exports = mapcraftPackage;
