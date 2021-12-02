const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const version = require('./json/version.json');

const DefaultMinecraftVersion = version.LastestVersion;
const hexaID = () => crypto.randomBytes(Math.ceil(24 / 2)).toString('hex').slice(0, 24);
const InputSearch = (target, LIST) =>
{
	const filter = target.value;
	for (let x = 0; x < LIST.length; x++)
		if (LIST[x].getAttribute('value').indexOf(filter) > -1)
			LIST[x].style.display = ''; // eslint-disable-line no-param-reassign
		else
			LIST[x].style.display = 'none'; // eslint-disable-line no-param-reassign
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
			if (type === 'blocksItems')
			{
				ListOfElements = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/blocks.json`), { encoding: 'utf-8', flag: 'r' }));
				ListOfElements.concat(JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/items.json`), { encoding: 'utf-8', flag: 'r' })));
			}
			else
			{
				ListOfElements = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/${type}.json`), { encoding: 'utf-8', flag: 'r' }));
			}
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

		let isHoverList = false;
		DOMelementSpan.addEventListener('mouseover', () =>
		{
			isHoverList = true;
		});
		DOMelementSpan.addEventListener('mouseout', () =>
		{
			isHoverList = false;
		});
		document.addEventListener('click', (event) =>
		{
			if (DOMelementSpan.classList.contains('search-dropdown-span-show') && !event.target.closest(`.search-dropdown-${idOfSearch}`) && !isHoverList)
				DOMelementSpan.classList.remove('search-dropdown-span-show');
		});
		DOMelementBase.Input.addEventListener('focus', () => DOMelementSpan.classList.add('search-dropdown-span-show'));
		DOMelementBase.Input.addEventListener('blur', () =>
		{
			if (!isHoverList)
				DOMelementSpan.classList.remove('search-dropdown-span-show');
		});

		DOMelementSpan.addEventListener('click', (event) =>
		{
			if (event.target.tagName === 'SPAN')
			{
				DOMelementBase.Input.value = event.target.getAttribute('value');
				DOMelementBase.Input.dispatchEvent(new Event('input'));
			}
		});

		const LIST = DOMelementSpan.getElementsByTagName('span');
		let LISTiterator = 0;
		LIST[LISTiterator].classList.add('span-select');
		DOMelementBase.Input.addEventListener('keydown', (Inputkey) =>
		{
			if (Inputkey.code === 'Escape')
			{
				Inputkey.preventDefault();
				Inputkey.stopImmediatePropagation();
				if (DOMelementBase.Input.value)
					DOMelementBase.Input.value = '';
				else
					DOMelementSpan.classList.toggle('search-dropdown-span-show');
				for (const span of LIST)
					span.style.display = '';
				LIST[0].classList.add('span-select');
			}
			else if (DOMelementSpan.classList.contains('search-dropdown-span-show'))
			{
				if (Inputkey.code === 'Enter')
				{
					Inputkey.preventDefault();
					Inputkey.stopImmediatePropagation();
					DOMelementBase.Input.value = LIST[LISTiterator].getAttribute('value');
					DOMelementBase.Input.dispatchEvent(new Event('input'));
					return;
				}
				LIST[LISTiterator].classList.remove('span-select');
				const saveIterator = LISTiterator;
				if (Inputkey.code === 'ArrowUp' && LISTiterator > 0)
				{
					Inputkey.preventDefault();
					Inputkey.stopImmediatePropagation();
					--LISTiterator;
					if (LIST[LISTiterator].style.display === 'none')
					{
						while (LIST[LISTiterator].style.display === 'none' && LISTiterator > 0)
							--LISTiterator;
						if (LISTiterator <= 0)
							LISTiterator = saveIterator;
					}
				}
				else if (Inputkey.code === 'ArrowDown' && LISTiterator < LIST.length - 1)
				{
					Inputkey.preventDefault();
					Inputkey.stopImmediatePropagation();
					++LISTiterator;
					if (LIST[LISTiterator].style.display === 'none')
					{
						while (LIST[LISTiterator].style.display === 'none' && LISTiterator < LIST.length - 1)
							++LISTiterator;
						if (LISTiterator >= LIST.length - 1)
							LISTiterator = saveIterator;
					}
				}
				LIST[LISTiterator].classList.add('span-select');
				LIST[LISTiterator].scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
			}
		});
		DOMelementBase.Input.addEventListener('input', (element) =>
		{
			let it = 0;
			LIST[LISTiterator].classList.remove('span-select');
			InputSearch(element.target, LIST);
			for (const span of LIST)
			{
				if (span.style.display !== 'none')
				{
					span.classList.add('span-select');
					LISTiterator = it;
					break;
				}
				++it;
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
	 * Implements a block and item search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static blocksItems(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		return this.BaseImplementation(DOM, 'blocksItems', 'name', MinecraftVersion);
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

	/**
	 * Get value of search system
	 * @param {Element} DOM Element in which the search system is located
	 * @returns Value of search
	 */
	static GetValue(DOM)
	{
		if (DOM.nodeName === 'INPUT')
			return DOM.value;
		return DOM.querySelector('input.search-dropdown-input').value;
	}

	/**
	 * Set value of search system
	 * @param {Element} DOM Element in which the search system is located
	 * @param {String} value New value of element
	 */
	static SetValue(DOM, value)
	{
		if (DOM.nodeName === 'INPUT')
			DOM.value = value; // eslint-disable-line no-param-reassign
		else
			DOM.querySelector('input.search-dropdown-input').value = value; // eslint-disable-line no-param-reassign
	}
}

module.exports = MCsearch;
