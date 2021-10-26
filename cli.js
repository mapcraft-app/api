#!/usr/bin/env node
const OS = require('os');
// const admZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
const models = require('./models');

const AppPath = path.join(__dirname, '../../');
const PluginsPath = path.join(__dirname, '../../', 'plugins');
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
		let outputDir = PluginsPath;
		if (this.Args[1])
		{
			const regex = /((?<=(--directory=))|(?<=(--dir=))).*$/gm;
			if (regex.test(this.Args[1]))
				outputDir = path.join(AppPath, this.Args[1].match(regex));
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
				this.ret[question.input] = question.default;
			else if (question.input === 'isNotification')
				this.ret[question.input] = true;
			else
				this.ret[question.input] = answer;
		});

		Spinner.spin('The plugin is being created');
		const newPackage = models.package;
		newPackage.name = this.ret.name;
		newPackage.title = this.ret.title;
		newPackage.version = this.ret.version;
		newPackage.author = this.ret.author;
		newPackage.description = this.ret.description;
		newPackage.license = this.ret.license;
		newPackage.bin.component = this.ret.component;
		newPackage.bin.lang = this.ret.lang;
		newPackage.bin.isNotification = this.ret.isNotification;

		const newComponent = models.component;
		newComponent.name = this.ret.name;
		newComponent.component = this.ret.component;
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
					console.error(errBase);
				}
				console.log('🚀 The plugin is ready !');
				process.exit(0);
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
