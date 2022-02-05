exports.package = {
	name: String,
	title: String,
	version: String,
	author: String,
	description: String,
	keywords: Array,
	license: String,
	uuid: String,
	icon: String,
	bin: {
		component: String,
		command: String,
		lang: String,
	},
	dependencies: {
		'mapcraft-api': '^1.6.8',
	},
};

exports.component = {
	name: String,
	uuid: String,
	component: String,
	active: Boolean,
	isNotification: Boolean,
	lang: String,
};

// eslint-disable-next-line operator-linebreak
exports.mainjs = (pluginName) =>
{
	const data = `/**
* @file A plugin contains three variables and a class, which are imperative :
* @constant MANIFEST ... Contains all the data present in the 'package.json' file of your plugin, and is notably used to correctly define your plugin for the template system.
* @constant TEMPLATE ... Represents the class allowing you to display or delete things on the user interface.
* @constant LANG ....... Contains all data corresponding to the language chosen by the user, or 'en_US.json' by default, in JSON format. When loading the plugin, it is important to call the @function UpdateLANG() to take into account if the user has changed the language of the software.
* @classdesc Component . Represents the interface between your plugin and Mapcraft. Your interface must contain the 'main()' function, which represents the entry point of your plugin (if this one is deleted your plugin will not work). All other functions or classes will remain internal to your plugin.
* @classdesc Shell ..... Asynchronous function, detects if a user in the game executes a command related to your plugin.
*/
const { Mapcraft, MCipc, MCtemplate, MCutilities } = require('mapcraft-api');

const MANIFEST = MCutilities.GetPackage(__dirname);
const TEMPLATE = new MCtemplate(__dirname, MANIFEST.uuid);
let LANG;
const UpdateLANG = () =>
{
	LANG = MCutilities.GetLang(__dirname, Mapcraft.GetConfig().Env.Lang, MANIFEST.bin.lang);
};

class Component
{
	static main()
	{
		UpdateLANG();
		TEMPLATE.render(document.getElementById('content'), '${pluginName}.tp', LANG.Data);
	}
}

//Shell
const COMMAND = (MANIFEST.bin.command) ? MANIFEST.bin.command : MANIFEST.name;
MCipc.receive('Shell:execute-command', (command) =>
{
	if (command.Command !== COMMAND)
		return;
	MCutilities.CreateAlert('success', document.getElementById('custom-alert'), \`Receive command \${JSON.stringify(command)}\`);
});

module.exports = Component;
`;
	return (data);
};

// eslint-disable-next-line operator-linebreak
exports.mainshell =
`const component = require('./package.json');

exports.command = {
	name: (component.bin.command) ? component.bin.command : component.name,
	function: (args) =>
	{
		const num = Number(42);
		return ({
			Command: args[0],
			Player: args[1],
			Number: num,
			UUID: component.uuid,
		});
	},
};
`;

// eslint-disable-next-line operator-linebreak
exports.maintp =
`[HTML]
<div class="uk-container uk-margin-top">
	<div id="custom-alert"></div>
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
