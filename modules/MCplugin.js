/* {
**	 "name": string,
**	 "component": string [.js],
**	 "lang": string,
**	 "isNotification" : true | false,
**	 "active": (Optional) true | false
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
		if (!global.MCpluginSave)
		{
			global.MCpluginSave = {
				default: String,
				array: [],
			};
			for (const i in this.Components)
				if (this.Components[i].name !== '__DEFAULT'
				&& (typeof this.Components[i].active === 'undefined' || this.Components[i].active === true))
				{
					global.MCpluginSave.array.push({
						name: this.Components[i].name,
						component: this.Components[i].component,
						active: (this.Components[i].active) ? this.Components[i].active : true,
						isNotification: this.Components[i].isNotification,
						lang: path.join(this.BaseLink, this.Components[i].lang),
						instancePath: path.join(directory, 'src/dist', `template/Main/${this.Components[i].component}`),
						instance: Function,
					});
				}
				else if (this.Components[i].name === '__DEFAULT')
				{
					localStorage.setItem('Mapcraft_Plugin', this.Components[i].component);
					global.MCpluginSave.default = this.Components[i].component;
				}
			for (const i in global.MCpluginSave.array)
				if (Object.prototype.hasOwnProperty.call(global.MCpluginSave.array, i))
					global.MCpluginSave.array[i].instance = require(global.MCpluginSave.array[i].instancePath); // eslint-disable-line
		}
		this.plugins = global.MCpluginSave.array;
		this.__default = global.MCpluginSave.default;
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
	 * Toogle component
	 * @param {String} Name Name of component
	 * @param {Boolean} forceValue Set to true/false if you want to force activate/desactivate plugin
	 */
	Toogle(Name, forceValue = undefined)
	{
		for (const i in global.MCpluginSave.array)
			if (global.MCpluginSave.array[i].name === Name)
			{
				if (forceValue === undefined)
					global.MCpluginSave.array[i].active = !(global.MCpluginSave.array[i].active);
				else
					global.MCpluginSave.array[i].active = Boolean(forceValue);
				this.plugins = global.MCpluginSave.array;
				break;
			}
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
					if (fs.existsSync(path.join(this.plugins[i].lang, `${MC.GetConfig().Env.Lang}.json`)))
						data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, `${MC.GetConfig().Env.Lang}.json`)));
					else
						data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, 'en_US.json')));
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
					if (fs.existsSync(path.join(this.plugins[i].lang, `${MC.GetConfig().Env.Lang}.json`)))
						data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, `${MC.GetConfig().Env.Lang}.json`)));
					else
						data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, 'en_US.json')));
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
