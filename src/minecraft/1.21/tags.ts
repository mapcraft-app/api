import type { tags } from '@/types';
import inheritTags from '../1.20.5/tags';

delete inheritTags['music_discs'];
inheritTags['needs_stone_tool'].push(...[
	'crafter', 'chiseled_copper', 'exposed_chiseled_copper', 'weathered_chiseled_copper',
	'oxidized_chiseled_copper', 'waxed_chiseled_copper', 'waxed_exposed_chiseled_copper',
	'waxed_weathered_chiseled_copper', 'waxed_oxidized_chiseled_copper', 'copper_grate',
	'exposed_copper_grate', 'weathered_copper_grate', 'oxidized_copper_grate',
	'waxed_copper_grate', 'waxed_exposed_copper_grate', 'waxed_weathered_copper_grate',
	'waxed_oxidized_copper_grate', 'copper_bulb', 'exposed_copper_bulb',
	'weathered_copper_bulb', 'oxidized_copper_bulb', 'waxed_copper_bulb', 'waxed_exposed_copper_bulb', 'waxed_weathered_copper_bulb',
	'waxed_oxidized_copper_bulb', 'copper_trapdoor', 'exposed_copper_trapdoor',
	'weathered_copper_trapdoor', 'oxidized_copper_trapdoor', 'waxed_copper_trapdoor',
	'waxed_exposed_copper_trapdoor', 'waxed_weathered_copper_trapdoor',
	'waxed_oxidized_copper_trapdoor', 'copper_door', 'exposed_copper_door',
	'weathered_copper_door', 'oxidized_copper_door', 'waxed_copper_door',
	'waxed_exposed_copper_door', 'waxed_weathered_copper_door', 'waxed_oxidized_copper_door'
]);
inheritTags['slabs'].push(...['tuff_slab', 'polished_tuff_slab', 'tuff_brick_slab']);
inheritTags['stairs'].push(...['tuff_stairs', 'polished_tuff_stairs', 'tuff_brick_stairs']);
inheritTags['trapdoors'].push(...[
	'copper_trapdoor', 'exposed_copper_trapdoor', 'weathered_copper_trapdoor',
	'oxidized_copper_trapdoor', 'waxed_copper_trapdoor', 'waxed_exposed_copper_trapdoor',
	'waxed_weathered_copper_trapdoor', 'waxed_oxidized_copper_trapdoor'
]);
inheritTags['doors'].push(...[
	'copper_door', 'exposed_copper_door', 'weathered_copper_door', 'oxidized_copper_door',
	'waxed_copper_door', 'waxed_exposed_copper_door', 'waxed_weathered_copper_door',
	'waxed_oxidized_copper_door'
]);
inheritTags['walls'].push(...[
	'tuff_wall', 'polished_tuff_wall', 'tuff_brick_wall'
]);
inheritTags['breaks_decorated_pots'].push('mace');

export default {
	...inheritTags,
	'#skeletons': [ 'bogged' ],
	'#fall_damage_immune': [ 'breeze' ],
	'#features_cannot_replace': [ 'vault', 'trial_spawner', '#lava_pool_stone_cannot_replace' ],
	'#impact_projectiles': [ 'wind_charge' ],
	'mineable/pickaxe': [
		'crafter', 'heavy_core', 'tuff_slab', 'tuff_stairs', 'tuff_wall', 'chiseled_tuff',
		'polished_tuff', 'polished_tuff_slab', 'polished_tuff_stairs', 'polished_tuff_wall',
		'tuff_bricks', 'tuff_brick_slab', 'tuff_brick_stairs', 'tuff_brick_wall',
		'chiseled_tuff_bricks', 'chiseled_copper', 'exposed_chiseled_copper',
		'weathered_chiseled_copper', 'oxidized_chiseled_copper', 'waxed_chiseled_copper', 'waxed_exposed_chiseled_copper', 'waxed_weathered_chiseled_copper',
		'waxed_oxidized_chiseled_copper', 'copper_grate', 'exposed_copper_grate',
		'weathered_copper_grate', 'oxidized_copper_grate', 'waxed_copper_grate',
		'waxed_exposed_copper_grate', 'waxed_weathered_copper_grate',
		'waxed_oxidized_copper_grate', 'copper_bulb', 'exposed_copper_bulb',
		'weathered_copper_bulb', 'oxidized_copper_bulb', 'waxed_copper_bulb',
		'waxed_exposed_copper_bulb', 'waxed_weathered_copper_bulb',
		'waxed_oxidized_copper_bulb', 'copper_door', 'exposed_copper_door',
		'weathered_copper_door', 'oxidized_copper_door', 'waxed_copper_door',
		'waxed_exposed_copper_door', 'waxed_weathered_copper_door',
		'waxed_oxidized_copper_door', 'copper_trapdoor', 'exposed_copper_trapdoor',
		'weathered_copper_trapdoor', 'oxidized_copper_trapdoor', 'waxed_copper_trapdoor', 'waxed_exposed_copper_trapdoor', 'waxed_weathered_copper_trapdoor', 
		'waxed_oxidized_copper_trapdoor'
	],
	'#has_structure/trial_chambers': [
		'#is_overworld'
	],
	'#air': [
		'air',
		'cave_air',
		'void_air'
	],
	'#blocks_wind_charge_explosions': [
		'barrier',
		'bedrock'
	],
	'#mob_interactable_doors': [],
	'#panic_causes': [
		'#panic_environmental_causes', 'arrow', 'dragon_breath', 'explosion',
		'fireball', 'fireworks', 'indirect_magic', 'magic', 'mob_attack',
		'mob_projectile', 'player_attack', 'player_explosion', 'sonic_boom',
		'sting', 'thrown', 'trident', 'unattributed_fireball', 'wind_charge',
		'wither', 'wither_skull'
	],
	'#panic_environmental_causes': [
		'cactus', 'freeze', 'hot_floor', 'in_fire', 'lava', 'lightning_bolt',
		'on_fire'
	],
	'#can_turn_in_boats': [ 'breeze' ],
	'#deflects_projectiles': [ 'breeze' ],
	'#immune_to_infested': [ 'silverfish' ],
	'#immune_to_oozing': [ 'slime' ],
	'#no_anger_from_wind_charge': [
		'bogged', 'breeze', 'skeleton', 'stray', 'zombie', 'husk', 'spider',
		'cave_spider', 'slime'
	],
	'#enchantable/mace': [ 'mace' ],
	'#on_trial_chambers_maps': [ 'trial_chambers' ]
} as tags;
