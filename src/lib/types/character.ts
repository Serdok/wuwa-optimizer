import { Element } from '$lib/types/element';
import { BaseAttribute, type Attribute, type Stat } from '$lib/types/stat';
import { WeaponType } from '$lib/types/weapon';
import type { OptimizerInput } from '$lib/types/optimizer';

export const Quality = [4, 5] as const;
export type Quality = typeof Quality[number];

export const Sequence = [0, 1, 2, 3, 4, 5, 6] as const;
export type Sequence = typeof Sequence[number];

export enum AttackType {
	Basic = 'Basic Attack',
	Heavy = 'Heavy Attack',
	Skill = 'Resonance Skill',
	Liberation = 'Resonance Liberation',
	Intro = 'Intro Skill',
	Outro = 'Outro Skill',
}

export enum SkillType {
	Normal = 'Normal Attack',
	Skill = 'Resonance Skill',
	Forte = 'Forte Circuit',
	Liberation = 'Resonance Liberation',
	Intro = 'Intro Skill',
	Outro = 'Outro Skill',
}

export type AttackData = {
	type: AttackType,
	name: string,
	element: Element,
	attribute: BaseAttribute,
	values: number[],
	apply_effects: (input: OptimizerInput, stats: Record<Attribute, number>) => undefined
};

export type SkillData = {
	type: SkillType,
	name: string,
	motions: AttackData[],
	apply_effects: (input: OptimizerInput, stats: Record<Attribute, number>) => undefined
};

export type SwitchBuff = {
	kind: 'switch',
	name: string,
	sequence: Sequence,
	value: number,
};

export type SliderBuff = {
	kind: 'slider',
	name: string,
	sequence: Sequence,
	value: number,
	min_value: number,
	max_value: number,
};

export type Conditional = SwitchBuff | SliderBuff;

export type CharacterData = {
	name: string,
	quality: Quality,
	element: Element,
	weapon_type: WeaponType,
	base_stats: Record<BaseAttribute, Stat<BaseAttribute>>,
	conditionals: Record<string, Conditional>,
	apply_effects: (input: OptimizerInput, stats: Record<Attribute, number>) => undefined,
	skills: Record<SkillType, SkillData>,
	image: { portrait: string, },
};
