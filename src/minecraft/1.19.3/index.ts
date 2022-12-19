import { baseDefinition } from '../interface';
import biomes from '../1.19/biomes';
import blocks from '../1.19/blocks';
import effects from '../1.19/effects';
import enchantements from '../1.19/enchantements';
import entities from '../1.19/entities';
import items from '../1.19/items';
import potions from '../1.19/potions';
import structures from '../1.19/structures';
import tags from './tags';
import triggers from '../1.19/triggers';


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
