import portrait from './T_IconRole_Pile_katixiya_UI.png';
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'cartethyia',
	element: 'aero',
	weapon_type: 'sword',
	base_stats: {
		'hp': { stat: 'hp', value: 1184, },
		'atk': { stat: 'atk', value: 25, },
		'def': { stat: 'def', value: 50, },
	},
	stat_bonuses: [
		{ stat: 'hp_p', value: 0.018 },
		{ stat: 'hp_p', value: 0.042 },
		{ stat: 'crit_rate', value: 0.012 },
		{ stat: 'crit_rate', value: 0.028 },
		{ stat: 'hp_p', value: 0.018 },
		{ stat: 'hp_p', value: 0.042 },
		{ stat: 'crit_rate', value: 0.012 },
		{ stat: 'crit_rate', value: 0.028 },
	],
	buffs: {
		manifest: {
			key: 'manifest',
			kind: 'switch',
			sequence: 0,
		},
		mandate_of_divinity: {
			key: 'mandate_of_divinity',
			kind: 'switch',
			sequence: 0,
		},
		aero_erosion: {
			key: 'aero_erosion',
			kind: 'slider',
			sequence: 0,
			min_value: 0,
			max_value: 6,
		},
		conviction: {
			key: 'conviction',
			kind: 'slider',
			sequence: 1,
			min_value: 0,
			max_value: 4,
		},
		debuff_effect: {
			key: 'debuff_effect',
			kind: 'switch',
			sequence: 4,
		},
	},
	apply_effects: (request, combat_stats) => {
		const { manifest, mandate_of_divinity } = request.character.buffs;
		if (manifest && mandate_of_divinity) {
			combat_stats.aero_erosion_amplify += 0.5;
		}

		const { aero_erosion } = request.character.buffs;
		if (aero_erosion > 0) {
			combat_stats.enemy_damage_vulnerability += 0.3;
		}
		if (aero_erosion >= 3) {
			combat_stats.enemy_damage_vulnerability += 0.1 * Math.min(aero_erosion - 3, 3);
		}

		const { conviction } = request.character.buffs;
		if (manifest) {
			combat_stats.crit_dmg += 0.25 * Math.min(conviction, 4);
		}

		const { debuff_effect } = request.character.buffs;
		if (debuff_effect) {
			combat_stats.general_bonus += 0.2;
		}

		if (request.character.sequence >= 6) {
			combat_stats.enemy_damage_vulnerability += 0.4;
		}
	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'sword_to_carve_my_forms',
			apply_effects: () => {},
			motions: [
				{
					key: 'stage_1_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.0478]
				},
				{
					key: 'stage_2_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.0394, 0.0394, 0.0525]
				},
				{
					key: 'stage_3_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.0428, 0.0428, 0.0428, 0.0428]
				},
				{
					key: 'stage_4_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.0252, 0.0252, 0.0252, 0.0754]
				},
				{
					key: 'dodge_counter_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.0685, 0.0685, 0.0685, 0.0685]
				},
				{
					key: 'heavy_attack_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.0208, 0.0208, 0.0208, 0.0624]
				},
				{
					key: 'mid_air_attack',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 2;
						}
					},
					values: [0.0565]
				},
				{
					key: 'mid_air_attack_1_sword_shadow_recalled',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 2;
						}
					},
					values: [0.0565]
				},
				{
					key: 'mid_air_attack_2_sword_shadow_recalled',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 2;
						}
					},
					values: [0.033, 0.033, 0.033]
				},
				{
					key: 'mid_air_attack_3_sword_shadow_recalled',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 2;
						}
					},
					values: [0.1129, 0.1129, 0.1129]
				}
			]
		},
		'skill': {
			type: 'skill',
			key: 'sword_to_bear_their_names',
			apply_effects: () => {},
			motions: [
				{
					key: 'skill_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0689, 0.0689, 0.0689, 0.0886]
				}
			]
		},
		'forte': {
			type: 'forte',
			key: 'tempest',
			apply_effects: () => {},
			motions: [
				{
					key: 'basic_attack_stage_1_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0649]
				},
				{
					key: 'basic_attack_stage_2_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0363, 0.0182, 0.0182, 0.0182]
				},
				{
					key: 'basic_attack_stage_3_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0213, 0.0213, 0.0213, 0.0426]
				},
				{
					key: 'basic_attack_stage_4_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0274, 0.0274, 0.0274, 0.0274, 0.0274]
				},
				{
					key: 'basic_attack_stage_5_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.072, 0.288]
				},
				{
					key: 'dodge_counter_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.032, 0.032, 0.032, 0.0639]
				},
				{
					key: 'upward_cut_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0454, 0.0454]
				},
				{
					key: 'heavy_attack_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0428, 0.0997]
				},
				{
					key: 'enhanced_heavy_attack_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0778, 0.0778, 0.0389]
				},
				{
					key: 'mid_air_attack_1_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0299, 0.0299, 0.0308]
				},
				{
					key: 'mid_air_attack_2_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0739, 0.0739, 0.1477]
				},
				{
					key: 'mid_air_attack_3_dmg',
					type: ['basic'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.022]
				},
				{
					key: 'sword_to_answer_waves_call_dmg',
					type: ['skill'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0186, 0.0186, 0.0186, 0.0186, 0.1736]
				},
				{
					key: 'may_tempest_break_the_tides_dmg',
					type: ['skill'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0186, 0.0186, 0.0703, 0.0703, 0.0703]
				}
			]
		},
		'burst': {
			type: 'burst',
			key: 'a_knights_heartfelt_prayers',
			apply_effects: () => {},
			motions: [
				{
					key: 'blade_of_howling_squall_dmg',
					type: ['burst'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: (request, combat_stats) => {
						const { aero_erosion } = request.character.buffs;
						// fixme: is it enemy damage amplify?
						combat_stats.general_amplify += 0.2 * Math.min(5, aero_erosion);

						if (request.character.sequence >= 3) {
							combat_stats.skill_multiplier += 1;
						}
					},
					values: [0.1312, 0.1312, 0.1312, 0.1312, 0.1312, 0.1312, 0.1312]
				}
			]
		},
		'intro': {
			type: 'intro',
			key: 'sword_to_mark_tides_trace',
			apply_effects: () => {},
			motions: [
				{
					key: 'sword_to_mark_tides_trace_dmg',
					type: ['intro'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0208, 0.0208, 0.0208, 0.0624]
				},
				{
					key: 'sword_to_call_for_freedom_dmg',
					type: ['intro'],
					element: ['aero'],
					tags: [],
					related_stat: 'hp',
					apply_effects: () => {},
					values: [0.0428, 0.0997]
				}
			],
		},
		'outro': {
			type: 'outro',
			key: 'winds_divine_blessing',
			apply_effects: () => {},
			motions: [],
		},
	},
	image: { portrait },
	defaults: {
		character: {
			buffs: {
				manifest: 1,
				mandate_of_divinity: 1,
				aero_erosion: 6,
			}
		},
		weapon: {
			key: 'defiers_thorn',
			rank: 1,
			buffs: {
				a_free_knights_tarantella: 2,
			}
		},
		echo: {
			filter: {
				allowed_primary_stats: {
					4: ['crit_rate', 'crit_dmg'],
					3: ['aero_bonus', 'hp_p'],
					1: ['hp_p']
				},
				activated_effects: {
					sierra_gale: [2, 5],
					gusts_of_welkin: [2, 5],
					windward_pilgrimage: [2, 5],
				}
			},
		},
		target_key: { kind: 'motion', skill: 'a_knights_heartfelt_prayers', motion: 'blade_of_howling_squall_dmg' }
	},
} as const;

export default data;