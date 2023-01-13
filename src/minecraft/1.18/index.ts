import { baseDefinition } from '../interface';
import biomes from './biomes';
import blocks from './blocks';
import effects from './effects';
import enchantements from './enchantements';
import entities from './entities';
import items from './items';
import potions from '../1.17/potions';
import structures from './structures';
import tags from './tags';
import triggers from './triggers';

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
