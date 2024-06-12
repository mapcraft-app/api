import { IncomingHttpHeaders } from 'http';

/**
 * Backend
 */
export interface envInterface {
	app: string;
	appData: string;
	date: string;
	game: string;
	log: string;
	resource: string;
	save: string;
	temp: string;
}

export interface statFile {
	percent: number;
	received: number;
	size: number;
}

export interface tableInterface {
	name: string;
	sql: string;
}

/**
 * Minecraft
 */
export type minecraftVersion =
	'1.17'
	| '1.17.1'
	| '1.17.2'
	| '1.18'
	| '1.18.1'
	| '1.18.2'
	| '1.19'
	| '1.19.1'
	| '1.19.2'
	| '1.19.3'
	| '1.19.4'
	| '1.20'
	| '1.20.1'
	| '1.20.2'
	| '1.20.3'
	| '1.20.4'
	| '1.20.5'
	| '1.20.6';

export type dataType =
	'biome'
	| 'block'
	| 'effect'
	| 'enchantement'
	| 'entity'
	| 'item'
	| 'potion'
	| 'structure'
	| 'tag'
	| 'trigger';

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
	version: minecraftVersion;
	datapack: number;
	resourcepack: number;
	indexes: string;
	data: baseDefinition[]
}

export type biomeType =
	'aquatic'
	| 'cold'
	| 'end'
	| 'nether'
	| 'neutral'
	| 'snowy'
	| 'temperate'
	| 'underground'
	| 'warm';

export interface biome {
	id: string;
	type: biomeType;
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

export type triggersForm =
	'formDamage'
	| 'formDistance'
	| 'formDurability'
	| 'formEffects'
	| 'formEntities'
	| 'formItems'
	| 'formItemsList'
	| 'formLocation'
	| 'formPlayer'
	| 'formSlot'
	| 'formState'
	| 'formType'
	| 'formVictims'
	| 'searchBlocks'
	| 'searchPotions';

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

/**
 * Misc
 */
export interface fetchResponse {
	body: string,
	headers: IncomingHttpHeaders,
	status: number,
	statusText: string | undefined,
	json: () => Record<any, any>
}
