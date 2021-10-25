exports.component = {
	name: String,
	component: String,
	isNotification: Boolean,
	lang: String,
};

exports.help = {
	main: `
	mapcraft-api [command] <options>

	init .................. Initiate the creation of a new plugin
	version ............... Show package version
	help .................. Show help menu for a command
	`,

	init: `
	mapcraft-api init <options>
	--directory, --dir ..... Output folder, default to 'applicationFolder/out'

	Initiate the creation of a new plugin
	`,

	version: `
	mapcraft-api version

	Show package version
	`,

	help: `
	mapcraft-api help <options>
	init, version, help
	`,
};

exports.init = [
	{
		input: 'name',
		question: 'What is the name of your plugin ?',
		regex: /^[a-zA-Z0-9-]+$/,
		warning: 'Must be only letters, number or dashes',
		default: 'newPlugin',
	},
	{
		input: 'component',
		question: 'What will be the name of the main input file ?',
		regex: /^[a-zA-Z_]+$/,
		warning: 'Must be only letters or underscore',
		default: 'index.js',
	},
	{
		input: 'isNotification',
		question: 'Will there be notifications ?',
		regex: /^yes|no+$/,
		warning: 'Must be only yes or no',
		default: 'no',
	},
	{
		input: 'lang',
		question: 'In which folder will the language files be placed ?',
		regex: /^[a-zA-Z_]+$/,
		warning: 'Must be only letters or underscore',
		default: 'lang',
	},
];
