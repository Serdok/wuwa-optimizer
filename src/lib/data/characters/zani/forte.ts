import type { MotionDef } from '$lib/data/characters/types';


const daybreak = {
	type: 'heavy',
	key: 'heavy_slash_daybreak_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [1.9881]
} as const satisfies MotionDef;

const daybreak_s6 = {
	type: 'heavy',
	key: 'heavy_slash_daybreak_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [2.78334]
} as const satisfies MotionDef;


const dawning = {
	type: 'heavy',
	key: 'heavy_slash_dawning_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [4.2407]
} as const satisfies MotionDef;

const dawning_s6 = {
	type: 'heavy',
	key: 'heavy_slash_dawning_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [5.93698]
} as const satisfies MotionDef;


const nightfall = {
	type: 'heavy',
	key: 'heavy_slash_nightfall_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [1.352, 2.6243]
} as const satisfies MotionDef;

const nightfall_s6 = {
	type: 'heavy',
	key: 'heavy_slash_nightfall_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [1.8928, 3.67402]
} as const satisfies MotionDef;


const lightsmash = {
	type: 'heavy',
	key: 'heavy_slash_lightsmash_dmg',
	elements: ['spectro', 'spectro_frazzle'],
	specials: [],
	related_stat: 'atk',
	values: [4.2407]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 6) return [daybreak_s6, dawning_s6, nightfall_s6, lightsmash];
	return [daybreak, dawning, nightfall, lightsmash];
}

export { data as forte };
