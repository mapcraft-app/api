import { minecraftVersion, versions } from 'minecraft/interface';
import one_seventeen from './1.17';
import one_eightteen from './1.18';
import one_nineteen from './1.19';
import one_nineteen_three from './1.19.3';
import one_nineteen_four from './1.19.4';

export type dataType = 'biome' | 'block' | 'effect' | 'enchantement' | 'entity' | 'item' | 'potion' | 'structure' | 'tag' | 'trigger';

export const minecraft = [
	'1.17', '1.17.1', '1.17.2',
	'1.18', '1.18.1', '1.18.2',
	'1.19', '1.19.1', '1.19.2', '1.19.3', '1.19.4'
] as minecraftVersion[];

export default [
	{
		version: '1.17',
		datapack: 7,
		resourcepack: 7,
		data: one_seventeen
	},
	{
		version: '1.17.1',
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
		version: '1.18.1',
		datapack: 8,
		resourcepack: 8,
		data: one_eightteen
	},
	{
		version: '1.18.2',
		datapack: 9,
		resourcepack: 8,
		data: one_eightteen
	},
	{
		version: '1.19',
		datapack: 10,
		resourcepack: 9,
		data: one_nineteen
	},
	{
		version: '1.19.1',
		datapack: 10,
		resourcepack: 9,
		data: one_nineteen
	},
	{
		version: '1.19.2',
		datapack: 10,
		resourcepack: 9,
		data: one_nineteen
	},
	{
		version: '1.19.3',
		datapack: 10,
		resourcepack: 12,
		data: one_nineteen_three
	},
	{
		version: '1.19.4',
		datapack: 12,
		resourcepack: 13,
		data: one_nineteen_four
	}
] as versions[];
