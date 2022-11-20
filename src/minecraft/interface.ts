export interface versions {
	version: string;
	datapack: number;
	resourcepack: number;
	data: (biome[] | block[] | effect[] | enchantement[] | entities[] | items[] | potions[] | structures[] | tags | triggers[])[]
}

export interface biome {
	id: string;
	type: string;
}

export enum biomeType {
	aquatic = 'aquatic',
	cold = 'cold',
	end = 'end',
	nether = 'nether',
	neutral = 'neutral',
	snowy = 'snowy',
	temperate = 'temperate',
	underground = 'underground',
	warm = 'warm'
}

export interface block {
	name: string
}

export interface effect {
	name: string;
}

export interface enchantement {
	id: string;
	description: string;
	level: [number, number]
}

export interface entities {
	name: string;
}

export interface items {
	name: string;
}

export interface potions {
	name: string;
}

export interface structures {
	name: string;
}

export interface tags {
	[index: string]: string[]
}

export enum triggersForm {
	formDamage = 0,
	formDistance,
	formDurability,
	formEffects,
	formEntities,
	formItems,
	formItemsList,
	formLocation,
	formPlayer,
	formSlot,
	formState,
	formType,
	formVictims,

	searchBlocks,
	searchPotions
}

export interface triggersChild {
	class?: string;
	id: string;
	lang?: string;
	min?: number;
	max?: number;
	tag: string;
	type?: 'number' | 'text';
	childs?: [triggersChild]
}

export interface triggers {
	id: string;
	description: string;
	form?: [{
		key: string | string[];
		lang: string;
		predefined?: triggersForm,
		element?: triggersChild
	}]
}
