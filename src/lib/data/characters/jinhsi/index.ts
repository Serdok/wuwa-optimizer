import portrait from './T_IconRole_Pile_jinxi_UI.png'
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'jinhsi',
	element: 'spectro',
	weapon_type: 'broadsword',
	base_stats: {
		'hp': { stat: 'hp', value: 866, },
		'atk': { stat: 'atk', value: 33, },
		'def': { stat: 'def', value: 103, },
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
		'incandescence': {
			key: 'incandescence',
			kind: 'slider',
			sequence: 0,
			value: 50,
			min_value: 0,
			max_value: 50,
		},
		'herald_of_revival': {
			key: 'herald_of_revival',
			kind: 'slider',
			sequence: 1,
			value: 4,
			min_value: 0,
			max_value: 4,
		},
		'immortal_s_descendancy': {
			key: 'immortal_s_descendancy',
			kind: 'slider',
			sequence: 3,
			value: 2,
			min_value: 0,
			max_value: 2,
		},
		'benevolent_grace': {
			key: 'benevolent_grace',
			kind: 'switch',
			sequence: 4,
			value: 0,
		}
	},
	apply_effects: (input, combat_stats) => {
		// inherent skill 1 - radiant surge
		combat_stats['spectro_bonus'] += 0.2;

		if (input.character.sequence >= 3) {
			combat_stats['atk_p'] += 0.25 * (input.character.buffs['immortal_s_descendancy'] || 0);
		}
		if (input.character.sequence >= 4) {
			combat_stats['general_bonus'] += 0.2 * (input.character.buffs['benevolent_grace'] || 0);
		}
	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'slash_of_breaking_dawn',
			apply_effects: () => {},
			motions: [
				{
					type: 'basic',
					key: 'stage_1_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.6647],
					apply_effects: () => {},
				},
				{
					type: 'basic',
					key: 'stage_2_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.3899, 0.1950, 0.1950, 0.1950],
					apply_effects: () => {},
				},
				{
					type: 'basic',
					key: 'stage_3_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.3194],
					apply_effects: () => {},
				},
				{
					type: 'basic',
					key: 'stage_4_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.6309, 0.9463],
					apply_effects: () => {},
				},
				{
					type: 'heavy',
					key: 'heavy_attack_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.2386, 0.2386, 0.2386, 0.2386, 0.2386, 0.3579, 0.8351],
					apply_effects: () => {},
				},
				{
					type: 'basic',
					key: 'mid_air_attack_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.1233, 0.2466, 0.8629],
					apply_effects: () => {},
				},
				{
					type: 'basic',
					key: 'dodge_counter',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.4402],
					apply_effects: () => {},
				},
			],
		},
		'skill': {
			type: 'skill',
			key: 'trailing_lights_of_eons',
			apply_effects: () => {},
			motions: [
				{
					type: 'skill',
					key: 'skill_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.1946, 0.1946, 0.1946, 0.1946, 0.7784],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'overflowing_radiance_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.0987, 0.0987, 0.0987, 0.0987, 0.2959, 0.2959, 0.2959, 0.2959, 0.3945],
					apply_effects: () => {},
				},
			],
		},
		'forte': {
			type: 'forte',
			key: 'luminal_synthesis',
			apply_effects: () => {},
			motions: [
				{
					type: 'skill',
					key: 'incarnation_basic_attack_1_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.8862],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'incarnation_basic_attack_2_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.7797, 0.2599, 0.2599],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'incarnation_basic_attack_3_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.9944, 0.663],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'incarnation_basic_attack_4_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.1867, 0.1867, 0.1867, 0.1867, 0.1867, 0.1867, 0.7467],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'incarnation_heavy_attack_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.4772, 1.1134],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'incarnation_dodge_counter_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.4389, 0.3292, 0.3292, 1.0971],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'crescent_divinity_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [1.0076, 0.7557, 0.7557, 2.519],
					apply_effects: () => {},
				},
				{
					type: 'skill',
					key: 'illuminous_epiphany_solar_flare_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [0.1989, 0.1989, 0.1989, 0.1989, 0.1989, 0.1989],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 1) {
							combat_stats['skill_bonus'] += 0.2 * (input.character.buffs['herald_of_revival'] || 0);
						}
						if (input.character.sequence >= 6) {
							combat_stats['skill_multiplier'] += 0.45;
						}
					},
				},
				{
					type: 'skill',
					key: 'illuminous_epiphany_stella_glamor_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [3.4792],
					apply_effects: (input, combat_stats) => {
						let incandescence_bonus = 0.4454;
						if (input.character.sequence >= 6) {
							incandescence_bonus += 0.45;
							combat_stats['skill_multiplier'] += 0.45;
						}

						combat_stats['skill_multiplier'] += incandescence_bonus * (input.character.buffs['incandescence'] || 0);

						if (input.character.sequence >= 1) {
							combat_stats['skill_bonus'] += 0.2 * (input.character.buffs['herald_of_revival'] || 0);
						}
					},
				},
			],
		},
		'burst': {
			type: 'burst',
			key: 'purge_of_light',
			apply_effects: (input, combat_stats) => {
				if (input.character.sequence >= 5) {
					combat_stats['skill_multiplier'] += 1.2;
				}
			},
			motions: [
				{
					type: 'burst',
					key: 'skill_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [4.9981, 11.6622],
					apply_effects: () => {},
				}
			],
		},
		'intro': {
			type: 'intro',
			key: 'loong_s_halo',
			apply_effects: (input, combat_stats) => {
				combat_stats['skill_multiplier'] += 0.5;
			},
			motions: [
				{
					type: 'intro',
					key: 'skill_dmg',
					element: 'spectro',
					related_stat: 'atk',
					values: [1.5905],
					apply_effects: () => {},
				}
			],
		},
		'outro': {
			type: 'outro',
			key: 'temporal_bender',
			apply_effects: () => {},
			motions: [],
		},
	},
	image: { portrait },
} as const;

export default data;