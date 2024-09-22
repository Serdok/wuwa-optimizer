import type { Element } from '$lib/types/element';
import { AttackType, Attribute, SkillType } from '$lib/types/stat';
import type { WeaponType } from '$lib/types/weapon';
import type { UUID } from '$lib/types/common';

export const CharacterQuality = [5, 4] as const;
export type CharacterQuality = typeof CharacterQuality[number];

export const CharacterResonanceChain = [0, 1, 2, 3, 4, 5, 6];
export type CharacterResonanceChain = typeof CharacterResonanceChain[number];

export type CharacterStat = { [attr in Attribute]?: number; }

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
} as const;
export type FinalCharacterStat = { [attr in keyof typeof FinalCharacterStat]: number };

export type CharacterAttack = {
	name: string;
	element: Element;
	attribute: Attribute;
	type: AttackType;
	values: number[];
}

export type CharacterSkill = { [type in SkillType]: CharacterAttack[] };

export type CharacterMetadata = {
	name: string;
	quality: CharacterQuality;
	element: Element;
	weapon_type: WeaponType;
	base_stats: FinalCharacterStat;
	stat_bonus: CharacterStat,
	skills: CharacterSkill;
	icon: {
		head: string;
		portrait: string;
	};
};

export type Character = {
	id: UUID,
	name: string,
	level: CharacterLevel,
	stats: CharacterStat,
}

