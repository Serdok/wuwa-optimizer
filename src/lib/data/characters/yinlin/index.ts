import { AttackType, type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

import portrait from './T_IconRole_Pile_yinlin_UI.png';

const character: CharacterData = {
	name: 'Yinlin',
	quality: 5,
	element: Element.Electro,
	weapon_type: WeaponType.Rectifier,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 880 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 32 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 105 }
	},
	conditionals: {
		pain_immersion: {
			kind: 'switch',
			name: 'Pain Immersion',
			sequence: 0,
			value: 1,
		},
		deadly_focus: {
			kind: 'switch',
			name: 'Deadly Focus',
			sequence: 0,
			value: 1
		},
		steadfast_conviction: {
			kind: 'switch',
			name: 'Steadfast Conviction',
			sequence: 4,
			value: 0,
		},
		resounding_will: {
			kind: 'switch',
			name: 'Resounding Will',
			sequence: 5,
			value: 0
		}
	},
	apply_effects: (input, stats) => {
		// bonus stats
		stats[CombatAttribute.ATK_P] += 0.12;
		stats[CombatAttribute.CritRate] += 0.08;

		stats[CombatAttribute.CritRate] += 0.15 * (input.character.conditionals['pain_immersion'] || 0);
		stats[CombatAttribute.ATK_P] += 0.1 * (input.character.conditionals['deadly_focus'] || 0);
		stats[CombatAttribute.ATK_P] += 0.2 * (input.character.conditionals['steadfast_conviction'] || 0);
	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: "Zapstring's Dance",
			apply_effects: () => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Stage 1 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.2881],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 2 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.3382, 0.3382],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 3 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.1399, 0.1399, 0.1399, 0.1399, 0.1399, 0.1399, 0.1399],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 4 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.7516],
					apply_effects: () => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Heavy Attack DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.2983, 0.2983],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.2327],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Dodge Counter DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.2422, 0.2422, 0.2422, 0.2422, 0.2422, 0.2422, 0.2422],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: 'Magnetic Roar',
			apply_effects: () => {},
			motions: [
				{
					name: 'Magnetic Roar Damage',
					type: AttackType.Skill,
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.5965, 0.5965, 0.5965],
					apply_effects: (input, stats) => {
						if (input.character.sequence >= 1) {
							stats[AttackDMGBonus.Skill] += 0.7;
						}
					}
				},
				{
					name: 'Lightning Execution Damage',
					type: AttackType.Skill,
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.8947, 0.8947, 0.8947, 0.8947],
					apply_effects: (input, stats) => {
						stats[AttackDMGBonus.Skill] += 0.1 * (input.character.conditionals['deadly_focus'] || 0);

						if (input.character.sequence >= 1) {
							stats[AttackDMGBonus.Skill] += 0.7;
						}
					}
				},
				{
					name: 'Electromagnetic Blast Damage',
					type: AttackType.Skill,
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.1989],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: 'Chameleon Cipher',
			apply_effects: () => {},
			motions: [
				{
					name: 'Chameleon Cipher Damage',
					type: AttackType.Heavy,
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.7893, 1.7893],
					apply_effects: () => {}
				},
				{
					name: 'Judgment Strike Damage',
					type: AttackType.Skill,
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.7864],
					apply_effects: (input, stats) => {
						if (input.character.sequence >= 3) {
							stats[CombatAttribute.SkillMultiplier] += 0.55;
						}
					}
				}
			]
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: 'Thundering Wrath',
			apply_effects: (input, stats) => {
				stats[AttackDMGBonus.Liberation] += (input.character.conditionals['resounding_will'] || 0);
			},
			motions: [
				{
					type: AttackType.Liberation,
					name: 'Skill DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.1656, 1.1656, 1.1656, 1.1656, 1.1656, 1.1656, 1.1656],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: 'Raging Storm',
			apply_effects: () => {},
			motions: [
				{
					type: AttackType.Intro,
					name: 'Skill DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.1432, 0.1432, 0.1432, 0.1432, 0.1432, 0.1432, 0.1432, 0.1432, 0.1432, 0.1432],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: 'Strategist',
			apply_effects: () => {},
			motions: []
		}
	},
	image: {
		portrait
	}
};

export default character;