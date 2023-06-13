import { tags } from 'minecraft/interface';
import inheritTags from '../1.19.4/tags';

delete inheritTags['ceiling_hanging_signs'];
delete inheritTags['trim_templates'];
delete inheritTags['trimmable_armor'];

export default {
	...inheritTags,
	'has_structure': [
		'taiga', 'snowy_taiga', 'old_growth_pine_taiga', 'old_growth_spruce_taiga',
		'old_growth_birch_forest', 'jungle'
	],
	'trail_ruins': [
		'taiga', 'snowy_taiga', 'old_growth_pine_taiga', 'old_growth_spruce_taiga',
		'old_growth_birch_forest', 'jungle'
	],
	'all_hanging_signs': ['ceiling_hanging_signs', 'wall_hanging_signs'],
	'bamboo_blocks': ['bamboo_block', 'stripped_bamboo_block'],
	'ceiling_hanging_signs': [
		'oak_hanging_sign',
		'spruce_hanging_sign',
		'birch_hanging_sign',
		'acacia_hanging_sign',
		'jungle_hanging_sign',
		'dark_oak_hanging_sign',
		'crimson_hanging_sign',
		'warped_hanging_sign',
		'mangrove_hanging_sign',
		'bamboo_hanging_sign',
		'cherry_hanging_sign',
		'warped_hanging_sign'
	],
	'cherry_logs': ['cherry_log', 'cherry_wood', 'stripped_cherry_log', 'stripped_cherry_wood'],
	'combination_step_sound_blocks': ['#wool_carpets', 'crimson_roots', 'moss_carpet', 'nether_sprouts', 'snow', 'warped_roots'],
	'enchantment_power_provider': ['bookshelf'],
	'enchantment_power_transmitter': ['#replaceable'],
	'maintains_farmland': [
		'pumpkin_stem',
		'attached_pumpkin_stem',
		'melon_stem',
		'attached_melon_stem',
		'beetroots',
		'carrots',
		'potatoes',
		'torchflower_crop',
		'torchflower',
		'pitcher_crop',
		'wheat'
	],
	'replaceable': [
		'air', 'water', 'lava', 'grass', 'fern', 'dead_bush', 'seagrass', 'tall_seagrass', 'fire', 'soul_fire', 'snow', 'vine', 'glow_lichen', 'light', 'tall_grass', 'large_fern', 'structure_void', 'void_air', 'cave_air', 'bubble_column', 'warped_roots', 'nether_sprouts', 'crimson_roots', 'hanging_roots'
	],
	'replaceable_by_trees': [
		'#leaves', 'grass', 'fern', 'dead_bush', 'vine', 'glow_lichen', 'sunflower', 'lilac', 'rose_bush', 'peony', 'tall_grass', 'large_fern', 'hanging_roots', 'pitcher_plant', 'water', 'seagrass', 'tall_seagrass', 'warped_roots', 'nether_sprouts', 'crimson_roots'
	],
	'sniffer_diggable_block': [
		'dirt', 'grass_block', 'podzol', 'coarse_dirt', 'rooted_dirt', 'moss_block', 'mud', 'muddy_mangrove_roots'
	],
	'sniffer_egg_hatch_boost': ['moss_block'],
	'stone_buttons': ['stone_button', 'polished_blackstone_button'],
	'sword_efficient': [
		'#leaves', '#saplings', '#small_flowers', '#crops', 'grass', 'fern', 'dead_bush', 'vine', 'glow_lichen', 'sunflower', 'lilac', 'rose_bush', 'peony', 'tall_grass', 'large_fern', 'hanging_roots', 'pitcher_plant', 'brown_mushroom', 'red_mushroom', 'sugar_cane', 'pumpkin', 'carved_pumpkin', 'jack_o_lantern', 'melon', 'attached_pumpkin_stem', 'attached_melon_stem', 'lily_pad', 'cocoa', 'pitcher_crop', 'sweet_berry_bush', 'cave_vines', 'cave_vines_plant', 'spore_blossom', 'moss_carpet', 'pink_petals', 'big_dripleaf', 'big_dripleaf_stem', 'small_dripleaf', 'nether_wart', 'warped_fungus', 'warped_roots', 'nether_sprouts', 'crimson_fungus', 'weeping_vines', 'weeping_vines_plant', 'twisting_vines', 'twisting_vines_plant', 'crimson_roots', 'chorus_plant', 'chorus_flower'
	],
	'trail_ruins_replaceable': ['gravel'],
	'wall_hanging_signs': ['#walls'],

	'bookshelf_books': ['book', 'written_book', 'writable_book', 'enchanted_book', 'knowledge_book'],
	'breaks_decorated_pots': ['#tools'],
	'decorated_pot_ingredients': ['brick', '#decorated_pot_sherds'],
	'decorated_pot_sherds': [
		'angler_pottery_sherd', 'archer_pottery_sherd', 'arms_up_pottery_sherd', 'blade_pottery_sherd', 'brewer_pottery_sherd', 'burn_pottery_sherd', 'danger_pottery_sherd', 'explorer_pottery_sherd', 'friend_pottery_sherd', 'heart_pottery_sherd', 'heartbreak_pottery_sherd', 'howl_pottery_sherd', 'miner_pottery_sherd', 'mourner_pottery_sherd', 'plenty_pottery_sherd', 'prize_pottery_sherd', 'sheaf_pottery_sherd', 'shelter_pottery_sherd', 'skull_pottery_sherd', 'snort_pottery_sherd'
	],
	'hanging_signs': [
		'oak_hanging_sign',
		'spruce_hanging_sign',
		'birch_hanging_sign',
		'acacia_hanging_sign',
		'jungle_hanging_sign',
		'dark_oak_hanging_sign',
		'crimson_hanging_sign',
		'warped_hanging_sign',
		'mangrove_hanging_sign',
		'bamboo_hanging_sign',
		'cherry_hanging_sign',
		'warped_hanging_sign'
	],
	'noteblock_top_instruments': [
		'zombie_head', 'skeleton_skull', 'creeper_head', 'dragon_head', 'wither_skeleton_skull', 'piglin_head', 'player_head'
	],
	'sniffer_food': ['torchflower_seeds'],
	'trim_templates': [
		'coast_armor_trim_smithing_template', 'dune_armor_trim_smithing_template', 'eye_armor_trim_smithing_template', 'host_armor_trim_smithing_template', 'raiser_armor_trim_smithing_template', 'rib_armor_trim_smithing_template', 'sentry_armor_trim_smithing_template', 'shaper_armor_trim_smithing_template', 'silence_armor_trim_smithing_template', 'snout_armor_trim_smithing_template', 'spire_armor_trim_smithing_template', 'tide_armor_trim_smithing_template', 'vex_armor_trim_smithing_template', 'ward_armor_trim_smithing_template', 'wayfinder_armor_trim_smithing_template', 'wild_armor_trim_smithing_template'
	],
	'trimmable_armor': [
		'chainmail_boots', 'chainmail_chestplate', 'chainmail_helmet', 'chainmail_leggings', 'diamond_boots', 'diamond_chestplate', 'diamond_helmet', 'diamond_leggings', 'golden_boots', 'golden_chestplate', 'golden_helmet', 'golden_leggings', 'iron_boots', 'iron_chestplate', 'iron_helmet', 'iron_leggings', 'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'netherite_boots', 'netherite_chestplate', 'netherite_helmet', 'netherite_leggings', 'turtle_helmet'
	],
	'villager_plantable_seeds': [
		'wheat_seeds', 'potato', 'carrot', 'beetroot_seeds', 'torchflower_seeds', 'pitcher_pod'
	]
} as tags;
