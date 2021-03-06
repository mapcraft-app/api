/* eslint-disable operator-linebreak */

const packageJson = require('../package.json');

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
	isNotification: Boolean,
	bin: {
		component: String,
		command: String,
		lang: String,
	},
	dependencies: {
		'mapcraft-api': `^${packageJson.version}`,
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

exports.mainjs = (pluginName) =>
{
	const data = `/**
* @file A plugin contains three variables and a class, which are imperative :
* @constant PACKAGE ... Contains all the data present in the 'package.json' file of your plugin, and is notably used to correctly define your plugin for the template system.
* @constant TEMPLATE ... Represents the class allowing you to display or delete things on the user interface.
* @constant LANG ....... Contains all data corresponding to the language chosen by the user, or 'en_US.json' by default, in JSON format. When loading the plugin, it is important to call the @function updateLANG() to take into account if the user has changed the language of the software.
* @classdesc Component . Represents the interface between your plugin and Mapcraft. Your interface must contain the @function main(), which represents the entry point of your plugin (if this one is deleted your plugin will not work). All other functions or classes will remain internal to your plugin.
* @classdesc Shell ..... Asynchronous function, detects if a user in the game executes a command related to your plugin.
*/
const { Mapcraft, MCipc, MCtemplate, MCutilities } = require('mapcraft-api');

const PACKAGE = MCutilities.getPackage(__dirname);
const TEMPLATE = new MCtemplate(__dirname, PACKAGE.uuid);
let LANG;
const updateLANG = () =>
{
	LANG = MCutilities.getLang(__dirname, Mapcraft.config.Env.Lang, PACKAGE.bin.lang);
};

class Component
{
	static main()
	{
		updateLANG();
		TEMPLATE.render(document.getElementById('content'), '${pluginName}.tp', LANG.Data);
	}
}

//Shell
const COMMAND = (PACKAGE.bin.command) ? PACKAGE.bin.command : PACKAGE.name;
MCipc.receive('Shell:execute-command', (command) =>
{
	if (command.Command !== COMMAND)
		return;
	MCutilities.createAlert('success', document.getElementById('custom-alert'), \`Receive command \${JSON.stringify(command)}\`);
});

module.exports = Component;
`;
	return (data);
};

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

exports.maintp =
`<html>
<div class="uk-container uk-margin-top">
	<div id="custom-alert"></div>
	<h2 class="custom-class">{CustomVar}</h2>
	<h3 id="custom-js"></h3>
</div>
</html>

<style>
.custom-class {
    color: rgb(211, 207, 201);
}
</style>

<script>
document.getElementById('custom-js').innerText = 'Hello from template javascript !'; 
console.log('Hello from the plugin !');
</script>
`;

exports.lang = {
	Title: String,
	Icon: String,
	Notification: String,
	Data: {
		CustomVar: String,
	},
};
