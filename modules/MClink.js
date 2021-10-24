class MClink
{
	constructor()
	{
		this._components = [];
	}

	/**
	 * Add component to list
	 * @param {String} component
	 */
	addComponent(component)
	{
		if (component && this._components.indexOf(component) === -1)
			this._components.push(component);
	}

	/**
	 * Remove component to list
	 * @param {String} component
	 */
	removeComponent(component)
	{
		this._components.splice(this._components.indexOf(component), 1);
	}

	/**
	 * Get array of every component(s)
	 * @returns {Array} Array of component(s)
	 */
	getComponents()
	{
		return (this._components);
	}

	/**
	 * Clean component(s)
	 */
	cleanComponents()
	{
		delete this._components;
	}
}

const link = new MClink();

module.exports = link;
