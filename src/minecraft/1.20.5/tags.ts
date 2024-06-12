import inheritTags from '../1.20.3/tags';

inheritTags['axolotl_food'] = inheritTags['axolotl_tempt_items'];
delete inheritTags['axolotl_tempt_items'];
delete inheritTags['tools'];

export default {
	...inheritTags,
	'#wolves_spawnable_on': ['coarse_dirt', 'podzol'],
	'#armadillo_spawnable_on': [
		'#animals_spawnable_on', '#badlands_terracotta', 'red_sand', 'coarse_dirt'
	],
	'#badlands_terracotta': [
		'terracotta', 'white_terracotta', 'yellow_terracotta', 'orange_terracotta', 'red_terracotta', 'brown_terracotta', 'light_gray_terracotta'
	],
	'#does_not_block_hoppers': [
		'beehive', 'bee_nest'
	],
	'#incorrect_for_wooden_tool': [
		'#incorrect_for_gold_tool', '#incorrect_for_stone_tool', '#incorrect_for_iron_tool', '#incorrect_for_diamond_tool', '#incorrect_for_netherite_tool'
	],
	'#bypasses_wolf_armor': [
		'#bypasses_invulnerability', 'cramming', 'drown', 'dry_out', 'freeze', 'in_wall', 'indirect_magic', 'magic', 'outside_border', 'starve', 'thorns', 'wither'
	],
	'#is_player_attack': [
		'player_attack'
	],
	'#tooltip_order': [
		'binding_curse', 'vanishing_curse', 'riptide', 'channeling', 'wind_burst', 'frost_walker', 'sharpness', 'smite', 'bane_of_arthropods', 'impaling', 'power', 'density', 'breach', 'piercing', 'sweeping_edge', 'multishot', 'fire_aspect', 'flame', 'knockback', 'punch', 'protection', 'blast_protection', 'fire_protection', 'projectile_protection', 'feather_falling', 'fortune', 'looting', 'silk_touch', 'luck_of_the_sea', 'efficiency', 'quick_charge', 'lure', 'respiration', 'aqua_affinity', 'soul_speed', 'swift_sneak', 'depth_strider', 'thorns', 'loyalty', 'unbreaking', 'infinity', 'mending'
	],
	'#aquatic': [
		'axolotl', 'cod', 'dolphin', 'elder_guardian', 'glow_squid', 'guardian', 'pufferfish', 'salmon', 'squid', 'tadpole', 'tropical_fish', 'turtle'
	],
	'#arthropod': [
		'bee', 'endermite', 'silverfish', 'spider', 'cave_spider'
	],
	'#ignores_poison_and_regen': [
		'#undead'
	],
	'#illager': [
		'evoker', 'illusioner', 'pillager', 'vindicator'
	],
	'#illager_friends': [
		'#illager'
	],
	'#inverted_healing_and_harm': [
		'#undead'
	],
	'#not_scary_for_pufferfish': [
		'cod', 'dolphin', 'elder_guardian', 'glow_squid', 'guardian', 'pufferfish', 'salmon', 'squid', 'tadpole', 'tropical_fish', 'turtle'
	],
	'#redirectable_projectiles': [
		'fireball', 'wind_charge', 'breeze_wind_charge'
	],
	'#sensitive_to_bane_of_arthropods': [
		'#arthropod'
	],
	'#sensitive_to_impaling': [
		'#aquatic'
	],
	'#sensitive_to_smite': [
		'#undead'
	],
	'#wither_friends': [
		'#undead'
	],
	'#chest_armor': [
		'leather_chestplate', 'chainmail_chestplate', 'golden_chestplate', 'iron_chestplate', 'diamond_chestplate', 'netherite_chestplate'
	],
	'#dyeable': [
		'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots', 'leather_horse_armor', 'wolf_armor'
	],
	'#enchantable/foot_armor': [
		'#foot_armor'
	],
	'#enchantable/leg_armor': [
		'#leg_armor'
	],
	'#enchantable/chest_armor': [
		'#chest_armor'
	],
	'#enchantable/head_armor': [
		'#head_armor'
	],
	'#enchantable/armor': [
		'#enchantable/foot_armor', '#enchantable/leg_armor', '#enchantable/chest_armor', '#enchantable/head_armor'
	],
	'#enchantable/weapon': [
		'#swords',' #axes', 'mace'
	],
	'#enchantable/sword': [
		'#swords'
	],
	'#enchantable/fire_aspect': [
		'#enchantable/sword',  'mace'
	],
	'#enchantable/sharp_weapon': [
		'#swords', '#axes'
	],
	'#enchantable/mining': [
		'#axes', '#pickaxes', '#shovels', '#hoes', 'shears'
	],
	'#enchantable/mining_loot': [
		'#axes', '#pickaxes', '#shovels', '#hoes'
	],
	'#enchantable/fishing': [
		'fishing_rod'
	],
	'#enchantable/trident': [
		'trident'
	],
	'#enchantable/bow': [
		'bow'
	],
	'#enchantable/crossbow': [
		'crossbow'
	],
	'#enchantable/equippable': [
		'#foot_armor', '#leg_armor', '#chest_armor', '#head_armor', 'elytra', '#skulls', 'carved_pumpkin'
	],
	'#enchantable/durability': [
		'#foot_armor', '#leg_armor', '#chest_armor', '#head_armor', 'elytra', 'shield', '#swords', '#axes', '#pickaxes', '#shovels', '#hoes', 'bow', 'crossbow', 'trident', 'mace', 'flint_and_steel', 'shears', 'brush', 'fishing_rod', 'carrot_on_a_stick', 'warped_fungus_on_a_stick'
	],
	'#enchantable/vanishing': [
		'#enchantable/durability', 'mace', 'compass', 'carved_pumpkin', '#skulls'
	],
	'#foot_armor': [
		'leather_boots', 'chainmail_boots', 'golden_boots', 'iron_boots', 'diamond_boots', 'netherite_boots'
	],
	'#head_armor': [
		'leather_helmet', 'chainmail_helmet', 'golden_helmet', 'iron_helmet', 'diamond_helmet', 'netherite_helmet', 'turtle_helmet'
	],
	'#leg_armor': [
		'leather_leggings', 'chainmail_leggings', 'golden_leggings', 'iron_leggings', 'diamond_leggings', 'netherite_leggings'
	],
	'#meat': [
		'beef', 'chicken', 'cooked_beef', 'cooked_chicken', 'cooked_mutton', 'cooked_porkchop', 'cooked_rabbit', 'mutton', 'porkchop', 'rabbit', 'rotten_flesh'
	],
	'#skulls': [
		'player_head', 'creeper_head', 'zombie_head', 'skeleton_skull', 'wither_skeleton_skull', 'dragon_head', 'piglin_head'
	]
};
