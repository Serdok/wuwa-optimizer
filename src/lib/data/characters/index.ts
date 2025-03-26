import type { ElementKey } from '$lib/data/elements';
import type { WeaponKey } from '$lib/data/weapons';
import type { BaseStatKey, StatKey, StatValue, StatValueMap } from '$lib/data/stats';
import type { Buff, GameplayEffect } from '$lib/optimizer';

import changli from './changli';
import jinhsi from './jinhsi';

export const SKILLS = ['normal', 'skill', 'forte', 'burst', 'intro', 'outro'] as const;
export type SkillKey = typeof SKILLS[number];

export const ATTACKS = ['basic', 'heavy', 'skill', 'burst', 'intro', 'outro'] as const;
export type AttackKey = typeof ATTACKS[number];

export type MotionData = GameplayEffect & {
	type: AttackKey,
	key: string,
	element: ElementKey,
	related_stat: BaseStatKey,
	values: number[],
};

export type SkillData = GameplayEffect & {
	type: SkillKey,
	key: string,
	motions: MotionData[],
};

export type CharacterBuff = Buff & {
	sequence: number,
}

export type CharacterData = GameplayEffect & {
	key: string,
	element: ElementKey,
	weapon_type: WeaponKey,
	base_stats: StatValueMap<BaseStatKey>,
	stat_bonuses: StatValue[],
	buffs: { [key: string]: CharacterBuff, },
	skills: Record<SkillKey, SkillData>,
	image: { portrait: string, },
};

export const CHARACTERS: Record<string, CharacterData> = {
	changli,
	jinhsi,
} as const;