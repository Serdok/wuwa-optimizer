import portrait from './T_IconRole_Pile_zanni_UI.png';
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'zani',
	element: 'spectro',
	weapon_type: 'gauntlet',
	base_stats: {
		'hp': { stat: 'hp', value: 862, },
		'atk': { stat: 'atk', value: 35, },
		'def': { stat: 'def', value: 93, },
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
		'sunburst': {
			key: 'sunburst',
			kind: 'switch',
			sequence: 0,
			value: 1,
		},
		'inferno_mode': {
			key: 'inferno_mode',
			kind: 'switch',
			sequence: 0,
			value: 1,
		},
		'nightfall_blaze_consumed': {
			key: 'nightfall_blaze_consumed',
			kind: 'slider',
			sequence: 0,
			value: 40,
			min_value: 0,
			max_value: 40,
		},
		'immediate_execution': {
			key: 'immediate_execution',
			kind: 'switch',
			sequence: 0,
			value: 1,
		},
		'heliacal_ember': {
			key: 'heliacal_ember',
			kind: 'slider',
			sequence: 0,
			value: 60,
			min_value: 0,
			max_value: 60,
		},
		'total_blaze_consumed': {
			key: 'total_blaze_consumed',
			kind: 'slider',
			sequence: 3,
			value: 150,
			min_value: 0,
			max_value: 150,
		},
	},
	apply_effects: (input, combat_stats) => {
		const { sunburst, immediate_execution } = input.character.buffs;
		const sequence = input.character.sequence;

		if (sunburst) {
			combat_stats.spectro_frazzle_amplify += 0.2;
			if (sequence >= 1) {
				combat_stats.spectro_bonus += 0.5;
			}
		}

		if (immediate_execution) {
			combat_stats.spectro_bonus += 0.12;
			if (sequence >= 4) {
				combat_stats.atk_p += 0.2;
			}
		}

		if (sequence >= 2) {
			combat_stats.crit_rate += 0.2;
		}
	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'routine_negotiation',
			apply_effects: () => {},
			motions: [
				{
					type: ['basic'],
					key: 'stage_1_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.5885],
					apply_effects: () => {}
				},
				{
					type: ['basic'],
					key: 'stage_2_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.7953],
					apply_effects: () => {}
				},
				{
					type: ['basic'],
					key: 'stage_3_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.4242, 0.4242, 0.4242],
					apply_effects: () => {}
				},
				{
					type: ['basic'],
					key: 'stage_4_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.676, 0.676, 0.676, 0.676],
					apply_effects: () => {}
				},
				{
					type: ['basic'],
					key: 'breakthrough_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.615, 0.1758, 0.1758, 0.1758, 0.1758, 0.1758, 0.1758, 0.1758,],
					apply_effects: () => {}
				},
				{
					type: ['heavy'],
					key: 'heavy_attack_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.4108, 0.4108, 0.4108, 0.4108],
					apply_effects: () => {}
				},
				{
					type: ['basic'],
					key: 'plunging_attack_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [1.0498],
					apply_effects: () => {}
				},
				{
					type: ['basic'],
					key: 'dodge_counter_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.7423, 0.7423, 0.7423],
					apply_effects: () => {}
				},
			],
		},
		'skill': {
			type: 'skill',
			key: 'restless_watch',
			apply_effects: () => {},
			motions: [
				{
					type: ['skill'],
					key: 'standard_defense_protocol_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.6394],
					apply_effects: () => {}
				},
				{
					type: ['skill'],
					key: 'pinpoint_strike_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.61, 1.2199],
					apply_effects: () => {}
				},
				{
					type: ['skill'],
					key: 'targeted_action_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.8619, 0.2873, 1.7237],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.8;
						}
					}
				},
				{
					type: ['skill'],
					key: 'forcible_riposte_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.8619, 0.2873, 1.7237],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.8;
						}
					}
				},
			],
		},
		'forte': {
			type: 'forte',
			key: 'there_will_be_a_light',
			apply_effects: (input, combat_stats) => {
				const { inferno_mode } = input.character.buffs;

				if (inferno_mode) {
					combat_stats.skill_multiplier += 0.25;
				}
			},
			motions: [
				{
					type: ['heavy'],
					key: 'heavy_slash_daybreak_dmg',
					element: ['spectro', 'spectro_frazzle'],
					related_stat: 'atk',
					values: [1.9881],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 6) {
							combat_stats.skill_multiplier += 0.4;
						}
					}
				},
				{
					type: ['heavy'],
					key: 'heavy_slash_dawning_dmg',
					element: ['spectro', 'spectro_frazzle'],
					related_stat: 'atk',
					values: [4.2407],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 6) {
							combat_stats.skill_multiplier += 0.4;
						}
					}
				},
				{
					type: ['heavy'],
					key: 'heavy_slash_nightfall_dmg',
					element: ['spectro', 'spectro_frazzle'],
					related_stat: 'atk',
					values: [1.352, 2.6243],
					apply_effects: (input, combat_stats) => {
						const { nightfall_blaze_consumed } = input.character.buffs;
						let extra_multiplier = 0.095;

						if (input.character.sequence >= 6) {
							combat_stats.skill_multiplier += 0.4;
							extra_multiplier += 0.4;
						}

						combat_stats.skill_multiplier += extra_multiplier * nightfall_blaze_consumed;
					}
				},
				{
					type: ['heavy'],
					key: 'heavy_slash_lightsmash_dmg',
					element: ['spectro', 'spectro_frazzle'],
					related_stat: 'atk',
					values: [4.2407],
					apply_effects: () => {}
				},
			],
		},
		'burst': {
			type: 'burst',
			key: 'between_dawn_and_dusk',
			apply_effects: () => {},
			motions: [
				{
					type: ['burst'],
					key: 'rekindle_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [3.1852],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 5) {
							combat_stats.skill_multiplier += 1.2;
						}
					}
				},
				{
					type: ['burst'],
					key: 'the_last_stand_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [1.9112, 10.8296],
					apply_effects: (input, combat_stats) => {
						if (input.character.sequence >= 3) {
							const { total_blaze_consumed } = input.character.buffs;
							combat_stats.skill_multiplier += Math.min(0.08 * total_blaze_consumed, 12);
						}
					}
				},
			],
		},
		'intro': {
			type: 'intro',
			key: 'immediate_execution',
			apply_effects: () => {},
			motions: [
				{
					type: ['intro'],
					key: 'skill_dmg',
					element: ['spectro'],
					related_stat: 'atk',
					values: [0.2424, 0.2424, 0.2424, 0.2424, 0.2424, 0.808],
					apply_effects: () => {}
				},
			],
		},
		'outro': {
			type: 'outro',
			key: 'beacon_for_the_future',
			apply_effects: () => {},
			motions: [
				{
					type: ['outro'],
					key: 'skill_dmg',
					element: ['spectro', 'spectro_frazzle'],
					related_stat: 'atk',
					values: [1.5],
					apply_effects: (input, combat_stats) => {
						const { heliacal_ember } = input.character.buffs;
						combat_stats.skill_multiplier += 0.1 * heliacal_ember;
					}
				},
			],
		},
	},
	image: { portrait },
}

export default data;