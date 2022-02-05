#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const process = require('process');
const formats = require('./js/format');
const { mapcraft } = require('./logo');
const create = require('./commands/create');
const help = require('./commands/help');
const mcPackage = require('./commands/package');
const version = require('./commands/version');

class cli
{
	constructor()
	{
		this.json = JSON.parse(
			fs.readFileSync(
				path.join(
					__dirname,
					'..',
					'package.json',
				),
				{ encoding: 'utf-8', flag: 'r' },
			),
		);
		this.args = process.argv.slice(2);
		this.main();
	}

	main()
	{
		console.log(mapcraft);
		switch (this.args[0])
		{
			case 'create':
				new create(this.json); // eslint-disable-line
				break;
			case 'package':
				new mcPackage(this.json); // eslint-disable-line
				break;
			case 'version':
				version(this.json.name, this.json.version);
				break;
			case 'help':
				help(this.args);
				break;
			default:
				if (this.args.length)
					console.error(`Command ${formats.format.bold}${formats.foreground.light.red}${this.args} ${formats.format.reset}is not recognized`);
				else
					help(this.args);
		}
	}
}

new cli(); // eslint-disable-line
