import biomes from '../1.20/biomes';
import blocks from '../1.20.3/blocks';
import effects from '../1.19/effects';
import enchantements from '../1.19/enchantements';
import potions from '../1.17/potions';
import entities from './entities';
import items from './items';
import structures from '../1.20/structures';
import tags from './tags';
import triggers from '../1.19/triggers';
import type { baseDefinition } from '@/types';

export default [
	{ type: 'biome', data: biomes },
	{ type: 'block', data: blocks },
	{ type: 'effect', data: effects },
	{ type: 'enchantement', data: enchantements },
	{ type: 'entity', data: entities },
	{ type: 'item', data: items },
	{ type: 'potion', data: potions },
	{ type: 'structure', data: structures },
	{ type: 'tag', data: tags },
	{ type: 'trigger', data: triggers }
] as baseDefinition[];
