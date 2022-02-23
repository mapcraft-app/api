/* eslint-disable no-useless-escape */
const sevenZip = require('7zip-min');
const child = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const fsPromise = require('fs/promises');
const os = require('os');
const path = require('path');
const prompts = require('prompts');
const appPath = require('../js/appPath');
const formats = require('../js/format');
const spinner = require('../js/spinner');

const isProtoype = (json, key) => Object.prototype.hasOwnProperty.call(json, key);

const ignores = {
	files: [
		'makefile', 'readme', 'changelog', '\\.editorconfig', '\\.gitmodules',
		'\\.gitattributes', 'robot\\.html', '\\.lint', 'gulpfile\\.js', 'gruntfile\\.js',
		'\\.tern-project', '\\.vscode', '\\.editorconfig', '\\.eslintrc', '\\.jshintrc',
		'\\.npmignore', '\\.flowconfig', '\\.documentup\\.json', '\\.yarn-metadata\\.json',
		'\\.travis\\.yml', 'thumbs\\.db', '\\.tern-port', '\\.ds_store', 'desktop\\.ini',
		'npm-debug\\.log', '\\.npmrc', '.*?license.*?', '.*?authors.*?', '.*?contributors.*?',
		'\\.yarn-integrity', 'builderror\\.log', '\\.gitignore', '\\.travis.*',
		'.*\\.md', '.*\\.sln', '.*\\.obj', '.*\\.gypi', '.*\\.vcxproj',
		'.*\\.vcxproj.filters', '.*\\.jst', '.*\\.coffee',
	],
	directory: [
		'\\.git', '\\.github', '\\.gitlab', '\\.wafpickle-n', 'cvs', '\\.svn',
		'\\.hg', '\\.lock-wscript', 'config\\.gypi', 'doc', 'docs', '\\.?log',
		'.*?eslint.*?', 'tests?', 'powered-test', 'website', 'images?',
		'assets?', 'examples?', 'coverages?', 'node-gyp', 'node-pre-gyp',
		'gyp', '\\.nyc_output',
	],
	regex: {
		string: '^\\s*(',
		exp: RegExp,
	},
};
ignores.files.forEach((value) =>
{
	ignores.regex.string += `${value}|`;
});

ignores.directory.forEach((value, index) =>
{
	ignores.regex.string += `${value}`;
	if (index < ignores.directory.length - 1)
		ignores.regex.string += '|';
}); ignores.regex.string += ')\\s*$';
ignores.regex.exp = RegExp(ignores.regex.string);

class mapcraftPackage
{
	constructor(json)
	{
		this.json = json;
		this.pluginsPath = appPath();
		this.components = JSON.parse(fs.readFileSync(path.join(this.pluginsPath, 'components.json')));
		this.size = {
			before: Number(0),
			remove: Number(0),
			after: Number(0),
			pourcent: Number(0),
		};
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

	// eslint-disable-next-line consistent-return
	#main()
	{
		console.log(`📦 ${formats.format.underline}${formats.foreground.light.green}Package${formats.format.reset} 📦`);
		console.log(`${formats.foreground.light.cyan}Convert your plugin into a format that can be easily installed by Mapcraft users${formats.format.reset}\n`);
		if (!this.list.length)
			return console.log(`❌ ${formats.foreground.light.magenta}No plugin is present${formats.format.reset}`);
		prompts({
			type: 'select',
			name: 'plugin',
			message: 'Which plugin do you want to convert',
			choices: this.list,
			initial: 0,
		}).then((data) =>
		{
			spinner.start('The package is being created', 'bar');
			const selectedPlugin = this.list[data.plugin];
			let dirPath = path.join(this.pluginsPath, selectedPlugin.directory);
			try
			{
				fs.statSync(dirPath);
			}
			catch (err)
			{
				dirPath = path.join(this.pluginsPath, selectedPlugin.title);
			}
			fsPromise.rm(path.join(this.pluginsPath, dirPath, 'node_modules'), { recursive: true, force: true })
				.then(() =>
				{
					spinner.update('Installation of dependencies');
					child.exec(
						'npm install --production=true',
						{
							cwd: dirPath,
							shell: true,
							windowsHide: true,
						},
					).on('exit', (code) =>
					{
						if (code !== 0)
						{
							console.error(`❌ Child command 'npm' failed with ${code} error code`);
							process.exit(code);
						}
						this.#package(dirPath, selectedPlugin);
					});
				})
				.catch((err) => new Error(err.message));
		});
	}

	#tree_files(directory, isMain = false)
	{
		fs.readdirSync(directory, { encoding: 'utf-8', withFileTypes: true }).forEach((dirent) =>
		{
			const basename = dirent.name.toLowerCase().trim();
			const basepath = path.join(directory, dirent.name);
			if (!dirent.isDirectory())
			{
				this.size.before += fs.statSync(basepath).size;
				if (/.*\.mapcraft/.test(basename) || (!isMain && ignores.regex.exp.test(basename)))
					fs.rmSync(basepath, { force: true, recursive: true });
			}
			else
			{
				this.#tree_files(basepath);
			}
		});
	}

	async #package(dirPath, selectedPlugin)
	{
		spinner.update('Plugin conversion - Remove useless files and directory');
		const tempPath = path.join(os.tmpdir(), `${crypto.randomUUID()}`);
		fs.cp(dirPath, tempPath, { force: true, recursive: true }, (err) =>
		{
			const CompressPath = path.join(dirPath, `${selectedPlugin.title}.mapcraft`);
			if (err)
				throw new Error(err);
			this.#tree_files(tempPath, true);
			this.size.before = Number(this.size.before / 1048576).toFixed(2);
			spinner.update(`Plugin conversion - Convert the plugin into ${formats.format.bold}.mapcraft${formats.format.reset} format`);
			fs.rmSync(CompressPath, { force: true });
			sevenZip.pack(`${tempPath}/*`, CompressPath, (err2) =>
			{
				if (err2)
					throw new Error(err2.message);
				this.size.after = Number(fs.statSync(CompressPath).size / 1048576).toFixed(2);
				this.size.remove = Number(this.size.before - this.size.after).toFixed(2);
				this.size.pourcent = Number((this.size.remove * 100) / this.size.before).toFixed(2);
				fs.rmSync(tempPath, { recursive: true, force: true });
				spinner.stop();
				process.stdout.clearLine();
				process.stdout.cursorTo(0);

				console.log('\n┌───╮');
				console.log(`│ Original size: ${formats.foreground.normal.green}${this.size.before}${formats.format.reset} MB`);
				console.log(`│ New size: ${formats.foreground.normal.green}${this.size.after}${formats.format.reset} MB`);
				console.log(`│ Compression percentage: ${formats.foreground.normal.green}${this.size.pourcent}%${formats.format.reset}`);
				console.log('└───╯\n');
				console.log('🚀 The plugin is packaged !');
				console.log(`📪 You can find it at ${formats.format.underline}${path.join(dirPath, 'package.mapcraft')}${formats.format.reset}`);

				process.exit(0);
			});
		});
	}
}

module.exports = mapcraftPackage;
