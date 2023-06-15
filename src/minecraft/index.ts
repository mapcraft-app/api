import data, { minecraft, semverCompare } from './version';
import type { biome, block, effect, enchantement, entities, items, minecraftVersion, potions, structures, tags, triggers, versions } from './interface';
import type { dataType } from './interface';

export default {
	/**
	 * List of all minecraft version supported by mapcraft
	 */
	minecraft: (): string[] => minecraft,

	/**
	 * Semantic Versioning Comparing
	 * @returns `-1: compare < to` `0: compare === to` `1: compare > to`
	 */
	semverCompare,

	/**
	 * List of all minecraft version supported by mapcraft with data linked to it
	 */
	versions: (): versions[] => data,
	
	/**
	 * Get data of specific type
	 * @param version Minecraft version
	 * @param type Type of data(s) wanted
	 * @returns Array of data(s) or undefined if type not exist
	 */
	get: (version: minecraftVersion, type: dataType = 'biome'): biome[] | block[] | effect[] | enchantement[] | entities[] | items[] | potions[] | structures[] | tags | triggers[] | undefined => {
		for (const el of data) {
			if (el.version === version) {
				for (const data of el.data) {
					if (data.type === type)
						return data.data;
				}
			}
		}
		return undefined;
	}
};
