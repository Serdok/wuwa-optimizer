import { base } from '$app/paths';
import { AttackType, Attribute, SkillType } from '$lib/types/stat';
import { WeaponType } from '$lib/types/weapon';
import { Element } from '$lib/types/element';
import type { CharacterLevel, CharacterMetadata } from '$lib/types/character';

export const CHARACTERS_METADATA: CharacterMetadata[] = [
	{
		name: 'Changli',
		quality: 5,
		element: Element.Fusion,
		weapon_type: WeaponType.Sword,
		base_stats: {
			[Attribute.HP]: 831,
			[Attribute.ATK]: 37,
			[Attribute.DEF]: 90,
			[Attribute.CritRate]: 5,
			[Attribute.CritDamage]: 150,
			[Attribute.EnergyRegen]: 100,
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
		},
		stat_bonus: {
			[Attribute.ATK_P]: 12,
			[Attribute.CritRate]: 8,
		},
		skills: {
			[SkillType.NormalAttack]: [
				{
					name: 'Basic Attack 1 DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.BasicAttack,
					values: [0.2949, 0.2949]
				},
				{
					name: 'Basic Attack 2 DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.BasicAttack,
					values: [0.3549, 0.3549]
				},
				{
					name: 'Basic Attack 3 DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.BasicAttack,
					values: [0.3645, 0.3645, 0.3645]
				},
				{
					name: 'Basic Attack 4 DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.BasicAttack,
					values: [0.507, 0.2958, 0.2958, 0.2958]
				}
			],
			[SkillType.ResonanceSkill]: [
				{
					name: 'True Sight: Capture DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.ResonanceSkill,
					values: [0.8188, 0.8188, 0.8188, 1.6376]
				},
				{
					name: 'True Sight: Conquest DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.ResonanceSkill,
					values: [0.5895, 0.5895, 0.8252, 0.9431]
				},
				{
					name: 'True Sight: Charge DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.ResonanceSkill,
					values: [0.7268, 1.0902]
				},
			],
			[SkillType.ForteCircuit]: [

				{
					name: 'Flaming Sacrifice DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.ResonanceSkill,
					values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785]
				},
			],
			[SkillType.ResonanceLiberation]: [
				{
					name: 'Skill DMG',
					element: Element.Fusion,
					attribute: Attribute.ATK,
					type: AttackType.ResonanceLiberation,
					values: [12.1275]
				},
			],
			[SkillType.IntroSkill]: [],
			[SkillType.OutroSkill]: [],
		},
		icon: {
			head: `${base}/assets/character/head/T_IconRoleHead256_26_UI.png`,
			portrait: `${base}/assets/character/portrait/T_IconRole_Pile_changli_UI.png`
		},
	},
	{
		name: 'Jinhsi',
		quality: 5,
		element: Element.Spectro,
		weapon_type: WeaponType.BroadSword,
		base_stats: {
			[Attribute.HP]: 866,
			[Attribute.ATK]: 33,
			[Attribute.DEF]: 103,
			[Attribute.CritRate]: 5,
			[Attribute.CritDamage]: 150,
			[Attribute.EnergyRegen]: 100,
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
		},
		stat_bonus: {},
		skills: {
			[SkillType.NormalAttack]: [],
			[SkillType.ResonanceSkill]: [],
			[SkillType.ForteCircuit]: [],
			[SkillType.ResonanceLiberation]: [],
			[SkillType.IntroSkill]: [],
			[SkillType.OutroSkill]: [],
		},
		icon: {
			head: `${base}/assets/character/head/T_IconRoleHead256_24_UI.png`,
			portrait: `${base}/assets/character/portrait/T_IconRole_Pile_jinxi_UI.png`
		},
	}
] as const;

export const CHARACTER_CURVE: { [level in CharacterLevel]: { [attr in Attribute]?: number } } = {
	'1/20': { [Attribute.HP]: 1, [Attribute.ATK]: 1, [Attribute.DEF]: 1, },
	'20/20': { [Attribute.HP]: 2.6011, [Attribute.ATK]: 2.6011, [Attribute.DEF]: 2.5655, },
	'20/40': { [Attribute.HP]: 3.2677, [Attribute.ATK]: 3.3511, [Attribute.DEF]: 3.2136, },
	'40/40': { [Attribute.HP]: 4.9531, [Attribute.ATK]: 5.0365, [Attribute.DEF]: 4.8616, },
	'40/50': { [Attribute.HP]: 5.6198, [Attribute.ATK]: 5.7865, [Attribute.DEF]: 5.5097, },
	'50/50': { [Attribute.HP]: 6.4625, [Attribute.ATK]: 6.6292, [Attribute.DEF]: 6.3337, },
	'50/60': { [Attribute.HP]: 7.1292, [Attribute.ATK]: 7.3792, [Attribute.DEF]: 6.9818, },
	'60/60': { [Attribute.HP]: 7.9719, [Attribute.ATK]: 8.2219, [Attribute.DEF]: 7.8058, },
	'60/70': { [Attribute.HP]: 8.6385, [Attribute.ATK]: 8.9719, [Attribute.DEF]: 8.454, },
	'70/70': { [Attribute.HP]: 9.4812, [Attribute.ATK]: 9.8146, [Attribute.DEF]: 9.2779, },
	'70/80': { [Attribute.HP]: 10.1479, [Attribute.ATK]: 10.3146, [Attribute.DEF]: 9.9261, },
	'80/80': { [Attribute.HP]: 10.9906, [Attribute.ATK]: 11.1573, [Attribute.DEF]: 10.7501, },
	'80/90': { [Attribute.HP]: 11.6573, [Attribute.ATK]: 11.6573, [Attribute.DEF]: 11.3982, },
	'90/90': { [Attribute.HP]: 12.5, [Attribute.ATK]: 12.5, [Attribute.DEF]: 12.2222, }
} as const;