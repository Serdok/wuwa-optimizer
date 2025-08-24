import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'heavy',
		key: 'heavy_slash_daybreak_dmg',
		elements: ['spectro', 'spectro_frazzle'],
		specials: [],
		related_stat: 'atk',
		values: [1.9881]
	},
	{
		type: 'heavy',
		key: 'heavy_slash_dawning_dmg',
		elements: ['spectro', 'spectro_frazzle'],
		specials: [],
		related_stat: 'atk',
		values: [4.2407]
	},
	{
		type: 'heavy',
		key: 'heavy_slash_nightfall_dmg',
		elements: ['spectro', 'spectro_frazzle'],
		specials: [],
		related_stat: 'atk',
		values: [1.352, 2.6243]
	},
	{
		type: 'heavy',
		key: 'heavy_slash_lightsmash_dmg',
		elements: ['spectro', 'spectro_frazzle'],
		specials: [],
		related_stat: 'atk',
		values: [4.2407]
	}
] as const satisfies MotionDef[];

export { data as forte };
