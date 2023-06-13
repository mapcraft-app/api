import { tags } from 'minecraft/interface';
import tagsList from '../1.19.3/tags';

delete tagsList['only_allows_snow_and_gold_rabbits'];

export default {
	...tagsList,
	'increased_fire_burnout': [
		'bamboo_jungle',
		'mushroom_fields',
		'mangrove_swamp',
		'snowy_slopes',
		'frozen_peaks',
		'jagged_peaks',
		'swamp',
		'jungle'
	],
	'snow_golem_melts': [
		'badlands',
		'basalt_deltas',
		'crimson_forest',
		'desert',
		'eroded_badlands',
		'nether_wastes',
		'savanna',
		'savanna_plateau',
		'soul_sand_valley',
		'warped_forest',
		'windswept_savanna',
		'wooded_badlands'
	],
	'spawns_snow_foxes': [
		'snowy_plains',
		'ice_spikes',
		'frozen_ocean',
		'snowy_taiga',
		'frozen_river',
		'snowy_beach',
		'frozen_peaks',
		'jagged_peaks',
		'snowy_slopes',
		'grove'
	],
	'spawns_white_rabbits': [
		'snowy_plains',
		'ice_spikes',
		'frozen_ocean',
		'snowy_taiga',
		'frozen_river',
		'snowy_beach',
		'frozen_peaks',
		'jagged_peaks',
		'snowy_slopes',
		'grove'
	],
	'smelts_to_glass': [
		'sand',
		'red_sand'
	],
	'always_hurts_ender_dragons': [
		'#is_explosion'
	],
	'always_most_significant_fall': [
		'out_of_world'
	],
	'always_triggers_silverfish': [
		'magic'
	],
	'avoids_guardian_thorns': [
		'magic',
		'thorns',
		'#is_explosion'
	],
	'burns_armor_stands': [
		'on_fire'
	],
	'bypasses_armor': [
		'on_fire',
		'in_wall',
		'cramming',
		'drown', 
		'fly_into_wall',
		'generic',
		'wither',
		'dragon_breath',
		'freeze',
		'starve',
		'fall', 
		'freeze',
		'stalagmite',
		'magic',
		'indirect_magic',
		'out_of_world',
		'sonic_boom'
	],
	'bypasses_cooldown': [],
	'bypasses_effects': [
		'starve'
	],
	'bypasses_enchantments':  [
		'sonic_boom'
	],
	'bypasses_invulnerability': [
		'out_of_world'
	],
	'bypasses_resistance': [
		'out_of_world'
	],
	'bypasses_shield': [
		'#bypasses_armor',
		'falling_anvil',
		'falling_stalactite'
	],
	'damages_helmet': [
		'falling_anvil',
		'falling_block',
		'falling_stalactite' 
	],
	'ignites_armor_stands': [
		'in_fire'
	],
	'is_drowning': [ 
		'drown'
	],
	'is_explosion': [
		'fireworks',
		'explosion',
		'player_explosion', 
		'bad_respawn_point'
	],
	'is_fall': [
		'fall',
		'stalagmite'
	],
	'is_fire': [
		'in_fire',
		'on_fire', 
		'lava',
		'hot_floor',
		'unattributed_fireball',
		'fireball'
	],
	'is_freezing': [
		'freeze'
	],
	'is_lightning': [
		'lightning_bolt'
	],
	'is_projectile': [
		'arrow',
		'trident',
		'mob_projectile',
		'unattributed_fireball',
		'fireball',
		'wither_skull',
		'thrown'
	],
	'no_anger': [
		'mob_attack_no_aggro'
	],
	'no_impact': [
		'drown'
	],
	'witch_resistant_to': [
		'magic',
		'indirect_magic',
		'sonic_boom',
		'thorns'
	],
	'wither_immune_to': [
		'drown'
	],
	'dismounts_underwater': [
		'camel',
		'chicken',
		'donkey',
		'horse',
		'llama',
		'mule',
		'pig',
		'ravager',
		'spider',
		'strider',
		'trader_llama',
		'zombie_horse'
	],
	'fall_damage_immune': [
		'iron_golem',
		'snow_golem',
		'shulker',
		'allay',
		'bat',
		'bee',
		'blaze',
		'cat',
		'chicken',
		'ghast',
		'phantom',
		'magma_cube',
		'ocelot',
		'parrot',
		'wither'
	],
	'axes': [
		'diamond_axe',
		'stone_axe',
		'golden_axe',
		'netherite_axe',
		'wooden_axe',
		'iron_axe'
	],
	'hoes': [
		'diamond_hoe',
		'stone_hoe',
		'golden_hoe',
		'netherite_hoe',
		'wooden_hoe',
		'iron_hoe'
	],
	'pickaxes': [
		'diamond_pickaxe',
		'stone_pickaxe',
		'golden_pickaxe',
		'netherite_pickaxe',
		'wooden_pickaxe',
		'iron_pickaxe'
	],
	'shovels': [
		'diamond_shovel',
		'stone_shovel',
		'golden_shovel',
		'netherite_shovel',
		'wooden_shovel',
		'iron_shovel'
	],
	'swords': [
		'diamond_sword',
		'stone_sword',
		'golden_sword',
		'netherite_sword',
		'wooden_sword',
		'iron_sword'
	],
	'tools': [
		'#axes',
		'#hoes',
		'#pickaxes',
		'#shovels',
		'#swords',
		'trident'
	],
	'spawns_gold_rabbits': [
		'desert'
	],
	'goats_spawnable_on': [
		'#animals_spawnable_on',
		'stone',
		'snow',
		'powder_snow',
		'snow_block',
		'packed_ice',
		'gravel'
	],

	'cherry_logs': [
		'cherry_log',
		'cherry_wood',
		'stripped_cherry_log',
		'stripped_cherry_wood'
	],
	'sniffer_diggable_block': [
		'dirt',
		'grass_block',
		'podzol',
		'coarse_dirt',
		'rooted_dirt',
		'moss_block',
		'mud',
		'muddy_mangrove_roots'
	],

	'breaks_decorated_pots': [
		'#tools'
	],
	'decorated_pot_shards': [
		'brick',
		'pottery_shard_archer',
		'pottery_shard_prize',
		'pottery_shard_arms_up',
		'pottery_shard_skull'
	],
	'noteblock_top_instruments': [
		'zombie_head',
		'skeleton_skull',
		'creeper_head',
		'dragon_head',
		'wither_skeleton_skull',
		'piglin_head',
		'player_head'
	],
	'sniffer_food': [
		'torchflower_seeds'
	],
	'trim_materials': [
		'amethyst_shard',
		'copper_ingot',
		'diamond',
		'emerald',
		'gold_ingot',
		'iron_ingot',
		'lapis_lazuli',
		'netherite_ingot',
		'quartz',
		'redstone'
	],
	'trim_templates': [
		'coast_armor_trim_smithing_template',
		'dune_armor_trim_smithing_template',
		'eye_armor_trim_smithing_template',
		'rib_armor_trim_smithing_template',
		'sentry_armor_trim_smithing_template',
		'snout_armor_trim_smithing_template',
		'spire_armor_trim_smithing_template',
		'tide_armor_trim_smithing_template',
		'vex_armor_trim_smithing_template',
		'ward_armor_trim_smithing_template',
		'wild_armor_trim_smithing_template'
	],
	'trimmable_armor': [
		'chainmail_boots',
		'chainmail_chestplate',
		'chainmail_helmet',
		'chainmail_leggings',
		'diamond_boots',
		'diamond_chestplate',
		'diamond_helmet',
		'diamond_leggings',
		'golden_boots',
		'golden_chestplate',
		'golden_helmet',
		'golden_leggings',
		'iron_boots',
		'iron_chestplate',
		'iron_helmet',
		'iron_leggings',
		'leather_helmet',
		'leather_chestplate',
		'leather_leggings',
		'leather_boots',
		'netherite_boots',
		'netherite_chestplate',
		'netherite_helmet',
		'netherite_leggings',
		'turtle_helmet'
	]
} as tags;
