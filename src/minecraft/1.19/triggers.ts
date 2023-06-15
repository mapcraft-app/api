import { triggers, triggersForm } from 'minecraft/interface';

export default [
	{
		id: 'allay_drop_item_on_block',
		description: 'Triggers when an allay drops an item on a block',
		form: [
			{
				lang: 'Edit.Criteria.Player.Player',
				key: 'player',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Location.Location',
				key: 'location',
				predefined: triggersForm.formLocation
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'avoid_vibration',
		description: 'Triggers when a vibration event is ignored because the source player is holding the sneak key',
		form: [
			{
				lang: 'Edit.Criteria.Player.Player',
				key: 'player',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'kill_mob_near_sculk_catalyst',
		description: 'Triggers when an allay drops an item on a block',
		form: [
			{
				lang: 'Edit.Criteria.Player.Player',
				key: 'player',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'killing_blow',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'bee_nest_destroyed',
		description: 'Triggers when the player breaks a bee nest or beehive',
		form: [
			{
				lang: 'Edit.Criteria.Form.Block',
				key: 'block',
				predefined: triggersForm.searchBlocks
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			},
			{
				lang: 'Edit.Criteria.Form.NumberOfBeesInside',
				element: {
					tag: 'input',
					id: 'num_bees_inside',
					class: 'uk-input',
					type: 'number',
					min: 0
				}
			}
		]
	},
	{
		id: 'bred_animals',
		description: 'Triggers after the player breeds 2 animals',
		form: [
			{
				lang: 'Edit.Criteria.Form.Child',
				key: 'child',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Form.Parent',
				key: 'parent',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Form.Partner',
				key: 'partner',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'brewed_potion',
		description: 'Triggers after the player takes any item out of a brewing stand',
		form: [
			{
				lang: 'Edit.Criteria.Form.Potion',
				key: 'potion',
				predefined: triggersForm.searchPotions
			}
		]
	},
	{
		id: 'changed_dimension',
		description: 'Triggers after the player travels between two dimensions',
		form: [
			{
				lang: 'Edit.Criteria.Form.From',
				element: {
					tag: 'select',
					class: 'uk-select',
					id: 'from',
					childs: [
						{
							tag: 'option',
							'value': 'overworld',
							lang: 'Edit.Criteria.Location.Overworld'
						},
						{
							tag: 'option',
							'value': 'the_nether',
							lang: 'Edit.Criteria.Location.Nether'
						},
						{
							tag: 'option',
							'value': 'the_end',
							lang: 'Edit.Criteria.Location.End'
						}
					]
				}
			},
			{
				lang: 'Edit.Criteria.Form.To',
				element: {
					tag: 'select',
					class: 'uk-select',
					id: 'to',
					childs: [
						{
							tag: 'option',
							'value': 'overworld',
							lang: 'Edit.Criteria.Location.Overworld'
						},
						{
							tag: 'option',
							'value': 'the_nether',
							lang: 'Edit.Criteria.Location.Nether'
						},
						{
							tag: 'option',
							'value': 'the_end',
							lang: 'Edit.Criteria.Location.End'
						}
					]
				}
			}
		]
	},
	{
		id: 'channeled_lightning',
		description: 'Triggers after the player successfully uses the Channeling enchantment on an entity or a lightning rod',
		form: [
			{
				lang: 'Edit.Criteria.Victims.Victims',
				key: 'victims',
				predefined: triggersForm.formVictims
			}
		]
	},
	{
		id: 'construct_beacon',
		description: 'Triggers after the player changes the structure of a beacon',
		form: [
			{
				lang: 'Edit.Criteria.Form.Level',
				element: {
					tag: 'div',
					id: 'level',
					childs: [
						{
							lang: 'Edit.Criteria.Item.Minimum',
							id: 'min',
							tag: 'input',
							class: 'uk-input',
							type: 'number',
							min: 0
						},
						{
							lang: 'Edit.Criteria.Item.Maximum',
							id: 'max',
							tag: 'input',
							class: 'uk-input',
							type: 'number',
							min: 0
						}
					]
				}
			}
		]
	},
	{
		id: 'consume_item',
		description: 'Triggers when the player consumes an item',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'cured_zombie_villager',
		description: 'Triggers when the player cures a zombie villager',
		form: [
			{
				lang: 'Edit.Criteria.Form.Villager',
				key: 'villager',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Form.Zombie',
				key: 'zombie',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'effects_changed',
		description: 'Triggers after the player gets a status effect applied or taken from them',
		form: [
			{
				lang: 'Edit.Criteria.Form.Effect',
				key: 'effects',
				predefined: triggersForm.formEffects
			}
		]
	},
	{
		id: 'enchanted_item',
		description: 'Triggers after the player enchants an item through an enchanting table (does not get triggered through an anvil, or through commands).',
		form: [
			{
				lang: 'Edit.Criteria.Form.Level',
				element: {
					tag: 'div',
					id: 'levels',
					childs: [
						{
							lang: 'Edit.Criteria.Item.Minimum',
							id: 'min',
							tag: 'input',
							class: 'uk-input',
							type: 'number',
							min: 0
						},
						{
							lang: 'Edit.Criteria.Item.Maximum',
							id: 'max',
							tag: 'input',
							class: 'uk-input',
							type: 'number',
							min: 0
						}
					]
				}
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'enter_block',
		description: 'Triggers when the player stands in a block. Checks every tick and will try to trigger for each successful match (up to 8 times, the maximum amount of blocks a player can stand in), which only works if the advancement is revoked from within the advancement using a function reward',
		form: [
			{
				lang: 'Edit.Criteria.Form.Block',
				key: 'block',
				predefined: triggersForm.searchBlocks
			},
			{
				lang: 'Edit.Criteria.State.State',
				key: 'state',
				predefined: triggersForm.formState
			}
		]
	},
	{
		id: 'entity_hurt_player',
		description: 'Triggers after a player gets hurt, even without a source entity',
		form: [
			{
				lang: 'Edit.Criteria.Damage.Damage',
				key: 'damage',
				predefined: triggersForm.formDamage
			}
		]
	},
	{
		id: 'entity_killed_player',
		description: 'Triggers after a living entity kills a player',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Form.KillingBlow',
				key: 'killing_blow',
				predefined: triggersForm.formType
			}
		]
	},
	{
		id: 'fall_from_height',
		description: 'Triggered when a player lands after falling',
		form: [
			{
				lang: 'Edit.Criteria.Player.Player',
				key: 'player',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Location.Location',
				key: 'start_position',
				predefined: triggersForm.formLocation
			},
			{
				lang: 'Edit.Criteria.Distance.Distance',
				key: 'distance',
				predefined: triggersForm.formDistance
			}
		]
	},
	{
		id: 'filled_bucket',
		description: 'Triggers after the player fills a bucket',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'fishing_rod_hooked',
		description: 'Triggers after the player successfully catches an item with a fishing rod or pulls an entity with a fishing rod',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			},
			{
				lang: 'Edit.Criteria.Form.Rod',
				key: 'rod',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'hero_of_the_village',
		description: 'Triggers when the player defeats a raid and checks where the player is',
		form: [
			{
				lang: 'Edit.Criteria.Location.Location',
				key: '__ROOT',
				predefined: triggersForm.formLocation
			}
		]
	},
	{
		id: 'impossible',
		description: 'Never triggers',
		form: []
	},
	{
		id: 'inventory_changed',
		description: 'Triggers after any changes happen to the player\'s inventory',
		form: [
			{
				lang: 'Edit.Criteria.Item.Items',
				key: 'items',
				predefined: triggersForm.formItemsList
			},
			{
				lang: 'Edit.Criteria.Slots.Slots',
				key: 'slots',
				predefined: triggersForm.formSlot
			}
		]
	},
	{
		id: 'item_durability_changed',
		description: 'Triggers after any item in the inventory has been damaged in any form',
		form: [
			{
				lang: 'Edit.Criteria.Durability.EditDurability',
				key: '__ROOT',
				predefined: triggersForm.formDurability
			}
		]
	},
	{
		id: 'item_used_on_block',
		description: 'riggers when the player uses their hand or an item on a block',
		form: [
			{
				lang: 'Edit.Criteria.Location.Location',
				key: 'location',
				predefined: triggersForm.formLocation
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'killed_by_crossbow',
		description: 'Triggers after the player kills a mob or player using a crossbow in ranged combat',
		form: [
			{
				lang: 'Edit.Criteria.Form.UniqueEntityTypes',
				element: {
					tag: 'div',
					id: 'unique_entity_types',
					childs: [
						{
							lang: 'Edit.Criteria.Item.Minimum',
							tag: 'input',
							id: 'min',
							class: 'uk-input',
							type: 'number',
							min: 0
						},
						{
							lang: 'Edit.Criteria.Item.Maximum',
							tag: 'input',
							id: 'max',
							class: 'uk-input',
							type: 'number',
							min: 0
						}
					]
				}
			},
			{
				lang: 'Edit.Criteria.Victims.Victims',
				key: 'victims',
				predefined: triggersForm.formVictims
			}
		]
	},
	{
		id: 'levitation',
		description: 'Triggers when the player has the levitation status effect',
		form: [
			{
				lang: 'Edit.Criteria.Distance.Distance',
				key: 'distance',
				predefined: triggersForm.formDistance
			},
			{
				lang: 'Edit.Criteria.Effects.Duration',
				element: {
					tag: 'div',
					id: 'duration',
					childs: [
						{
							lang: 'Edit.Criteria.Item.Minimum',
							tag: 'input',
							id: 'min',
							class: 'uk-input',
							type: 'number',
							min: 0
						},
						{
							lang: 'Edit.Criteria.Item.Maximum',
							tag: 'input',
							id: 'max',
							class: 'uk-input',
							type: 'number',
							min: 0
						}
					]
				}
			}
		]
	},
	{
		id: 'lightning_strike',
		description: 'Triggers when a lightning bolt disappears from the world, only for players within a 256 block radius of the lightning bolt',
		form: [
			{
				lang: 'Edit.Criteria.Lightning.Lightning',
				key: 'lightning',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Lightning.Bystander',
				key: 'bystander',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'location',
		description: 'Triggers every 20 ticks (1 second) and checks where the player is',
		form: [
			{
				lang: 'Edit.Criteria.Location.Location',
				key: '__ROOT',
				predefined: triggersForm.formLocation
			}
		]
	},
	{
		id: 'nether_travel',
		description: 'Triggers when the player travels to the Nether and then returns to the Overworld',
		form: [
			{
				lang: 'Edit.Criteria.Distance.Distance',
				key: 'distance',
				predefined: triggersForm.formDistance
			}
		]
	},
	{
		id: 'placed_block',
		description: 'Triggers when the player places a block',
		form: [
			{
				lang: 'Edit.Criteria.Form.Block',
				key: 'block',
				predefined: triggersForm.searchBlocks
			},
			{
				lang: 'Edit.Criteria.State.State',
				key: 'state',
				predefined: triggersForm.formState
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			},
			{
				lang: 'Edit.Criteria.Location.Location',
				key: 'location',
				predefined: triggersForm.formLocation
			}
		]
	},
	{
		id: 'player_generates_container_loot',
		description: 'Triggers when the player generates the contents of a container with a loot table set',
		form: [
			{
				lang: 'Edit.Criteria.Form.LootTable',
				element: {
					tag: 'input',
					id: 'loot_table',
					type: 'text',
					class: 'uk-input'
				}
			}
		]
	},
	{
		id: 'player_hurt_entity',
		description: 'Triggers after the player hurts a mob or player',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Damage.Damage',
				key: 'damage',
				predefined: triggersForm.formDamage
			},
			{
				lang: 'Edit.Criteria.Player.Player',
				key: [ 'entity',
					'player' ],
				predefined: triggersForm.formPlayer
			}
		]
	},
	{
		id: 'player_interacted_with_entity',
		description: 'Triggers when the player interacts with an entity',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			},
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'player_killed_entity',
		description: 'Triggers after a player is the source of a mob or player being killed',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Form.KillingBlow',
				key: 'killing_blow',
				predefined: triggersForm.formType
			}
		]
	},
	{
		id: 'recipe_unlocked',
		description: 'Triggers after the player unlocks a recipe',
		form: [
			{
				lang: 'Edit.Criteria.Form.Recipe',
				element: {
					tag: 'input',
					id: 'recipe',
					type: 'text',
					class: 'uk-input'
				}
			}
		]
	},
	{
		id: 'ride_entity_in_lava',
		description: 'Triggered for every tick when player rides in lava',
		form: [
			{
				lang: 'Edit.Criteria.Player.Player',
				key: 'player',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Location.Location',
				key: 'start_position',
				predefined: triggersForm.formLocation
			},
			{
				lang: 'Edit.Criteria.Distance.Distance',
				key: 'distance',
				predefined: triggersForm.formDistance
			}
		]
	},
	{
		id: 'shot_crossbow',
		description: 'Triggers when the player shoots a crossbow',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'slept_in_bed',
		description: 'Triggers when the player enters a bed',
		form: [
			{
				lang: 'Edit.Criteria.Location.Location',
				key: '__ROOT',
				predefined: triggersForm.formLocation
			}
		]
	},
	{
		id: 'slide_down_block',
		description: 'Triggers when the player slides down a block',
		form: [
			{
				lang: 'Edit.Criteria.Form.Block',
				key: 'block',
				predefined: triggersForm.searchBlocks
			}
		]
	},
	{
		id: 'started_riding',
		description: 'Triggers when the player starts riding a vehicle or an entity starts riding a vehicle currently ridden by the player'
	},
	{
		id: 'summoned_entity',
		description: 'Triggers after an entity has been summoned. Works with iron golems (pumpkin and iron blocks), snow golems (pumpkin and snow blocks), the ender dragon (end crystals) and the wither (wither skulls and soul sand/soul soil). Using dispensers to place the wither skulls or pumpkins will still activate this trigger. Spawn eggs, commands and mob spawners will not work however',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'tame_animal',
		description: 'Triggers after the player tames an animal',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'target_hit',
		description: 'Triggers when the player shoots a target block',
		form: [
			{
				lang: 'Edit.Criteria.Form.SignalStrength',
				element: {
					tag: 'input',
					id: 'signal_strength',
					type: 'number',
					class: 'uk-input',
					min: 0
				}
			},
			{
				lang: 'Edit.Criteria.Form.Projectile',
				element: {
					tag: 'input',
					id: 'projectile',
					type: 'text',
					class: 'uk-input'
				}
			},
			{
				lang: 'Edit.Criteria.Form.Shooter',
				key: 'shooter',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'thrown_item_picked_up_by_entity',
		description: 'Triggers after the player throws an item and another entity picks it up',
		form: [
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'allay_drop_item_on_block',
		description: 'Triggers when an allay drops an item on a block',
		form: [
			{
				lang: 'Edit.Criteria.Player.Player',
				key: 'player',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Entity.Entity',
				key: 'entity',
				predefined: triggersForm.formEntities
			},
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'tick',
		description: 'Triggers every tick (20 times per second)'
	},
	{
		id: 'used_ender_eye',
		description: 'Triggers when the player uses an eye of ender (in a world where strongholds generate)',
		form: [
			{
				lang: 'Edit.Criteria.Distance.Distance',
				element: {
					tag: 'div',
					id: 'distance',
					childs: [
						{
							lang: 'Edit.Criteria.Item.Minimum',
							tag: 'input',
							id: 'min',
							class: 'uk-input',
							type: 'number',
							min: 0
						},
						{
							lang: 'Edit.Criteria.Item.Maximum',
							tag: 'input',
							id: 'max',
							class: 'uk-input',
							type: 'number',
							min: 0
						}
					]
				}
			}
		]
	},
	{
		id: 'used_totem',
		description: 'Triggers when the player uses a totem',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'using_item',
		description: 'Triggers for every tick that the player uses an item that is used continuously. It is known to trigger for bows, crossbows, honey bottles, milk buckets, potions, shields, spyglasses, tridents, food items and eyes of ender. Most items that activate from a single click, such as fishing rods, do not affect this trigger',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			}
		]
	},
	{
		id: 'villager_trade',
		description: 'Triggers after the player trades with a villager or a wandering trader',
		form: [
			{
				lang: 'Edit.Criteria.Item.Item',
				key: 'item',
				predefined: triggersForm.formItems
			},
			{
				lang: 'Edit.Criteria.Form.Villager',
				key: 'villager',
				predefined: triggersForm.formEntities
			}
		]
	},
	{
		id: 'voluntary_exile',
		description: 'Triggers when the player causes a raid and checks where the player is',
		form: [
			{
				lang: 'Edit.Criteria.Location.Location',
				key: '__ROOT',
				predefined: triggersForm.formLocation
			}
		]
	}
] as triggers[];
