const formats = require('../js/format');

const help = {
	main: `${formats.foreground.normal.cyan}mapcraft-api \
${formats.foreground.normal.green}[command] \
${formats.foreground.light.blue}<options>\n\n\
${formats.foreground.normal.green}create${formats.format.reset} ................ Create a new plugin\n\
${formats.foreground.normal.green}version${formats.format.reset} ............... Show package version\n\
${formats.foreground.normal.green}help${formats.format.reset} .................. Show help menu for a command\n`,

	create: `${formats.foreground.normal.cyan}mapcraft-api \
${formats.foreground.normal.green}create \
${formats.foreground.light.blue}<options>\n\n\
${formats.foreground.light.blue}--directory, --dir\n\
${formats.format.reset} ..... Output folder, default to ${formats.foreground.normal.green}'appData/plugins'${formats.format.reset}\n\
Create a new plugin\n`,

	version: `${formats.foreground.normal.cyan}mapcraft-api \
${formats.foreground.normal.green}version${formats.format.reset}\n\
Show current version of api\n`,

	help: `${formats.foreground.normal.cyan}mapcraft-api \
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
