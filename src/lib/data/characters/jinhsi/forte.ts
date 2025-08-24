import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'incarnation_basic_attack_1_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.8862]
	},
	{
		type: 'skill',
		key: 'incarnation_basic_attack_2_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.7797, 0.2599, 0.2599]
	},
	{
		type: 'skill',
		key: 'incarnation_basic_attack_3_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.9944, 0.663]
	},
	{
		type: 'skill',
		key: 'incarnation_basic_attack_4_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1867, 0.1867, 0.1867, 0.1867, 0.1867, 0.1867, 0.7467]
	},
	{
		type: 'skill',
		key: 'incarnation_heavy_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4772, 1.1134]
	},
	{
		type: 'skill',
		key: 'incarnation_dodge_counter_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4389, 0.3292, 0.3292, 1.0971]
	},
	{
		type: 'skill',
		key: 'crescent_divinity_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [1.0076, 0.7557, 0.7557, 2.519]
	},
	{
		type: 'skill',
		key: 'illuminous_epiphany_solar_flare_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1989, 0.1989, 0.1989, 0.1989, 0.1989, 0.1989]
	},
	{
		type: 'skill',
		key: 'illuminous_epiphany_stella_glamor_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [3.4792]
	}
] as const satisfies MotionDef[];

export { data as forte };
