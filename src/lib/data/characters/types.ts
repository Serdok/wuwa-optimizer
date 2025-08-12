import type { ElementType } from '$lib/data/elements/types';
import type { BaseStatType, SpecialStatType, StatDef, StatSchema, StatType } from '$lib/data/stats/types';
import type { ApplyEffect, BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types';
import type { BaseElementType } from '$lib/data/elements/types';
import type { Schema } from '$lib/utils';
import type { WeaponType } from '$lib/data/weapons/types';

export const SKILLS = ['normal', 'skill', 'forte', 'burst', 'intro', 'outro'] as const;
export type SkillType = typeof SKILLS[number];

export const MOTIONS = ['basic', 'heavy', 'skill', 'burst', 'intro', 'outro'] as const;
export type MotionType = typeof MOTIONS[number];

export type MotionDef = {
	key: string;
	related_stat: BaseStatType;
	type: MotionType;
	elements: ElementType[];
	specials: SpecialStatType[];
	values: number[];
	apply_effect: ApplyEffect<RankedBuffDef, BuffSchema<RankedBuffDef>>;
};

export type SkillDef = {
	key: string;
	type: SkillType;
	motions: MotionDef[];
	apply_effect: ApplyEffect<RankedBuffDef, BuffSchema<RankedBuffDef>>;
};

export type CharacterDef = {
	key: string;
	weapon_type: WeaponType;
	base_element: BaseElementType;
	base_stats: StatSchema<StatType>;
	stat_bonus: StatDef<StatType>[];
	buffs: BuffSchema<RankedBuffDef>;
	skills: Schema<SkillDef, 'type'>;
	apply_effect: ApplyEffect<RankedBuffDef, BuffSchema<RankedBuffDef>>;
	image: { portrait: string; };
};
