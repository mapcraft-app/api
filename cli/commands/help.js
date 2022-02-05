const formats = require('../js/format');

const name = 'mapcraft';

const help = {
	main: `${formats.foreground.normal.cyan}${name} \
${formats.foreground.normal.green}[command] \
${formats.foreground.light.blue}<options>\n\n\
${formats.foreground.normal.green}create${formats.format.reset}  .............. Create new plugin\n\
${formats.foreground.normal.green}package${formats.format.reset} .............. Convert your plugin into Mapcraft plugin format\n\
${formats.foreground.normal.green}version${formats.format.reset} .............. Show package version\n\
${formats.foreground.normal.green}help${formats.format.reset}    .............. Show help menu for a command\n`,

	create: `${formats.foreground.normal.cyan}${name} \
${formats.foreground.normal.green}create\n\
${formats.format.reset}Create and initialize the blueprint of your new plugin in a very simple way\n`,

	package: `${formats.foreground.normal.cyan}${name} \
${formats.foreground.normal.green}package\n\
${formats.format.reset}Convert your plugin into a format that can be easily installed by Mapcraft\n`,

	version: `${formats.foreground.normal.cyan}${name} \
${formats.foreground.normal.green}version\n\
${formats.format.reset}Show current version of api\n`,

	help: `${formats.foreground.normal.cyan}${name} \
${formats.foreground.normal.green}help \
${formats.foreground.light.blue}<options>${formats.format.reset}\n\
${formats.foreground.light.blue}create, version, help\
${formats.format.reset} ..... Enter the command to have more explanation on its use\n`,
};

module.exports = (args) =>
{
	if (args.length === 2)
	{
		const command = args[1].toLowerCase();
		if (Object.prototype.hasOwnProperty.call(help, command))
			console.log(help[command]);
	}
	else
	{
		console.log(help.main);
	}
};
