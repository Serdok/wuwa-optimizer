import portrait from './T_IconRole_Pile_changli_UI.png'
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'changli',
	element: 'fusion',
	weapon_type: 'sword',
	base_stats: {
		'hp': { stat: 'hp', value: 831, },
		'atk': { stat: 'atk', value: 37, },
		'def': { stat: 'def', value: 90, },
	},
	stat_bonuses: [
		{ stat: 'crit_rate', value: 0.012, },
		{ stat: 'crit_rate', value: 0.028, },
		{ stat: 'atk_p', value: 0.018, },
		{ stat: 'atk_p', value: 0.042, },
		{ stat: 'crit_rate', value: 0.012, },
		{ stat: 'crit_rate', value: 0.028, },
		{ stat: 'atk_p', value: 0.018, },
		{ stat: 'atk_p', value: 0.042, },
	],
	buffs: {
		'enflamement': {
			key: 'enflamement',
			kind: 'slider',
			sequence: 0,
			value: 4,
			min_value: 0,
			max_value: 4,
		},
		'fiery_feather': {
			key: 'fiery_feather',
			kind: 'switch',
			sequence: 0,
			value: 1,
		},
		'polished_words': {
			key: 'polished_words',
			kind: 'switch',
			sequence: 4,
			value: 1,
		},
	},
	apply_effects: (input, combat_stats) => {
		if (input.character.buffs['fiery_feather'] > 0) {
			combat_stats['atk_p'] += 0.25;
		}

		if (input.character.sequence >= 2 && input.character.buffs['enflamement'] > 0) {
			combat_stats['crit_rate'] += 0.25;
		}

		if (input.character.sequence >= 4 && input.character.buffs['polished_words'] > 0) {
			combat_stats['atk_p'] += 0.2;
		}
	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'blazing_enlightment',
			apply_effects: () => {},
			motions: [
				{
					type: ['basic'],
					key: 'basic_attack_1_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.2949, 0.2949],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'basic_attack_2_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.3549, 0.3549],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'basic_attack_3_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.3645, 0.3645, 0.3645],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'basic_attack_4_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.507, 0.2958, 0.2958, 0.2958],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'mid_air_attack_1_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.6135],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'mid_air_attack_2_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.5087, 0.5087],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'mid_air_attack_3_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.44, 0.44, 0.44],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'mid_air_attack_4_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.3803, 0.2218, 0.2218, 0.2218, 0.2218],
					apply_effects: () => {},
				},
				{
					type: ['heavy'],
					key: 'heavy_attack',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.2899, 0.2899, 0.2899, 0.3727],
					apply_effects: () => {},
				},
				{
					type: ['heavy'],
					key: 'mid_air_heavy_attack',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [1.2327],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'dodge_counter',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.8264, 0.8264, 0.8264],
					apply_effects: () => {},
				},
			],
		},
		'skill': {
			type: 'skill',
			key: 'tripartite_flames',
			apply_effects: (input, combat_stats) => {
				if (input.character.sequence >= 1) {
					combat_stats['general_bonus'] += 0.1;
				}

				if (input.character.sequence >= 6) {
					combat_stats['enemy_def_ignore'] += 0.4;
				}
			},
			motions: [
				{
					type: ['skill'],
					key: 'true_sight_capture_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.8188, 0.8188, 0.8188, 1.6376],
					apply_effects: () => {},
				},
				{
					type: ['skill'],
					key: 'true_sight_conquest_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.5895, 0.5895, 0.8252, 0.9431],
					apply_effects: (input, combat_stats) => {
						// secret strategist
						combat_stats['fusion_bonus'] += 0.05 * (input.character.buffs['enflamement'] ?? 0);
					},
				},
				{
					type: ['skill'],
					key: 'true_sight_charge_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.7268, 1.0902],
					apply_effects: (input, combat_stats) => {
						// secret strategist
						combat_stats['fusion_bonus'] += 0.05 * (input.character.buffs['enflamement'] ?? 0);
					},
				},
			],
		},
		'forte': {
			type: 'forte',
			key: 'flaming_sacrifice',
			apply_effects: (input, combat_stats) => {
				if (input.character.sequence >= 1) {
					combat_stats['general_bonus'] += 0.1;
				}

				if (input.character.sequence >= 4) {
					combat_stats['skill_multiplier'] += 0.5;
					combat_stats['skill_bonus'] += 0.5;
				}

				if (input.character.sequence >= 6) {
					combat_stats['enemy_def_ignore'] += 0.4;
				}
			},
			motions: [
				{
					type: ['skill'],
					key: 'flaming_sacrifice_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785],
					apply_effects: (input, combat_stats) => {
						// sweeping force
						combat_stats['fusion_bonus'] += 0.2;
						combat_stats['enemy_def_ignore'] += 0.15;
					},
				}
			],
		},
		'burst': {
			type: 'burst',
			key: 'radiance_of_fealty',
			apply_effects: (input, combat_stats) => {
				if (input.character.sequence >= 3) {
					combat_stats['burst_bonus'] += 0.8;
				}

				if (input.character.sequence >= 6) {
					combat_stats['enemy_def_ignore'] += 0.4;
				}
			},
			motions: [
				{
					type: ['basic'],
					key: 'skill_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [12.1275],
					apply_effects: (input, combat_stats) => {
						// sweeping force
						combat_stats['fusion_bonus'] += 0.2;
						combat_stats['enemy_def_ignore'] += 0.15;
					},
				}
			],
		},
		'intro': {
			type: 'intro',
			key: 'obedience_of_rules',
			apply_effects: () => {},
			motions: [
				{
					type: ['intro'],
					key: 'skill_dmg',
					element: ['fusion'],
					tags: [],
					related_stat: 'atk',
					values: [0.445, 0.2596, 0.2596, 0.2596, 0.2596],
					apply_effects: () => {},
				}
			],
		},
		'outro': {
			type: 'outro',
			key: 'strategy_of_duality',
			apply_effects: () => {},
			motions: [],
		},
	},
	image: { portrait },
} as const;

export default data;