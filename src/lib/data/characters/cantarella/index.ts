import portrait from './T_IconRole_Pile_kanteleila_UI.png';
import type { CharacterData } from '$lib/data/characters';

const data: CharacterData = {
	key: 'cantarella',
	element: 'havoc',
	weapon_type: 'rectifier',
	base_stats: {
		'hp': { stat: 'hp', value: 0, },
		'atk': { stat: 'atk', value: 0, },
		'def': { stat: 'def', value: 0, },
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
		'poison': {
			key: 'poison',
			kind: 'slider',
			sequence: 0,
			value: 2,
			min_value: 0,
			max_value: 2,
		},
		'flowing_suffocation': {
			key: 'flowing_suffocation',
			kind: 'switch',
			sequence: 6,
			value: 1,
		}
	},
	apply_effects: (request, combat_stats) => {
		const { poison = 0, flowing_suffocation } = request.character.buffs;

		combat_stats.havoc_bonus += 0.06 * poison;

		if (flowing_suffocation) {
			combat_stats.enemy_def_ignore += 0.3;
		}
	},
	skills: {
		'normal': {
			type: 'normal',
			key: 'illusion_collapse',
			apply_effects: () => {},
			motions: [
				{
					key: 'stage_1_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.7953],
				},
				{
					key: 'stage_2_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.3644, 0.3644, 0.3644, 0.3644],
				},
				{
					key: 'stage_3_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.7257, 0.7257],
				},
				{
					key: 'heavy_attack_dmg',
					type: ['heavy'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.5718, 0.5718],
				},
				{
					key: 'delusive_dive',
					type: ['heavy'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.5302, 0.5302],
				},
				{
					key: 'mid_air_attack_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.4199, 0.6299],
				},
				{
					key: 'dodge_counter_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.5301, 0.5301, 0.5301, 0.5301],
				}
			]
		},
		'skill': {
			type: 'skill',
			key: 'dance_with_shadows',
			apply_effects: () => {},
			motions: [
				{
					key: 'graceful_step_dmg',
					type: ['skill'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 1) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [0.736, 0.736],
				},
				{
					key: 'flickering_reverie_dmg',
					type: ['skill'],
					element: ['havoc'],
					tags: ['echo_skill'],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 1) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [1.9623],
				},
				{
					key: 'jolt_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: ['coordinated_attack'],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 2) {
							combat_stats.skill_multiplier += 2.45;
						}
					},
					values: [1.9881],
				}
			]
		},
		'forte': {
			type: 'forte',
			key: 'between_illusion_and_reality',
			apply_effects: () => {},
			motions: [
				{
					key: 'phantom_sting_stage_1_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 6) {
							combat_stats.skill_multiplier += 0.8;
						}
					},
					values: [0.3533, 0.3533, 0.3533],
				},
				{
					key: 'phantom_sting_stage_2_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 6) {
							combat_stats.skill_multiplier += 0.8;
						}
					},
					values: [0.6293, 0.6293],
				},
				{
					key: 'phantom_sting_stage_3_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 6) {
							combat_stats.skill_multiplier += 0.8;
						}
					},
					values: [0.6462, 0.6462, 0.6462, 0.6462],
				},
				{
					key: 'abysmal_vortex_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.4199, 0.6299],
				},
				{
					key: 'perception_drain_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: ['echo_skill'],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 1) {
							combat_stats.skill_multiplier += 0.5;
						}
					},
					values: [6.6799, 6.6799],
				},
				{
					key: 'shadowy_sweep_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.7509, 0.7509, 0.7509],
				}
			]
		},
		'burst': {
			type: 'burst',
			key: 'beneath_the_sea',
			apply_effects: () => {},
			motions: [
				{
					key: 'flowing_suffocation_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: ['echo_skill'],
					related_stat: 'atk',
					apply_effects: (request, combat_stats) => {
						if (request.character.sequence >= 3) {
							combat_stats.skill_multiplier += 3.7;
						}
					},
					values: [3.76]
				},
				{
					key: 'diffusion_dmg',
					type: ['basic'],
					element: ['havoc'],
					tags: ['coordinated_attack'],
					related_stat: 'atk',
					apply_effects: (request, combat_stats, context) => {
						if (request.character.sequence >= 5) {
							const diffusion = context.character.skills.burst.motions.find(m => m.key === 'diffusion_dmg')!;
							diffusion.values = Array(26).fill(0.1454)
						}
					},
					values: Array(21).fill(0.1454)
				}
			]
		},
		'intro': {
			type: 'intro',
			key: 'cruise',
			apply_effects: () => {},
			motions: [
				{
					key: 'ripple_dmg',
					type: ['intro'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.4225, 0.4225, 0.4225, 0.4225]
				},
				{
					key: 'tidal_surge_dmg',
					type: ['intro'],
					element: ['havoc'],
					tags: ['coordinated_attack'],
					related_stat: 'atk',
					apply_effects: () => {},
					values: [0.169, 0.169, 0.169, 1.183]
				}
			]
		},
		'outro': {
			type: 'outro',
			key: 'gentle_tentacles',
			apply_effects: () => {},
			motions: [],
		},
	},
	image: { portrait },
} as const;

export default data;