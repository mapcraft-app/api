import { tags } from '@/types';
import inheritTags from '../1.20/tags';

export default {
	...inheritTags,
	'camel_sand_step_sound_blocks': [
		'#sand',
		'#concrete_powder'
	],
	'concrete_powder': [
		'black_concrete_powder',
		'blue_concrete_powder',
		'brown_concrete_powder',
		'cyan_concrete_powder',
		'gray_concrete_powder',
		'green_concrete_powder',
		'light_blue_concrete_powder',
		'light_gray_concrete_powder',
		'lime_concrete_powder',
		'magenta_concrete_powder',
		'orange_concrete_powder',
		'pink_concrete_powder',
		'purple_concrete_powder',
		'red_concrete_powder',
		'white_concrete_powder',
		'yellow_concrete_powder'
	],
	'always_kill_armor_stands': [
		'arrow',
		'trident',
		'mob_projectile',
		'fireball',
		'wither_skull'
	],
	'no_knockback': [
		'explosion',
		'player_explosion',
		'bad_respawn_point'
	],
	'non_controlling_rider': [
		'slime',
		'magma_cube'
	]
} as tags;
