/* {
**	 "name": string,
**	 "component": string [.js],
**	 "lang": string,
**	 "isNotification" : true | false,
**	 "using": (Optional) true | false
** }
*/

const fs = require('fs');
const path = require('path');
const MC = require('./Mapcraft');

class MCplugin
{
	/**
	 * Preload plugins
	 * @param {String} directory Folder where the plugins are located, @default path_to_builtin_plugins
	 */
	constructor(directory = path.join(__dirname, '../../../'))
	{
		this.Components = JSON.parse(fs.readFileSync(MC.GetConfig().Env.Components, 'utf-8'));
		this.BaseLink = path.join(directory, 'src/dist/template/Main');
		this.__default = null;
		this.plugins = [];
		for (const i in this.Components)
			if (this.Components[i].name !== '__DEFAULT'
			&& (typeof this.Components[i].using === 'undefined' || this.Components[i].using === true))
			{
				this.plugins.push({
					name: this.Components[i].name,
					component: this.Components[i].component,
					isNotification: this.Components[i].isNotification,
					lang: path.join(this.BaseLink, this.Components[i].lang),
					instance: require(path.join(directory, 'src/dist', `template/Main/${this.Components[i].component}`)) // eslint-disable-line
				});
			}
			else if (this.Components[i].name === '__DEFAULT')
			{
				localStorage.setItem('Mapcraft_Plugin', this.Components[i].component);
				this.__default = this.Components[i].component;
			}
	}

	/**
	 * Get instance of component
	 * @param {String} Name Name of component
	 * @returns Instance function of component, or undefined if error
	 */
	Instance(Name)
	{
		for (const i in this.plugins)
			if (this.plugins[i].name === Name)
				return (this.plugins[i].instance);
		return (undefined);
	}

	/**
	 * Get component
	 * @param {String} Name Name of component
	 * @returns Full component, or undefined if error
	 */
	Component(Name)
	{
		for (const i in this.plugins)
			if (this.plugins[i].name === Name)
				return (this.plugins[i]);
		return (undefined);
	}

	/**
	 * Get lang data of component
	 * @param {String} Name Name of component
	 * @returns {JSON} Lang data
	 */
	Lang(Name)
	{
		let data = null;
		for (const i in this.plugins)
			if (this.plugins[i].name === Name)
			{
				try
				{
					data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, `${MC.GetConfig().Env.Lang}.json`)));
				}
				catch (err)
				{
					throw new Error(err);
				}
				return (data);
			}
		return (undefined);
	}

	/**
	 * Get lang data of default component
	 * @returns {JSON} Lang data
	 */
	Default()
	{
		let data = null;
		for (const i in this.plugins)
			if (this.plugins[i].name === this.__default)
			{
				try
				{
					data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, `${MC.GetConfig().Env.Lang}.json`)));
				}
				catch (err)
				{
					throw new Error(err);
				}
				return (data);
			}
		return (undefined);
	}

	/**
	 * Get full list of components
	 * @returns List of components
	 */
	ListComponents()
	{
		return (this.plugins);
	}
}

module.exports = MCplugin;
