#!/usr/bin/env node
const OS = require('os');
const fs = require('fs');
const crypto = require('crypto');
const child = require('child_process');
const path = require('path');
const readline = require('readline-sync');
// const admZip = require('adm-zip');
const models = require('./models');

const AppName = 'Mapcraft';

// eslint-disable-next-line
process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")

function GetAppPath()
{
	const appPath = path.join(process.env.APPDATA, AppName, 'plugins');
	fs.mkdir(appPath, { recursive: true }, (err) =>
	{
		if (err)
		{
			console.log(`\x1b[31m${err.message}`);
			process.exit(1);
		}
	});
	return appPath;
}
const PluginsPath = GetAppPath();

let saveInterval;
class Spinner
{
	static spin(string)
	{
		process.stdout.write('\x1B[?25l');
		const spinners = ['⣷', '⣯', '⣟', '⡿', '⢿', '⣻', '⣽', '⣾'];
		let index = 0;
		saveInterval = setInterval(() =>
		{
			let line = spinners[index];
			if (line === undefined)
			{
				index = 0;
				line = spinners[index];
			}
			if (OS.platform === 'win32')
				process.stdout.write(`${line} ${string}\x1b[0G`);
			else
				process.stdout.write(`${line} ${string}\r`);
			index = index >= spinners.length ? 0 : ++index;
		}, 80);
	}
}

class CLI
{
	constructor()
	{
		this.json = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), { encoding: 'utf-8', flag: 'r' }));
		this.ret = {};
		// eslint-disable-next-line no-unused-expressions
		this.Components;
		this.questions = models.init;
		this.Args = process.argv.slice(2);
		this.main();
	}

	main()
	{
		switch (this.Args[0])
		{
			case 'init':
				this.init();
				break;
			case 'version':
				this.version();
				break;
			case 'help':
			default:
				this.help();
				break;
		}
	}

	// #region cli command
	init()
	{
		const newUUID = crypto.randomUUID();
		const returnBool = (value) =>
		{
			if (value === 'true' || value === true)
				return Boolean(true);
			return Boolean(false);
		};
		let outputDir = PluginsPath;
		if (this.Args[1])
		{
			const regex = /((?<=(--directory=))|(?<=(--dir=))).*$/gm;
			if (regex.test(this.Args[1]))
				outputDir = path.join(PluginsPath, this.Args[1].match(regex));
		}
		fs.mkdirSync(path.join(outputDir), { recursive: true });
		this.questions.forEach((question) =>
		{
			let answer = String;
			while (true) // eslint-disable-line
			{
				answer = readline.question(`${question.question} (default \x1b[36m${question.default}\x1b[0m): `);
				if (answer && !question.regex.test(answer))
					console.log(`❌ ${question.warning}\x1b[0m`);
				else
					break;
			}
			if (answer.length === 0)
				if (question.type === Boolean)
					this.ret[question.input] = returnBool(question.default);
				else
					this.ret[question.input] = question.type(question.default);
			else if (answer.length > 0)
				if (question.type === Boolean)
					this.ret[question.input] = returnBool(answer);
				else
					this.ret[question.input] = question.type(answer);
		});

		Spinner.spin('The plugin is being created');
		const newPackage = models.package;
		newPackage.name = this.ret.name;
		newPackage.title = this.ret.title;
		newPackage.version = this.ret.version;
		newPackage.author = this.ret.author;
		newPackage.description = this.ret.description;
		newPackage.license = this.ret.license;
		newPackage.uuid = newUUID;
		newPackage.icon = 'icon.png';
		newPackage.bin.component = this.ret.component;
		newPackage.bin.command = this.ret.name;
		newPackage.bin.lang = this.ret.lang;

		const newComponent = models.component;
		newComponent.name = this.ret.name;
		newComponent.uuid = newUUID;
		newComponent.component = this.ret.component;
		newComponent.active = true;
		newComponent.isNotification = this.ret.isNotification;
		newComponent.lang = this.ret.lang;

		fs.readFile(path.join(PluginsPath, 'components.json'), { encoding: 'utf-8', flag: 'r' }, (err, data) =>
		{
			let json;
			if (err)
				try
				{
					fs.writeFileSync(path.join(PluginsPath, 'components.json'), JSON.stringify('[]', null, 4), { encoding: 'utf-8', mode: 0o666, flag: 'w' });
					json = [];
				}
				catch (err2)
				{
					console.error(err2);
					process.exit(-1);
				}
			else
				json = JSON.parse(data);
			json.push(newComponent);
			const newPluginPath = path.join(PluginsPath, this.ret.name);
			fs.writeFile(path.join(PluginsPath, 'components.json'), JSON.stringify(json, null, 4), { encoding: 'utf-8', mode: 0o666, flag: 'w' }, (errWrite) =>
			{
				if (errWrite)
					console.error(errWrite);
				try
				{
					fs.mkdirSync(newPluginPath, { recursive: false });
					fs.mkdirSync(path.join(newPluginPath, this.ret.lang), { recursive: false });
					fs.writeFileSync(path.join(newPluginPath, this.ret.component), models.mainjs(this.ret.name), { encoding: 'utf-8', mode: 0o666, flag: 'w' });
					fs.writeFileSync(path.join(newPluginPath, `${this.ret.name}.tp`), models.maintp, { encoding: 'utf-8', mode: 0o666, flag: 'w' });
					fs.writeFileSync(path.join(newPluginPath, 'shell.js'), models.mainshell, { encoding: 'utf-8', mode: 0o666, flag: 'w' });
					fs.writeFileSync(path.join(newPluginPath, 'package.json'), JSON.stringify(newPackage, null, 4), { encoding: 'utf-8', mode: 0o666, flag: 'w' });
					const newJsonLang = models.lang;
					newJsonLang.Title = this.ret.title;
					newJsonLang.Icon = 'code';
					newJsonLang.Notification = `Here is a notification from ${this.ret.title}`;
					newJsonLang.Data.CustomVar = `Hello from ${this.ret.title}`;
					fs.writeFileSync(path.join(newPluginPath, this.ret.lang, 'en_US.json'), JSON.stringify(newJsonLang, null, 4), { encoding: 'utf-8', mode: 0o666, flag: 'w' });
					clearInterval(saveInterval);
				}
				catch (errBase)
				{
					console.error(errBase.message);
				}
				Spinner.spin('Installation of the required packages');

				child.exec('yarn', { cwd: newPluginPath, shell: true }, (errChild) =>
				{
					if (errChild)
					{
						process.stdout.clearLine();
						process.stdout.cursorTo(0);
						console.log(`❌ Child failed (error ${err.code}) > ${err.message}`);
					}
				}).on('close', (code) =>
				{
					clearInterval(saveInterval);
					process.stdout.clearLine();
					process.stdout.cursorTo(0);
					if (code !== 0)
						console.log(`❌ ${err.message}`);
					else
						console.log('🚀 The plugin is ready !');
					process.exit(0);
				});
			});
		});
	}

	version()
	{
		console.log(`\x1b[4m\x1b[36m${this.json.name}\x1b[0m version \x1b[32m${this.json.version}\x1b[0m`);
	}

	help()
	{
		switch (this.Args[1])
		{
			case 'init':
				console.log(models.help.init);
				break;
			case 'version':
				console.log(models.help.version);
				break;
			case 'help':
				console.log(models.help.help);
				break;
			default:
				console.log(models.help.main);
		}
	}
	// #endregion
}

const newCLI = new CLI(); // eslint-disable-line
