import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.6263, 0.6263]
	},
	{
		type: 'basic',
		key: 'ring_of_mirrors_refracted_holy_light_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1492, 0.1492]
	},
	{
		type: 'basic',
		key: 'chamuel_s_star_stage_1_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.5935]
	},
	{
		type: 'basic',
		key: 'chamuel_s_star_stage_2_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.3977, 0.3977]
	},
	{
		type: 'basic',
		key: 'chamuel_s_star_stage_3_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.2893, 0.2893, 0.2893, 0.2893, 0.2893, 0.2893]
	}
] as const satisfies MotionDef[];

export { data as skill };
