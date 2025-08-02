import portrait from './T_IconRole_Pile_kelaita_UI.png'
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'carlotta',
	element: 'glacio',
	weapon_type: 'pistol',
	base_stats: {
		'hp': { stat: 'hp', value: 996, },
		'atk': { stat: 'atk', value: 37, },
		'def': { stat: 'def', value: 98, },
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
		'final_bow': {
			key: 'final_bow',
			kind: 'switch',
			sequence: 0,
		},
		'deconstruction': {
			key: 'deconstruction',
			kind: 'switch',
			sequence: 0,
		},
		'yesterday_s_raindrops_make_finest_wine': {
			key: 'yesterday_s_raindrops_make_the_finest_wine',
			kind: 'switch',
			sequence: 4,
		},
	},
	apply_effects: (request, combat_stats, context) => {
		combat_stats.enemy_def_ignore += 0.18 * (request.character.buffs['deconstruction'] ?? 0);

		if (request.character.sequence >= 1) {
			combat_stats.crit_rate += 0.125 * (request.character.buffs['deconstruction'] ?? 0);
		}

		if (request.character.sequence >= 3) {
			context.character.skills.outro.motions.push({
				type: ['outro'],
				key: 'kaleidoscope_sparks',
				element: ['glacio'],
				tags: [],
				related_stat: 'atk',
				values: [10.3218],
				apply_effects: () => {}
			})
		}

		if (request.character.sequence >= 4) {
			combat_stats.skill_bonus += 0.25 * (request.character.buffs['yesterday_s_raindrops_make_the_finest_wine'] ?? 0);
		}
 	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'silent_execution',
			apply_effects: () => {},
			motions: [
				{
					type: ['basic'],
					key: 'basic_attack_stage_1',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.5408],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'basic_attack_stage_2',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.3955, 0.3955, 0.5273],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'necessary_measures_stage_1_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.6591],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'necessary_measures_stage_2_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.6008, 0.7343],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'necessary_measures_stage_3_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.3993, 0.2333, 0.2333, 0.2333, 0.2333],
					apply_effects: () => {},
				},
				{
					type: ['heavy'],
					key: 'heavy_attack_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.2282, 0.2282, 0.2282, 0.2282, 0.6084],
					apply_effects: () => {},
				},
				{
					type: ['heavy'],
					key: 'containment_tactics_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.3423, 0.3423, 0.3423, 0.3423, 0.9126],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'mid_air_attack_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.0478],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'customary_greetings_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.0799, 1.3199],
					apply_effects: () => {},
				},
				{
					type: ['basic'],
					key: 'dodge_counter',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.0377, 1.3755],
					apply_effects: () => {},
				},
			],
		},
		'skill': {
			type: 'skill',
			key: 'art_of_violence',
			apply_effects: (request, combat_stats) => {
				if (request.character.sequence >= 3) {
					combat_stats.skill_multiplier += 0.93;
				}
			},
			motions: [
				{
					type: ['skill'],
					key: 'skill_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.4411, 1.4411],
					apply_effects: () => {},
				},
				{
					type: ['skill'],
					key: 'chromatic_splendor_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.1273, 1.1273, 3.3818],
					apply_effects: () => {},
				},
			],
		},
		'forte': {
			type: 'forte',
			key: 'lethal_repertoire',
			apply_effects: () => {},
			motions: [
				{
					type: ['skill'],
					key: 'imminent_oblivion',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [0.6683, 0.6683, 0.6683, 0.6683, 0.6683, 5.0121],
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 5) {
							combat_stats.skill_multiplier += 0.47;
						}
					},
				}
			],
		},
		'burst': {
			type: 'burst',
			key: 'era_of_new_wave',
			apply_effects: (request, combat_stats) => {
				combat_stats.skill_multiplier += 0.8 * (request.character.buffs['final_bow'] ?? 0);
			},
			motions: [
				{
					type: ['skill'],
					key: 'skill_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [4.0271],
					apply_effects: () => {},
				},
				{
					type: ['skill'],
					key: 'death_knell_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.8364, 0.145, 0.145, 0.145, 0.145],
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 6) {
							combat_stats.skill_multiplier += 1.866;
						}
					},
				},
				{
					type: ['skill'],
					key: 'fatal_finale_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [6.4433],
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 1.26;
						}
					},
				}
			],
		},
		'intro': {
			type: 'intro',
			key: 'wintertime_aria',
			apply_effects: () => {},
			motions: [
				{
					type: ['intro'],
					key: 'skill_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [1.7893, 0.5965, 0.5965],
					apply_effects: () => {},
				}
			],
		},
		'outro': {
			type: 'outro',
			key: 'closing_remark',
			apply_effects: () => {},
			motions: [
				{
					type: ['outro'],
					key: 'skill_dmg',
					element: ['glacio'],
					tags: [],
					related_stat: 'atk',
					values: [7.942],
					apply_effects: () => {}
				}
			],
		},
	},
	image: { portrait },
	defaults: {
		character: {
			buffs: {
				final_bow: 1,
				deconstruction: 1,
			},
		},
		weapon: {
			key: 'the_last_dance',
			rank: 1,
			buffs: {
				silent_eulogy: 1,
			},
		},
		echo: {
			filter: {
				allowed_primary_stats: {
					4: ['crit_dmg', 'crit_rate'],
					3: ['glacio_bonus', 'atk_p'],
					1: ['atk_p']
				},
				activated_effects: {
					freezing_frost: [2, 5],
					frosty_resolve: [2, 5],
				}
			},
			buffs: {
				freezing_frost: { basic_released: 3 },
				frosty_resolve: { skill_released: 2, burst_released: 2 },
			},
		},
		target_key: { kind: 'motion', skill: 'era_of_new_wave', motion: 'fatal_finale_dmg' }
	},
} as const;

export default data;