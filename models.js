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
		regex: /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/,
		warning: 'Must be lowercase and one word, and may contain hyphens and underscores',
		default: 'new_plugin',
		type: String,
	},
	{
		input: 'title',
		question: 'What will be the name displayed in the application of your plugin ?',
		regex: /^[a-zA-Z0-9-_\s]+$/,
		warning: 'Must be only letters, numbers, underscore, dashed or space',
		default: 'New Plugin',
		type: String,
	},
	{
		input: 'version',
		question: 'What will be the first version ?',
		regex: /^([0-9]\.[0-9]\.[0-9])$/,
		warning: 'The format is (0-9).(0-9).(0-9)',
		default: '1.0.0',
		type: String,
	},
	{
		input: 'author',
		question: 'What is the name of the author ?',
		regex: /^.*$/,
		warning: '',
		default: 'John Doe',
		type: String,
	},
	{
		input: 'description',
		question: 'Write a quick description of your plugin',
		regex: /^.*$/,
		warning: '',
		default: 'My wonderful plugin',
		type: String,
	},
	{
		input: 'license',
		question: 'What license will your plugin be under ?',
		regex: /^.*$/,
		warning: '',
		default: 'MIT',
		type: String,
	},
	{
		input: 'component',
		question: 'What will be the name of the main input file ?',
		regex: /^[a-zA-Z0-9_.]{1,}(\.js)/i,
		warning: 'Must be only letters, numbers, underscore and dot. Must have as extension .js',
		default: 'index.js',
		type: String,
	},
	{
		input: 'lang',
		question: 'In which folder will the language files be placed ?',
		regex: /^[a-zA-Z_]+$/,
		warning: 'Must be only letters or underscore',
		default: 'lang',
		type: String,
	},
	{
		input: 'isNotification',
		question: 'Will there be notifications ?',
		regex: /^true|false+$/,
		warning: 'Must be only true or false',
		default: 'false',
		type: Boolean,
	},
];

exports.package = {
	name: String,
	title: String,
	version: String,
	author: String,
	description: String,
	keywords: Array,
	license: String,
	uuid: String,
	bin: {
		component: String,
		lang: String,
		isNotification: String,
	},
};

exports.component = {
	name: String,
	uuid: String,
	component: String,
	isNotification: Boolean,
	lang: String,
};

// eslint-disable-next-line operator-linebreak
exports.mainjs = (pluginName) =>
{
	const data = `/**
* @file A plugin contains three variables and a class, which are imperative :
* @constant LANG ....... contains all data corresponding to the language chosen by the user, or 'en_US.json' by default, in JSON format. When loading the plugin, it is important to call the @function UpdateLANG() to take into account if the user has changed the language of the software.
* @constant PACKAGE .... contains all the data present in the 'package.json' file of your plugin, and is notably used to correctly define your plugin for the template system.
* @constant TEMPLATE ... Represents the class allowing you to display or delete things on the user interface.
* @classdesc Component . Represents the interface between your plugin and Mapcraft. Your interface must contain the 'main()' function, which represents the entry point of your plugin (if this one is deleted your plugin will not work). All other functions or classes will remain internal to your plugin.
*/
const { Mapcraft, MCutilities, MCtemplate } = require('mapcraft-api');

const PACKAGE = MCutilities.GetPackage(__dirname);
const TEMPLATE = new MCtemplate(__dirname, PACKAGE.uuid);
let LANG;
function UpdateLANG()
{
	LANG = MCutilities.GetLang(__dirname, Mapcraft.GetConfig().Env.Lang, PACKAGE.bin.lang);
}

class Component
{
	static main()
	{
		UpdateLANG();
		TEMPLATE.render(document.getElementById('content'), '${pluginName}.tp', LANG.Data);
	}
}

module.exports = Component;
`;
	return (data);
};

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
