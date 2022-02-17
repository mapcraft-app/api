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

process.on('uncaughtException', (err) =>
{
	console.error(`An error at ${(new Date()).toUTCString()} has occurred.\nDon't hesitate to open an issue on GitHub (https://gitlab.com/cbertran/mapcraft-api/-/issues) with the error code below :`);
	console.error(`${formats.foreground.normal.red}═══════════════ ${formats.foreground.normal.yellow}⚠${formats.format.reset}  Error ${formats.foreground.normal.yellow}⚠${formats.format.reset}  ${formats.foreground.normal.red}══════════════${formats.format.reset}`);
	console.error(err);
	console.error(`${formats.foreground.normal.red}══════════════════════════════════════════${formats.format.reset}`);
	process.exit(127);
});
