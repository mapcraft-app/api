#!/usr/bin/env node
const { app } = require('electron');
const admZip = require('adm-zip');
const fs = require('fs');
const { constants } = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const models = require('./models');

if (!process.env.AppPath)
	process.env.AppPath = app.getAppPath();

class CLI
{
	constructor()
	{
		this.json = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), { encoding: 'utf-8', flag: 'r' }));
		this.questions = models.init;
		this.Interface = readline.createInterface({ input, output });
		this.Args = process.argv.slice(2);
		this.Interface.on('close', () =>
		{
			process.exit(0);
		});

		this.main();
	}

	async AskingQuestion(_Question)
	{
		this.Interface.question(`${_Question.question} (default ${_Question.default}) :`, (_answer) =>
		{
			if (!_answer)
				return _Question.default;
			if (!_Question.regex.test(_answer))
				throw new Error(_Question.warning);
			return _answer;
		});
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
	}

	version()
	{
		console.log(`${this.json.name} version ${this.json.version}`);
		this.Interface.close();
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
		this.Interface.close();
	}
	// #endregion
}

const newCLI = new CLI(); // eslint-disable-line
