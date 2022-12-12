import type { biome, block, effect, enchantement, entities, items, potions, structures, tags, triggers } from './interface';
import { versions } from './interface';
import data, { dataType, minecraft } from './version';

export default {
	minecraft: (): string[] => minecraft,
	versions: (): versions[] => data,
	get: (version: string, type: dataType = dataType.biome): biome[] | block[] | effect[] | enchantement[] | entities[] | items[] | potions[] | structures[] | tags | triggers[] | undefined => {
		for (const el of data) {
			if (el.version === version)
				return el.data.at(type);
		}
		return undefined;
	}
};
