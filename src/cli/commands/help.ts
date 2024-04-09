import { formating } from '../misc';

const name = 'mapcraft';
const help: Record<string, string> = {
	main: `${formating.foreground.normal.cyan}${name} \
${formating.foreground.normal.green}[command] \
${formating.foreground.light.blue}<options>\n\n\
${formating.foreground.normal.green}create${formating.format.reset}  .............. Create new plugin\n\
${formating.foreground.normal.green}package${formating.format.reset} .............. Convert your plugin into Mapcraft plugin format\n\
${formating.foreground.normal.green}version${formating.format.reset} .............. Show package version\n\
${formating.foreground.normal.green}help${formating.format.reset}    .............. Show help menu for a command\n`,

	create: `${formating.foreground.normal.cyan}${name} \
${formating.foreground.normal.green}create\n\
${formating.format.reset}Create and initialize the blueprint of your new plugin in a very simple way\n`,

	package: `${formating.foreground.normal.cyan}${name} \
${formating.foreground.normal.green}package\n\
${formating.format.reset}Convert your plugin into a format that can be easily installed by Mapcraft\n`,

	version: `${formating.foreground.normal.cyan}${name} \
${formating.foreground.normal.green}version\n\
${formating.format.reset}Show current version of api\n`,

	help: `${formating.foreground.normal.cyan}${name} \
${formating.foreground.normal.green}help \
${formating.foreground.light.blue}<options>${formating.format.reset}\n\
${formating.foreground.light.blue}create, version, help\
${formating.format.reset} ..... Enter the command to have more explanation on its use\n`,
};

export default (args: string[]): void => {
	if (args.length === 2) {
		const command = args[1].toLowerCase();
		if (Object.prototype.hasOwnProperty.call(help, command))
			console.log(help[command]);
	} else
		console.log(help['main']);
};
