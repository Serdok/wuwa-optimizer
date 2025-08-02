import type { RecursivePartial } from '$lib/utils';
import type { ElementKey } from '$lib/data/elements';
import type { WeaponKey } from '$lib/data/weapons';
import type { BaseStatKey, StatValue, StatValueMap, TagStatKey } from '$lib/data/stats';
import type { Buff, GameplayEffect, OptimizerRequest } from '$lib/data/optimizer';

import changli from './changli';
import jinhsi from './jinhsi';
import carlotta from './carlotta';
import phoebe from './phoebe';
import zani from './zani';
import cantarella from './cantarella';
import cartethyia from './cartethyia';

export const SKILLS = ['normal', 'skill', 'forte', 'burst', 'intro', 'outro'] as const;
export type SkillKey = typeof SKILLS[number];

export const ATTACKS = ['basic', 'heavy', 'skill', 'burst', 'intro', 'outro'] as const;
export type AttackKey = typeof ATTACKS[number];

export type MotionData = GameplayEffect & {
	type: AttackKey[],
	key: string,
	element: ElementKey[],
	tags: TagStatKey[],
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
	defaults?: Partial<OptimizerRequest>,
};

export const CHARACTERS: Record<string, CharacterData> = {
	changli,
	jinhsi,
	carlotta,
	phoebe,
	zani,
	cantarella,
	cartethyia,
} as const;