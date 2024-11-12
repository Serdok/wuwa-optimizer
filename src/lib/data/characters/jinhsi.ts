import { AttackType, type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { BaseAttribute, CombatAttribute } from '$lib/types/stat';

const character: CharacterData = {
	name: 'Jinhsi',
	element: Element.Spectro,
	quality: 5,
	weapon_type: WeaponType.Broadsword,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 866 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 33 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 103 }
	},
	conditionals: {

	},
	apply_effects: (input, stats) => {
		// bonus stats
		stats[CombatAttribute.ATK_P] += 0.018;
		stats[CombatAttribute.ATK_P] += 0.018;
		stats[CombatAttribute.ATK_P] += 0.042;
		stats[CombatAttribute.ATK_P] += 0.042;
		stats[CombatAttribute.CritRate] += 0.012;
		stats[CombatAttribute.CritRate] += 0.012;
		stats[CombatAttribute.CritRate] += 0.028;
		stats[CombatAttribute.CritRate] += 0.028;
	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: 'Slash of Breaking Dawn',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Stage 1 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.6647],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 2 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.3899, 0.195, 0.195, 0.195],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 3 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.3194],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 4 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.6309, 0.9463],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Heavy,
					name: 'Heavy Attack DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.2386, 0.2386, 0.2386, 0.2386, 0.2386, 0.3579, 0.8351],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.1233, 0.2466, 0.8629],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Dodge Counter DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.4402],
					apply_effects: (input, stats) => {},
				}
			]
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: 'Trailing Lights of Eons',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Skill,
					name: 'Skill DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.1946, 0.1946, 0.1946, 0.1946, 0.7784],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Overflowing Radiance DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.0987, 0.0987, 0.0987, 0.0987, 0.2959, 0.2959, 0.2959, 0.2959, 0.3945],
					apply_effects: (input, stats) => {},
				}
			]
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: 'Luminal Synthesis',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Skill,
					name: 'Incarnation - Basic Attack 1 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.8862],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Incarnation - Basic Attack 2 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.7797, 0.2599, 0.2599],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Incarnation - Basic Attack 3 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.9944, 0.663],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Incarnation - Basic Attack 4 DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.1867, 0.1867, 0.1867, 0.1867, 0.1867, 0.1867, 0.7467],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Incarnation - Heavy Attack DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.4772, 1.1134],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Incarnation - Dodge Counter DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.4389, 0.3292, 0.3292, 1.0971],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Crescent Divinity DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [1.0076, 0.7557, 0.7557, 2.519],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Illuminous Epiphany: Solar Flare DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [0.1989, 0.1989, 0.1989, 0.1989, 0.1989, 0.1989],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'Illuminous Epiphany: Stella Glamor DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [3.4792],
					apply_effects: (input, stats) => {},
				}
			]
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: 'Purge of Light',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Liberation,
					name: 'Skill DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [4.9981, 11.6622],
					apply_effects: (input, stats) => {},
				}
			]
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: 'Temporal Bender',
			apply_effects: (input, stats) => {},
			motions: []
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: "Loong's Halo",
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Intro,
					name: 'Skill DMG',
					element: Element.Spectro,
					attribute: BaseAttribute.ATK,
					values: [1.5905],
					apply_effects: (input, stats) => {},
				}
			]
		}
	}
};

export default character;