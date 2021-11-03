const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DefaultMinecraftVersion = '1.17';
const hexaID = () => crypto.randomBytes(Math.ceil(24 / 2)).toString('hex').slice(0, 24);
const InputSearch = (target, id) =>
{
	const filter = target.value;
	const spanElement = document.getElementById(`search-dropdown-span-${id}`).getElementsByTagName('span');
	for (let x = 0; x < spanElement.length; x++)
		if (spanElement[x].getAttribute('value').indexOf(filter) > -1)
			spanElement[x].style.display = '';
		else
			spanElement[x].style.display = 'none';
};
const BaseNode = (idOfSearch) =>
{
	const DOMelement = document.createElement('div'); DOMelement.classList.add('search-dropdown', `search-dropdown-${idOfSearch}`);
	const DOMelementSearch = document.createElement('div'); DOMelementSearch.classList.add('uk-inline', 'search-dropdown-input');
	const DOMelementSearchSpan = document.createElement('span'); DOMelementSearchSpan.classList.add('uk-form-icon'); DOMelementSearchSpan.setAttribute('uk-icon', 'icon: search');
	const DOMelementSearchInput = document.createElement('input'); DOMelementSearchInput.classList.add('uk-input', 'search-dropdown-input');
	DOMelementSearchInput.type = 'text'; DOMelementSearchInput.id = `search-dropdown-${idOfSearch}`;
	DOMelementSearch.appendChild(DOMelementSearchSpan); DOMelementSearch.appendChild(DOMelementSearchInput);
	DOMelement.appendChild(DOMelementSearch);
	return {
		Base: DOMelement,
		Input: DOMelementSearchInput,
	};
};

class MCsearch
{
	/**
	 * @private
	 */
	static BaseImplementation(DOM, type, key, MinecraftVersion = DefaultMinecraftVersion)
	{
		const idOfSearch = hexaID();
		const DOMelementBase = BaseNode(idOfSearch);
		const DOMelementSpan = document.createElement('div'); DOMelementSpan.classList.add('search-dropdown-span'); DOMelementSpan.id = `search-dropdown-span-${idOfSearch}`;
		let ListOfElements;
		try
		{
			ListOfElements = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/${type}.json`), { encoding: 'utf-8', flag: 'r' }));
		}
		catch (err)
		{
			throw new Error('mapcraft-api/MCsearch/BLOCKS', err);
		}
		for (const element of ListOfElements)
		{
			const SpanElementOfList = document.createElement('span');
			SpanElementOfList.setAttribute('value', element[key]);
			SpanElementOfList.innerText = element[key];
			DOMelementSpan.appendChild(SpanElementOfList);
		}
		DOMelementBase.Base.appendChild(DOMelementSpan);
		DOMelementBase.Input.addEventListener('click', () => DOMelementSpan.classList.toggle('search-dropdown-span-show'));
		document.addEventListener('click', (event) =>
		{
			if (DOMelementSpan.classList.contains('search-dropdown-span-show') && !event.target.closest(`.search-dropdown-${idOfSearch}`))
				DOMelementSpan.classList.toggle('search-dropdown-span-show');
		});
		DOMelementBase.Input.addEventListener('input', (element) => InputSearch(element.target, idOfSearch));
		DOMelementSpan.addEventListener('click', (event) =>
		{
			if (event.target.tagName === 'SPAN')
			{
				DOMelementBase.Input.value = event.target.getAttribute('value');
				DOMelementBase.Input.dispatchEvent(new Event('input'));
			}
		});
		DOM.appendChild(DOMelementBase.Base);
		return (idOfSearch);
	}

	/**
	 * Implements a biome search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static biomes(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'biomes', 'id', MinecraftVersion);
	}

	/**
	 * Implements a block search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static blocks(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'blocks', 'name', MinecraftVersion);
	}

	/**
	 * Implements a effect search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static effects(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'effects', 'name', MinecraftVersion);
	}

	/**
	 * Implements a enchantement search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static enchantements(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'enchantements', 'id', MinecraftVersion);
	}

	/**
	 * Implements a entitie search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static entities(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'entities', 'name', MinecraftVersion);
	}

	/**
	 * Implements a item search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static items(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'items', 'name', MinecraftVersion);
	}

	/**
	 * Implements a potion search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static potions(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'potions', 'name', MinecraftVersion);
	}

	/**
	 * Implements a structure search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static structures(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'structures', 'name', MinecraftVersion);
	}

	/**
	 * Implements a trigger search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static triggers(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'triggers', 'id', MinecraftVersion);
	}
}

module.exports = MCsearch;
