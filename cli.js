#!/usr/bin/env node
const { app } = require('electron');
const admZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
const models = require('./models');

if (app !== undefined && !process.env.AppPath)
	process.env.AppPath = app.getAppPath();
else
	process.env.AppPath = __dirname;

class CLI
{
	constructor()
	{
		this.json = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), { encoding: 'utf-8', flag: 'r' }));
		this.ret = {};
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
		let finishArgs = false;
		let outputDir = String;
		if (this.Args[1])
		{
			const regex = /((?<=(--directory=))|(?<=(--dir=))).*$/gm;
			if (!regex.test(this.Args[1]))
				outputDir = path.join(process.env.AppPath, this.json.out);
			else
				outputDir = path.join(process.env.AppPath, this.Args[1].match(regex));
			fs.mkdir(path.join(outputDir), (err) =>
			{
				if (!err)
				{
					console.error(err);
					this.Interface.close();
				}
				finishArgs = true;
			});
		}
		else
		{
			outputDir = this.json.out;
			finishArgs = true;
		}
		const waitOutdirDir = setInterval(wait, 200); // eslint-disable-line
		function wait()
		{
			if (finishArgs === true)
				clearInterval(waitOutdirDir);
		}

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
			else
				this.ret[question.input] = answer;
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
