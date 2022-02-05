#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const process = require('process');
const create = require('./commands/create');
const help = require('./commands/help');
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
	}

	main()
	{
		switch (this.args[0])
		{
			case 'create':
				new create(this.json); // eslint-disable-line
				break;
			case 'version':
				version(this.json.name, this.json.version);
				break;
			case 'help':
			default:
				help(this.args);
		}
	}
}

// eslint-disable-next-line new-cap
const test = new cli();
test.main();

// module.exports = cli;
