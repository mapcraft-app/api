import { versions } from 'minecraft/interface';
import one_seventeen from './1.17';
import one_eightteen from './1.18';
import one_nineteen from './1.19';

export enum dataType {
	biome = 0,
	block,
	effect,
	enchantement,
	entity,
	item,
	potion,
	structure,
	tag,
	trigger
}

export default [
	{
		version: '1.17',
		datapack: 7,
		resourcepack: 7,
		data: one_seventeen
	},
	{
		version: '1.18',
		datapack: 8,
		resourcepack: 8,
		data: one_eightteen
	},
	{
		version: '1.19',
		datapack: 9,
		resourcepack: 9,
		data: one_nineteen
	}
] as versions[];
