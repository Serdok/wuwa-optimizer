import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'skill_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [4.0271]
	},
	{
		type: 'skill',
		key: 'death_knell_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.8364, 0.145, 0.145, 0.145, 0.145]
	},
	{
		type: 'skill',
		key: 'fatal_finale_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [6.4433]
	}
] as const satisfies MotionDef[];

export { data as burst };
