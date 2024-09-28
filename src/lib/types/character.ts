import type { Element } from '$lib/types/element';
import { AttackType, Attribute, SkillType, type Stat } from '$lib/types/stat';
import type { WeaponType } from '$lib/types/weapon';

export const CharacterQuality = [5, 4] as const;
export type CharacterQuality = typeof CharacterQuality[number];

export const CharacterResonanceChain = [0, 1, 2, 3, 4, 5, 6];
export type CharacterResonanceChain = typeof CharacterResonanceChain[number];

export type CharacterStat = { [attr in Attribute]?: number }

export const CharacterLevel = [
	{ key: '1/20', ascension: 0, level: 1, },
	{ key: '20/20', ascension: 0, level: 20, },
	{ key: '20/40', ascension: 1, level: 20, },
	{ key: '40/40', ascension: 1, level: 40, },
	{ key: '40/50', ascension: 2, level: 40, },
	{ key: '50/50', ascension: 2, level: 50, },
	{ key: '50/60', ascension: 3, level: 50, },
	{ key: '60/60', ascension: 3, level: 60, },
	{ key: '60/70', ascension: 4, level: 60, },
	{ key: '70/70', ascension: 4, level: 70, },
	{ key: '70/80', ascension: 5, level: 70, },
	{ key: '80/80', ascension: 5, level: 80, },
	{ key: '80/90', ascension: 6, level: 80, },
	{ key: '90/90', ascension: 6, level: 90, },
] as const;
export type CharacterLevel = typeof CharacterLevel[number]['key'];

export const FinalCharacterStat = {
	[Attribute.HP]: 0,
	[Attribute.ATK]: 0,
	[Attribute.DEF]: 0,
	[Attribute.CritRate]: 0,
	[Attribute.CritDamage]: 0,
	[Attribute.EnergyRegen]: 0,
	[Attribute.HealingBonus]: 0,

	[Attribute.GlacioBonus]: 0,
	[Attribute.FusionBonus]: 0,
	[Attribute.ElectroBonus]: 0,
	[Attribute.AeroBonus]: 0,
	[Attribute.SpectroBonus]: 0,
	[Attribute.HavocBonus]: 0,

	[Attribute.BasicAttackBonus]: 0,
	[Attribute.HeavyAttackBonus]: 0,
	[Attribute.ResonanceSkillBonus]: 0,
	[Attribute.ResonanceLiberationBonus]: 0,
	[Attribute.IntroBonus]: 0,
	[Attribute.OutroBonus]: 0,

	[Attribute.GlacioAmplify]: 0,
	[Attribute.FusionAmplify]: 0,
	[Attribute.ElectroAmplify]: 0,
	[Attribute.AeroAmplify]: 0,
	[Attribute.SpectroAmplify]: 0,
	[Attribute.HavocAmplify]: 0,

	[Attribute.BasicAttackAmplify]: 0,
	[Attribute.HeavyAttackAmplify]: 0,
	[Attribute.ResonanceSkillAmplify]: 0,
	[Attribute.ResonanceLiberationAmplify]: 0,
	[Attribute.IntroAmplify]: 0,
	[Attribute.OutroAmplify]: 0,

	[Attribute.BasicAttackDEFIgnore]: 0,
	[Attribute.HeavyAttackDEFIgnore]: 0,
	[Attribute.ResonanceSkillDEFIgnore]: 0,
	[Attribute.ResonanceLiberationDEFIgnore]: 0,
	[Attribute.IntroDEFIgnore]: 0,
	[Attribute.OutroDEFIgnore]: 0,
} as const;
export type FinalCharacterStat = { [attr in keyof typeof FinalCharacterStat]: number };

export type CharacterMotion = {
	name: string,
	element: Element,
	attribute: Attribute.HP | Attribute.ATK | Attribute.DEF,
	type: AttackType,
	values: number[],
	conditionals: CharacterConditional[]
}

export type CharacterSkill = {
	name: string,
	motions: CharacterMotion[],
};

export type OptimizedMotion = {
	name: string,
	element: Element,
	attribute: Attribute.HP | Attribute.ATK | Attribute.DEF,
	type: AttackType,
	values: number[],
	hits: { non_crit: number, average: number, crit: number }[],
}

export type OptimizedSkill = {
	name: string
	motions: OptimizedMotion[]
}

export type CharacterStackMetadata = {
	name: string,
	default_value: number,
	max_stacks?: number,
};

export type CharacterStack = {
	name: string,
	default_value: number,
	value: number,
	max_stacks?: number,
};

export type CharacterConditional = {
	name: string,
	condition: (character: Character) => boolean,
	pre_compute: (character: Character, stats: CharacterStat) => CharacterStat,
}

export type CharacterMetadata = {
	game_id: number,
	name: string,
	quality: CharacterQuality,
	element: Element,
	weapon_type: WeaponType,
	base_stats: { [Attribute.HP]: { attribute: Attribute.HP, value: number }, [Attribute.ATK]: { attribute: Attribute.ATK, value: number }, [Attribute.DEF]: { attribute: Attribute.DEF, value: number }, },
	stat_bonuses: Stat[],
	skills: { [type in SkillType]: CharacterSkill },
	stacks: { [key in string]: CharacterStackMetadata },
	// conditionals: CharacterConditional[],
	image: {
		circle: string,
		head: string,
		portrait: string,
	},
};

export type Character = {
	game_id: number,
	name: string,
	quality: CharacterQuality,
	element: Element,
	weapon_type: WeaponType,
	resonance_chain: CharacterResonanceChain,
	base_stats: { [Attribute.HP]: { attribute: Attribute.HP, value: number }, [Attribute.ATK]: { attribute: Attribute.ATK, value: number }, [Attribute.DEF]: { attribute: Attribute.DEF, value: number }, },
	stat_bonuses: (Stat & { enabled: boolean })[],
	skills: { [type in SkillType]: CharacterSkill },
	stacks: { [key in string]: (CharacterStackMetadata & { value: number, }) },
	// conditionals: CharacterConditional[],
	image: {
		circle: string,
		head: string,
		portrait: string,
	},
};

