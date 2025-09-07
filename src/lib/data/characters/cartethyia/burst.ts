import type { MotionDef } from '$lib/data/characters/types';

const blade_of_howling_squall = {
	key: 'blade_of_howling_squall_dmg',
	type: 'burst',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.1312, 0.1312, 0.1312, 0.1312, 0.1312, 0.1312, 0.1312]
} as const satisfies MotionDef;

const blade_of_howling_squall_s3 = {
	key: 'blade_of_howling_squall_dmg',
	type: 'burst',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.2624, 0.2624, 0.2624, 0.2624, 0.2624, 0.2624, 0.2624]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 3) return [blade_of_howling_squall_s3];
	return [blade_of_howling_squall];
}

export { data as burst };
