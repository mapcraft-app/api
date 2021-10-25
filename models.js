exports.component = {
	name: String,
	component: String,
	isNotification: Boolean,
	lang: String,
};

exports.help = {
	main: `
	\x1b[36mmapcraft-api\x1b[0m \x1b[32m[command]\x1b[0m \x1b[34m<options>\x1b[0m

	\x1b[32minit\x1b[0m .................. Initiate the creation of a new plugin
	\x1b[32mversion\x1b[0m ............... Show package version
	\x1b[32mhelp\x1b[0m .................. Show help menu for a command
	`,

	init: `
	\x1b[36mmapcraft-api\x1b[0m \x1b[32minit\x1b[0m \x1b[34m<options>\x1b[0m
	\x1b[34m--directory\x1b[0m, \x1b[34m--dir\x1b[0m ..... Output folder, default to \x1b[32m'applicationFolder/out'\x1b[0m

	Initiate the creation of a new plugin
	`,

	version: `
	\x1b[36mmapcraft-api\x1b[0m \x1b[32mversion\x1b[0m

	Show package version
	`,

	help: `
	\x1b[36mmapcraft-api\x1b[0m help \x1b[34m<options>\x1b[0m
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
