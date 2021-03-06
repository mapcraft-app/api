/*
**	{
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
	constructor(directory = process.env.AppPath)
	{
		this.Components = JSON.parse(fs.readFileSync(MC.config.Env.Components, 'utf-8'));
		this.ActiveComponent; // eslint-disable-line no-unused-expressions
		this.BaseLink = path.join(directory, 'src/dist/template/Main');
		this.__default = null;
		if (!global.MCpluginSave)
		{
			global.MCpluginSave = {
				default: String,
				array: [],
				active: JSON.parse(fs.readFileSync(MC.config.Env.ActiveComponents, { encoding: 'utf-8', flag: 'r' })),
			};
			// Force rewrite if option change manually
			for (const el of this.Components)
				if (el.desactivable === false)
					for (const data of global.MCpluginSave.active)
						if (data.name === el.name)
						{
							data.active = el.active;
							break;
						}

			const addBuiltin = (json) =>
			{
				for (const i in global.MCpluginSave.active)
					if (global.MCpluginSave.active[i].name === json.name)
						return;
				global.MCpluginSave.active.push(json);
			};
			for (const i in this.Components)
				if (Object.prototype.hasOwnProperty.call(this.Components, i))
				{
					if (this.Components[i].name !== '__DEFAULT')
						addBuiltin({
							name: this.Components[i].name,
							active: this.Components[i].active,
						});
					if (this.Components[i].name !== '__DEFAULT'
					&& (typeof this.Components[i].active === 'undefined' || this.Components[i].active === true))
					{
						global.MCpluginSave.array.push({
							name: this.Components[i].name,
							component: this.Components[i].component,
							isNotification: this.Components[i].isNotification,
							active: this.Components[i].active,
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
				}
			for (const i in global.MCpluginSave.array)
				if (Object.prototype.hasOwnProperty.call(global.MCpluginSave.array, i))
					global.MCpluginSave.array[i].instance = require(global.MCpluginSave.array[i].instancePath); // eslint-disable-line
			fs.writeFileSync(MC.config.Env.ActiveComponents, JSON.stringify(global.MCpluginSave.active, null, 4), { encoding: 'utf-8', flag: 'w' });
		}
		this.plugins = global.MCpluginSave.array;
		this.builtins = global.MCpluginSave.active;
		this.__default = global.MCpluginSave.default;
	}

	/**
	 * Get instance of component
	 * @param {String} name Name of component
	 * @returns Instance function of component, or undefined if error
	 */
	instance(name)
	{
		for (const i in this.plugins)
			if (this.plugins[i].name === name)
				return (this.plugins[i].instance);
		return (undefined);
	}

	/**
	 * Get component
	 * @param {String} name Name of component
	 * @returns Full component, or undefined if error
	 */
	component(name)
	{
		for (const i in this.plugins)
			if (this.plugins[i].name === name)
				return (this.plugins[i]);
		return (undefined);
	}

	/**
	 * Check if component is active
	 * @param {String} name Name of component
	 * @returns true/false if active/desactive; or undefined if not exist
	 */
	active(name)
	{
		for (const i in this.builtins)
			if (this.builtins[i].name === name)
				return (this.builtins[i].active);
		return (undefined);
	}

	/**
	 * Activate / Deactivate component
	 * @param {String} name Name of component
	 * @param {Boolean} forceValue Set to true/false if you want to force activate/desactivate plugin
	 */
	toggle(name, forceValue = undefined)
	{
		for (const i in global.MCpluginSave.active)
			if (global.MCpluginSave.active[i].name === name)
			{
				if (forceValue === undefined)
					global.MCpluginSave.active[i].active = !(global.MCpluginSave.active[i].active);
				else
					global.MCpluginSave.active[i].active = Boolean(forceValue);
				this.builtins = global.MCpluginSave.active;
				break;
			}
	}

	/**
	 * Get lang data of component
	 * @param {String} name Name of component
	 * @returns {JSON} Lang data
	 */
	lang(name)
	{
		let data = null;
		for (const i in this.plugins)
			if (this.plugins[i].name === name)
			{
				try
				{
					if (fs.existsSync(path.join(this.plugins[i].lang, `${MC.config.Env.Lang}.json`)))
						data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, `${MC.config.Env.Lang}.json`)));
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
	default()
	{
		let data = null;
		for (const i in this.plugins)
			if (this.plugins[i].name === this.__default)
			{
				try
				{
					if (fs.existsSync(path.join(this.plugins[i].lang, `${MC.config.Env.Lang}.json`)))
						data = JSON.parse(fs.readFileSync(path.join(this.plugins[i].lang, `${MC.config.Env.Lang}.json`)));
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
	listComponents()
	{
		return (this.plugins);
	}
}

module.exports = MCplugin;
