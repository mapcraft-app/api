export type minecraftVersion = '1.17' | '1.17.1' | '1.17.2' | '1.18' | '1.18.1' | '1.18.2' | '1.19' | '1.19.1' | '1.19.2' | '1.19.3' | '1.19.4' | '1.20' | '1.20.1';

export type dataType = 'biome' | 'block' | 'effect' | 'enchantement' | 'entity' | 'item' | 'potion' | 'structure' | 'tag' | 'trigger';

export interface baseDefinition {
	type: dataType,
	data: biome[]
		| block[]
		| effect[]
		| enchantement[]
		| entities[]
		| items[]
		| potions[]
		| structures[]
		| tags
		| triggers[]
}

export interface versions {
	version: string;
	datapack: number;
	resourcepack: number;
	indexes: string;
	data: baseDefinition[]
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
	strong?: string;
	long?: string;
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
