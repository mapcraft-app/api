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
		default: false,
	},
	{
		input: 'lang',
		question: 'In which folder will the language files be placed ?',
		regex: /^[a-zA-Z_]+$/,
		warning: 'Must be only letters or underscore',
		default: 'lang',
	},
	{
		input: 'title',
		question: 'What will be the name displayed in the application of your plugin ?',
		regex: /^[a-zA-Z0-9-_\s]+$/,
		warning: 'Must be only letters, numbers, underscore, dashed or space',
		default: 'New Plugin',
	},
];

// eslint-disable-next-line operator-linebreak
exports.mainjs =
`const { Mapcraft, MCutilities, MCtemplate } = require('mapcraft-api');

const Template = new MCtemplate(__dirname);
let LANG = MCutilities.GetLang(__dirname, Mapcraft.GetConfig().Env.Lang);

class Component
{
	static main()
	{
		Template.render(document.getElementById('content'), 'main.tp', LANG);
	}
}

module.exports = Component;
`;

// eslint-disable-next-line operator-linebreak
exports.maintp =
`[HTML]
<div class="uk-container uk-margin-top">
	<h2 class="custom-class">{CustomVar}</h2>	
</div>
[/HTML]

[CSS]
.custom-class {
    color: rgb(211, 207, 201);
}
[/CSS]

[JS]
console.log('Hello from the plugin !');
[/JS]
`;

exports.lang = {
	Title: String,
	Icon: String,
	Notification: String,
	Data: {
		CustomVar: String,
	},
};
