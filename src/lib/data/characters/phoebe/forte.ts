import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'heavy',
		key: 'absolution_litany_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [6.3819]
	},
	{
		type: 'skill',
		key: 'utter_confession_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [1.8788]
	},
	{
		type: 'heavy',
		key: 'heavy_attack_starflash_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.8269, 0.8269, 0.8269]
	}
] as const satisfies MotionDef[];

export { data as forte };
