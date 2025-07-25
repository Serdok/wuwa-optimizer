import portrait from './T_IconRole_Pile_Feibi_UI.png';
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'phoebe',
	element: 'spectro',
	weapon_type: 'rectifier',
	base_stats: {
		'hp': { stat: 'hp', value: 866, },
		'atk': { stat: 'atk', value: 33, },
		'def': { stat: 'def', value: 103, },
	},
	stat_bonuses: [
		{ stat: 'crit_dmg', value: 0.024, },
		{ stat: 'crit_dmg', value: 0.056, },
		{ stat: 'atk_p', value: 0.018, },
		{ stat: 'atk_p', value: 0.042, },
		{ stat: 'crit_dmg', value: 0.024, },
		{ stat: 'crit_dmg', value: 0.056, },
		{ stat: 'atk_p', value: 0.018, },
		{ stat: 'atk_p', value: 0.042, },
	],
	buffs: {
		'spectro_frazzle': {
			key: 'spectro_frazzle',
			kind: 'switch',
			sequence: 0,
			value: 1,
		},
		'absolution': {
			key: 'absolution',
			kind: 'switch',
			sequence: 0,
			value: 1,
		},
		'confession': {
			key: 'confession',
			kind: 'switch',
			sequence: 0,
			value: 0,
		},
		'ring_of_mirrors': {
			key: 'ring_of_mirrors',
			kind: 'switch',
			sequence: 6,
			value: 0,
		}
	},
	apply_effects: (input, combat_stats) => {
		if (input.character.buffs['absolution'] || input.character.buffs['confession']) {
			combat_stats.spectro_bonus += 0.12;
		}

		if (input.character.sequence >= 6 && input.character.buffs['ring_of_mirrors']) {
			combat_stats.atk_p += 0.1;
		}
	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'o_come_divine_light',
			apply_effects: (input, combat_stats) => {
				if (input.character.sequence >= 4) {
					combat_stats.enemy_resistance -= 0.1;
				}
			},
			motions: [
				{
					type: ['basic'],
					key: 'stage_1_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.2953],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'stage_2_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.2237, 0.2734],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'stage_3_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.1424, 0.1424, 0.1424, 0.1424, 0.1424, 0.1424, 0.1424, 0.1424],
					apply_effects: () => {},
				},
				{
					type: ['heavy'],
					key: 'heavy_attack_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.4135, 0.4135, 0.4135, 0.4135],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'mid_air_attack_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.4623, 0.4623],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'dodge_counter_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.2158, 0.2158, 0.2158, 0.2158, 0.2158, 0.2158, 0.2158, 0.2158],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'chamuel_s_star_dodge_counter_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.4386, 0.4386, 0.4386, 0.4386, 0.4386, 0.4386, 0.4386],
					apply_effects: () => {},
				},
			],
		},
		'skill': {
			type: 'skill',
			key: 'to_where_light_shines',
			apply_effects: () => {},
			motions: [
				{
					type: ['skill'],
					key: 'skill_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.6263, 0.6263],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'ring_of_mirrors_refracted_holy_light_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.1492, 0.1492],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'chamuel_s_star_stage_1_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.5935],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'chamuel_s_star_stage_2_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.3977, 0.3977],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'chamuel_s_star_stage_3_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.2893, 0.2893, 0.2893, 0.2893, 0.2893, 0.2893],
					apply_effects: () => {},
				},
			],
		},
		'forte': {
			type: 'forte',
			key: 'radiant_invocation',
			apply_effects: () => {},
			motions: [
				{
					type: ['heavy'],
					key: 'absolution_litany_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [6.3819],
					apply_effects: () => {},
				},
				{
					type: ['skill'],
					key: 'utter_confession_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [1.8788],
					apply_effects: () => {},
				},
				{
					type: ['heavy'],
					key: 'heavy_attack_starflash_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [0.8269, 0.8269, 0.8269],
					apply_effects: (input, combat_stats) => {
						if (input.character.buffs['spectro_frazzle']) {
							combat_stats.general_amplify += 2.56;
						}

						if (input.character.sequence >= 3) {
							if (input.character.buffs['absolution']) {
								combat_stats.skill_multiplier += 0.91;
							}
							if (input.character.buffs['confession']) {
								combat_stats.skill_multiplier += 2.49;
							}
						}
					},
				},
			],
		},
		'burst': {
			type: 'burst',
			key: 'dawn_of_enlightenment',
			apply_effects: (input, combat_stats) => {
				let multiplier = 2.55;
				if (input.character.sequence >= 1) {
					multiplier = 4.8;
				}

				if (input.character.buffs['absolution']) {
					combat_stats.skill_multiplier += multiplier;
				}

				if (input.character.sequence >= 1 && input.character.buffs['confession']) {
					combat_stats.skill_multiplier += 0.9;
				}
			},
			motions: [
				{
					type: ['burst'],
					key: 'skill_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [4.016],
					apply_effects: () => {},
				}
			],
		},
		'intro': {
			type: 'intro',
			key: 'golden_grace',
			apply_effects: (input, combat_stats) => {
				if (input.character.sequence >= 5) {
					combat_stats.spectro_bonus += 0.12;
				}
			},
			motions: [
				{
					type: ['intro'],
					key: 'skill_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [1.9881],
					apply_effects: () => {},
				}
			]
		},
		'outro': {
			type: 'outro',
			key: 'attentive_heart',
			apply_effects: (input, combat_stats) => {
				if (input.character.buffs['absolution']) {
					combat_stats.skill_multiplier += 2.55;
				}

				if (input.character.sequence >= 2) {
					if (input.character.buffs['absolution']) {
						combat_stats.general_amplify += 1.2;
					}
				}
			},
			motions: [
				{
					type: ['outro'],
					key: 'skill_dmg',
					element: ['spectro'],
					tags: [],
					related_stat: 'atk',
					values: [5.2841],
					apply_effects: () => {},
				}
			]
		},
	},
	image: { portrait },
}

export default data;