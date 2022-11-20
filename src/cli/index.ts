#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { mapcraftLogo, formating } from './misc';

import create from './commands/create';
import _package from './commands/package';
import help from './commands/help';
import version from './commands/version';

const data = {
	json: JSON.parse(readFileSync(resolve('.', 'package.json'), { encoding: 'utf-8', flag: 'r' })),
	args: process.argv.slice(2),
};

mapcraftLogo();
switch (data.args[0]) {
case 'create':
	create(data.json);
	break;
case 'package':
	_package(data.json);
	break;
case 'version':
	version(data.json.name, data.json.version);
	break;
case 'help':
	help(data.args);
	break;
default:
	if (data.args.length > 0)
		console.error(`Command ${formating.format.bold}${formating.foreground.light.red}${data.args} ${formating.format.reset}is not recognized`);
	else
		help(data.args);
}

process.on('uncaughtException', (err) => {
	console.error(`An error at ${(new Date()).toUTCString()} has occurred.\nDon't hesitate to open an issue on GitHub (https://gitlab.com/cbertran/mapcraft-api/-/issues) with the error code below :`);
	console.error(`${formating.foreground.normal.red}═══════════════ ${formating.foreground.normal.yellow}⚠${formating.format.reset}  Error ${formating.foreground.normal.yellow}⚠${formating.format.reset}  ${formating.foreground.normal.red}══════════════${formating.format.reset}`);
	console.error(err);
	console.error(`${formating.foreground.normal.red}══════════════════════════════════════════${formating.format.reset}`);
	process.exit(127);
});
