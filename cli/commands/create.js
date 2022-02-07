const child = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const prompts = require('prompts');
const path = require('path');
const appPath = require('../js/appPath');
const spinner = require('../js/spinner');
const formats = require('../js/format');
const models = require('../models');
const { questions } = require('../questions');

class create
{
	constructor(json)
	{
		this.json = json;
		this.pluginsPath = appPath();
		this.newPluginPath = this.pluginsPath;
		this.newUUID = crypto.randomUUID();
		this.models = {
			package: models.package,
			component: models.component,
		};

		console.log(`💠 ${formats.format.underline}${formats.foreground.light.green}Plugin creator${formats.format.reset} 💠`);
		console.log(`${formats.foreground.light.cyan}Welcome to the plugin creator. Simply answer the questions asked to create a solid base, and start developing without wasting time${formats.format.reset}\n`);
		prompts(questions).then((data) =>
		{
			this.newPluginPath = path.join(appPath(), data.name);
			try
			{
				fs.mkdirSync(this.newPluginPath, { recursive: false });
				this.#main(data);
			}
			catch (err)
			{
				throw new Error(err.message);
			}
		});
	}

	#main(data)
	{
		spinner.start('The plugin is being created', 'bar');
		if (data.license.link !== undefined)
			this.#getLicense(data.license);
		else
			fs.writeFile(
				path.join(this.newPluginPath, 'LICENSE'),
				'don\'t forget to put your license here. If you don\'t want to put a license, just delete this file',
				{
					encoding: 'utf-8',
					flag: 'w',
				},
				(err) =>
				{
					if (err)
						throw new Error(err.message);
				},
			);

		for (const el in data)
			if (Object.prototype.hasOwnProperty.call(data, el))
				if (el === 'license')
					this.models.package[el] = data[el].name;
				else
					this.models.package[el] = data[el];
		this.models.package.uuid = this.newUUID;
		this.models.package.icon = 'icon.png';
		this.models.package.bin.command = data.name;
		this.models.package.bin.component = data.component;
		this.models.package.bin.lang = data.lang;

		this.models.component.name = data.name;
		this.models.component.uuid = this.newUUID;
		this.models.component.component = data.component;
		this.models.component.active = Boolean(true);
		this.models.component.isNotification = data.isNotification;
		this.models.component.lang = data.lang;

		this.#components(data);
	}

	#getLicense(license)
	{
		let blob = '';
		https.get(license.link, (res) =>
		{
			res.on('data', (d) =>
			{
				blob += d;
			});
			res.on('end', () =>
			{
				fs.writeFile(
					path.join(this.newPluginPath, 'LICENSE'),
					license.regex.exec(blob).groups.license,
					{
						encoding: 'utf-8',
						flag: 'w',
					},
					(err) =>
					{
						if (err)
							throw new Error(err.message);
					},
				);
			});
		});
	}

	#components(data)
	{
		const json = JSON.parse(fs.readFileSync(path.join(this.pluginsPath, 'components.json'), { encoding: 'utf-8', flag: 'r' }));
		json.push(this.models.component);

		fs.mkdirSync(path.join(this.newPluginPath, data.lang), { recursive: false });
		fs.writeFileSync(path.join(this.pluginsPath, 'components.json'), JSON.stringify(json, null, 4), { encoding: 'utf-8', flag: 'w', mode: 0o666 });
		fs.writeFileSync(path.join(this.newPluginPath, data.component), models.mainjs(data.name), { encoding: 'utf-8', mode: 0o666, flag: 'w' });
		fs.writeFileSync(path.join(this.newPluginPath, `${data.name}.tp`), models.maintp, { encoding: 'utf-8', mode: 0o666, flag: 'w' });
		fs.writeFileSync(path.join(this.newPluginPath, 'shell.js'), models.mainshell, { encoding: 'utf-8', mode: 0o666, flag: 'w' });
		fs.writeFileSync(path.join(this.newPluginPath, 'package.json'), JSON.stringify(this.models.package, null, 4), { encoding: 'utf-8', mode: 0o666, flag: 'w' });

		const newJsonLang = models.lang;
		newJsonLang.Title = data.title;
		newJsonLang.Icon = 'code';
		newJsonLang.Notification = `Here is a notification from ${data.title}`;
		newJsonLang.Data.CustomVar = `Hello from ${data.title}`;
		fs.writeFileSync(path.join(this.newPluginPath, data.lang, 'en_US.json'), JSON.stringify(newJsonLang, null, 4), { encoding: 'utf-8', mode: 0o666, flag: 'w' });

		spinner.stop();
		spinner.start('Installation of the required packages', 'bar');
		child.exec(
			'yarn install --production=true',
			{
				cwd: this.newPluginPath,
				shell: true,
				windowsHide: true,
			},
		).on('exit', (code) =>
		{
			spinner.stop();
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			if (code !== 0)
			{
				console.error(`❌ Child command 'yarn' failed with ${code} error code`);
				process.exit(code);
			}
			console.log('🚀 The plugin is ready !');
			console.log(`📁 You can find it at ${formats.format.underline}${this.newPluginPath}${formats.format.reset}`);
			process.exit(0);
		});
	}
}

module.exports = create;
