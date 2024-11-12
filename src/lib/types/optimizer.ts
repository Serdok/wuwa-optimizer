import { type Echo, Sonata } from '$lib/types/echo';
import { type Sequence, type CharacterData, AttackType, SkillType } from '$lib/types/character';
import { type Rank, type WeaponData } from '$lib/types/weapon';
import { Element } from '$lib/types/element';
import { type Attribute, BaseAttribute } from '$lib/types/stat';

export type SonataFilter = {
	allow_2p: Sonata[],
	allow_5p: Sonata[],
};

export type OptimizerInput = {
	character: {
		name: CharacterData['name'],
		sequence: Sequence,
		conditionals: Record<string, number>,
	},
	weapon: {
		name: WeaponData['name'],
		rank: Rank,
		conditionals: Record<string, number>,
	},
	selected_sonatas: SonataFilter,
};

export type AttackData = {
	type: AttackType,
	name: string,
	element: Element,
	attribute: BaseAttribute,
	non_crit: number[],
	average: number[],
	crit: number[]
};

export type SkillData = {
	type: SkillType,
	name: string,
	motions: AttackData[],
};

export type OptimizerOutput = {
	build: Echo[],
	skills: Record<SkillType, SkillData>,
	stats: Record<Attribute, number>,
	display_stats: { [a in Attribute]?: number },
}