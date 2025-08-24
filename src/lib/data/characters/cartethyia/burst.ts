import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'blade_of_howling_squall_dmg',
		type: 'burst',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.1312, 0.1312, 0.1312, 0.1312, 0.1312, 0.1312, 0.1312]
	}
] as const satisfies MotionDef[];

export { data as burst };
