import type { ElementType } from '$lib/data/elements/types';
import type { BaseStatType, SpecialStatType, StatDef, StatSchema, StatType } from '$lib/data/stats/types';
import type { ApplyEffect, BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types';
import type { BaseElementType } from '$lib/data/elements/types';
import type { ExtractPropFromArray, Schema } from '$lib/utils';
import type { WeaponType } from '$lib/data/weapons/types';
import { CHARACTERS } from '$lib/data/characters/index';

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
};

export type MotionKeys<M extends readonly MotionDef[]> = ExtractPropFromArray<M, 'key'>;

export type SkillDef<M extends readonly MotionDef[], S extends BuffSchema<RankedBuffDef>> = {
	type: SkillType;
	key: string;
	motions: M;
	apply_effect: ApplyEffect<RankedBuffDef, S>;
	motions_effect: Record<MotionKeys<M>, ApplyEffect<RankedBuffDef, S>>
};

export type CharacterDef<BS extends BuffSchema<RankedBuffDef>> = {
	key: string;
	weapon_type: WeaponType;
	base_element: BaseElementType;
	base_stats: StatSchema<BaseStatType>;
	stat_bonus: StatDef<StatType>[];
	buffs: BS;
	skills: Schema<SkillDef<readonly MotionDef[], BS>, 'type'>;
	apply_effect: ApplyEffect<RankedBuffDef, BS>;
	create_ranked: (base: CharacterDef<BS>, rank: number) => CharacterDef<BS>;
	image: { portrait: string; };
};

export type CharacterInit = Omit<CharacterDef<never>, 'buffs' | 'skills' | 'apply_effect' | 'create_ranked'>;

export type Characters = typeof CHARACTERS;
export type CharacterKey = keyof Characters;
