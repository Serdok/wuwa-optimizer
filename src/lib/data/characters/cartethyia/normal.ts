import type { MotionDef } from '$lib/data/characters/types';

const stage_1 = {
	key: 'stage_1_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0478]
} as const satisfies MotionDef;

const stage_1_s2 = {
	key: 'stage_1_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0717]
} as const satisfies MotionDef;


const stage_2 = {
	key: 'stage_2_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0394, 0.0394, 0.0525]
} as const satisfies MotionDef;

const stage_2_s2 = {
	key: 'stage_2_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0591, 0.0591, 0.07875]
} as const satisfies MotionDef;


const stage_3 = {
	key: 'stage_3_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0428, 0.0428, 0.0428, 0.0428]
} as const satisfies MotionDef;

const stage_3_s2 = {
	key: 'stage_3_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0642, 0.0642, 0.0642, 0.0642]
} as const satisfies MotionDef;


const stage_4 = {
	key: 'stage_4_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0252, 0.0252, 0.0252, 0.0754]
} as const satisfies MotionDef;

const stage_4_s2 = {
	key: 'stage_4_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0378, 0.0378, 0.0378, 0.1131]
} as const satisfies MotionDef;


const dodge_counter = {
	key: 'dodge_counter_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0685, 0.0685, 0.0685, 0.0685]
} as const satisfies MotionDef;

const dodge_counter_s2 = {
	key: 'dodge_counter_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.10275, 0.10275, 0.10275, 0.10275]
} as const satisfies MotionDef;


const heavy_attack = {
	key: 'heavy_attack_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0208, 0.0208, 0.0208, 0.0624]
} as const satisfies MotionDef;

const heavy_attack_s2 = {
	key: 'heavy_attack_dmg',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0312, 0.0312, 0.0312, 0.0936]
} as const satisfies MotionDef;


const mid_air = {
	key: 'mid_air_attack',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0565]
} as const satisfies MotionDef;

const mid_air_s2 = {
	key: 'mid_air_attack',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.1695]
} as const satisfies MotionDef;


const mid_air_1_sword = {
	key: 'mid_air_attack_1_sword_shadow_recalled',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.0565]
} as const satisfies MotionDef;

const mid_air_1_sword_s2 = {
	key: 'mid_air_attack_1_sword_shadow_recalled',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.1695]
} as const satisfies MotionDef;


const mid_air_2_sword = {
	key: 'mid_air_attack_2_sword_shadow_recalled',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.033, 0.033, 0.033]
} as const satisfies MotionDef;

const mid_air_2_sword_s2 = {
	key: 'mid_air_attack_2_sword_shadow_recalled',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.099, 0.099, 0.099]
} as const satisfies MotionDef;


const mid_air_3_sword = {
	key: 'mid_air_attack_3_sword_shadow_recalled',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.1129, 0.1129, 0.1129]
} as const satisfies MotionDef;

const mid_air_3_sword_s2 = {
	key: 'mid_air_attack_3_sword_shadow_recalled',
	type: 'basic',
	elements: ['aero'],
	specials: [],
	related_stat: 'hp',
	values: [0.3387, 0.3387, 0.3387]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 2) return [stage_1_s2, stage_2_s2, stage_3_s2, stage_4_s2, dodge_counter_s2, heavy_attack_s2, mid_air_s2, mid_air_1_sword_s2, mid_air_2_sword_s2, mid_air_3_sword_s2];
	return [stage_1, stage_2, stage_3, stage_4, dodge_counter, heavy_attack, mid_air, mid_air_1_sword, mid_air_2_sword, mid_air_3_sword];
}

export { data as normal };
