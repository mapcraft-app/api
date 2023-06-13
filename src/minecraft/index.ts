import data, { minecraft } from './version';
import type { biome, block, effect, enchantement, entities, items, minecraftVersion, potions, structures, tags, triggers, versions } from './interface';
import type { dataType } from './interface';

export default {
	minecraft: (): string[] => minecraft,
	versions: (): versions[] => data,
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
