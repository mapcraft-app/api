/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable curly */

const fs = require('fs');
const path = require('path');
const builtin = require('./MCshellModels');

const COMMAND = '/mapcraft';
const LENGTH = COMMAND.length;

class MCshell
{
	constructor()
	{
		this.commands = [];
		const names = Object.keys(builtin);
		names.forEach((name) => this.commands.push(builtin[name]));
	}

	/**
	 * Add new command to shell
	 * @param {any} json Array contains json elements
	 */
	add(json)
	{
		if (Array.isArray(json))
		{
			json.forEach((object) =>
			{
				const _path = path.join(object.directory, 'shell.js');
				if (fs.existsSync(_path))
				{
					const addons = require(_path);
					const names = Object.keys(addons);
					names.forEach((name) => this.commands.push(addons[name]));
				}
			});
		}
		else if (json.constructor === ({}).constructor)
		{
			this.commands.push(json);
		}
		else
		{
			console.error('MCshell/setAddonsComponents', 'argument is not corrected formated');
		}
	}

	/**
	 * Parse a line and return data if the program exists
	 * @param {String} line Line to be parsed
	 * @returns {JSON} Preformed data, or null if error
	 */
	parse(line)
	{
		let ret = null;
		const check = line.indexOf(COMMAND);
		if (check !== -1)
		{
			const args = line.substring(check + LENGTH).trim().split(' ');
			for (const command of this.commands)
			{
				if (command.name === args[0])
				{
					ret = command.function(args);
					break;
				}
			}
		}
		return (ret);
	}
}

module.exports = new MCshell();
