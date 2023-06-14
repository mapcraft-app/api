import { minecraftVersion, versions } from 'minecraft/interface';
import one_seventeen from './1.17';
import one_eightteen from './1.18';
import one_nineteen from './1.19';
import one_nineteen_three from './1.19.3';
import one_nineteen_four from './1.19.4';
import one_twenty from './1.20';

/**
 * Semantic Versioning Comparing
 * @returns `-1: compare < to` `0: compare === to` `1: compare > to`
 */
export const semverCompare = (compare: minecraftVersion, to: minecraftVersion): number => {
	if (compare.startsWith(to + '-'))
		return -1;
	if (to.startsWith(compare + '-'))
		return  1;
	return compare.localeCompare(to, undefined, { numeric: true, sensitivity: 'case', caseFirst: 'upper' });
};

/**
 * List of all minecraft version supported by mapcraft
 */
export const minecraft = [
	'1.17', '1.17.1', '1.17.2',
	'1.18', '1.18.1', '1.18.2',
	'1.19', '1.19.1', '1.19.2', '1.19.3', '1.19.4',
	'1.20', '1.20.1'
] as minecraftVersion[];

export default [
	{
		version: '1.17',
		datapack: 7,
		resourcepack: 7,
		indexes: '1.17.json',
		data: one_seventeen
	},
	{
		version: '1.17.1',
		datapack: 7,
		resourcepack: 7,
		indexes: '1.17.json',
		data: one_seventeen
	},
	{
		version: '1.18',
		datapack: 8,
		resourcepack: 8,
		indexes: '1.18.json',
		data: one_eightteen
	},
	{
		version: '1.18.1',
		datapack: 8,
		resourcepack: 8,
		indexes: '1.18.json',
		data: one_eightteen
	},
	{
		version: '1.18.2',
		datapack: 9,
		resourcepack: 8,
		indexes: '1.18.json',
		data: one_eightteen
	},
	{
		version: '1.19',
		datapack: 10,
		resourcepack: 9,
		indexes: '1.19.json',
		data: one_nineteen
	},
	{
		version: '1.19.1',
		datapack: 10,
		resourcepack: 9,
		indexes: '1.19.json',
		data: one_nineteen
	},
	{
		version: '1.19.2',
		datapack: 10,
		resourcepack: 9,
		indexes: '2.json',
		data: one_nineteen
	},
	{
		version: '1.19.3',
		datapack: 10,
		resourcepack: 12,
		indexes: '3.json',
		data: one_nineteen_three
	},
	{
		version: '1.19.4',
		datapack: 12,
		resourcepack: 13,
		indexes: '4.json',
		data: one_nineteen_four
	},
	{
		version: '1.20',
		datapack: 15,
		resourcepack: 15,
		indexes: '5.json',
		data: one_twenty
	},
	{
		version: '1.20.1',
		datapack: 15,
		resourcepack: 15,
		indexes: '5.json',
		data: one_twenty
	}
] as versions[];
