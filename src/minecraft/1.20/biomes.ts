import { biome, biomeType } from 'minecraft/interface';
import inheritBiomes from '../1.19/biomes';

export default [
	...inheritBiomes,
	{
		id: 'cherry_grove',
		type: biomeType.temperate
	}
] as biome[];
