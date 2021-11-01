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
	 * Implements a block search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static BLOCKS(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		const idOfSearch = hexaID();
		const DOMelementBase = BaseNode(idOfSearch);
		const DOMelementSpan = document.createElement('div'); DOMelementSpan.classList.add('search-dropdown-span'); DOMelementSpan.id = `search-dropdown-span-${idOfSearch}`;
		let ListOfBlocks;
		try
		{
			ListOfBlocks = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/blocks.json`), { encoding: 'utf-8', flag: 'r' }));
		}
		catch (err)
		{
			throw new Error('mapcraft-api/MCsearch/BLOCKS', err);
		}
		for (const block of ListOfBlocks)
		{
			const SpanElementOfList = document.createElement('span');
			SpanElementOfList.setAttribute('value', block.name);
			SpanElementOfList.innerText = block.name;
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
	 * Implements a item search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static ITEMS(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		const idOfSearch = hexaID();
		const DOMelementBase = BaseNode(idOfSearch);
		const DOMelementSpan = document.createElement('div'); DOMelementSpan.classList.add('search-dropdown-span'); DOMelementSpan.id = `search-dropdown-span-${idOfSearch}`;
		let ListOfItems;
		try
		{
			ListOfItems = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/items.json`), { encoding: 'utf-8', flag: 'r' }));
		}
		catch (err)
		{
			throw new Error('mapcraft-api/MCsearch/ITEMS', err);
		}
		for (const item of ListOfItems)
		{
			const SpanElementOfList = document.createElement('span');
			SpanElementOfList.setAttribute('value', item.name);
			SpanElementOfList.innerText = item.name;
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
	 * Implements a potion search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static POTIONS(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		const idOfSearch = hexaID();
		const DOMelementBase = BaseNode(idOfSearch);
		const DOMelementSpan = document.createElement('div'); DOMelementSpan.classList.add('search-dropdown-span'); DOMelementSpan.id = `search-dropdown-span-${idOfSearch}`;
		let ListOfPotions;
		try
		{
			ListOfPotions = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/potions.json`), { encoding: 'utf-8', flag: 'r' }));
		}
		catch (err)
		{
			throw new Error('mapcraft-api/MCsearch/POTIONS', err);
		}
		for (const potion of ListOfPotions)
		{
			const SpanElementOfList = document.createElement('span');
			SpanElementOfList.setAttribute('value', potion.name);
			SpanElementOfList.innerText = potion.name;
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
	 * Implements a trigger search system via a drop-down menu
	 * @param {Element} DOM The Element object in which the search will be inserted
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
	 */
	static TRIGGER(DOM, MinecraftVersion = DefaultMinecraftVersion)
	{
		const idOfSearch = hexaID();
		const DOMelementBase = BaseNode(idOfSearch);
		const DOMelementSpan = document.createElement('div'); DOMelementSpan.classList.add('search-dropdown-span'); DOMelementSpan.id = `search-dropdown-span-${idOfSearch}`;
		let ListOfTriggers;
		try
		{
			ListOfTriggers = JSON.parse(fs.readFileSync(path.join(__dirname, `json/${MinecraftVersion}/triggers.json`), { encoding: 'utf-8', flag: 'r' }));
		}
		catch (err)
		{
			throw new Error('mapcraft-api/MCsearch/TRIGGER', err);
		}
		for (const trigger of ListOfTriggers)
		{
			const SpanElementOfList = document.createElement('span');
			SpanElementOfList.setAttribute('value', trigger.id);
			SpanElementOfList.innerText = trigger.id;
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
}

module.exports = MCsearch;
