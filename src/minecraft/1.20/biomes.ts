import type { biome } from '@/types';
import inheritBiomes from '../1.19/biomes';

export default [
	...inheritBiomes,
	{
		id: 'cherry_grove',
		type: 'temperate'
	}
] as biome[];
