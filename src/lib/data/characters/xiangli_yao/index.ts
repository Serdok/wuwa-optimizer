import { AttackType, type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

import portrait from './T_IconRole_Pile_xiangliyao_UI.png';

// todo: implement sequence 6 extra attacks
const character: CharacterData = {
	name: 'Xiangli Yao',
	element: Element.Electro,
	weapon_type: WeaponType.Gauntlet,
	quality: 5,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 850 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 34 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 100 }
	},
	conditionals: {
		intuition: {
			kind: 'switch',
			name: 'Intuition',
			value: 1,
			sequence: 0,
		},
		knowing: {
			kind: 'slider',
			name: 'Knowing',
			sequence: 0,
			value: 4,
			min_value: 0,
			max_value: 4
		},
		traces_of_predecessors: {
			kind: 'switch',
			name: 'Traces of Predecessors',
			sequence: 2,
			value: 0,
		},

	},
	apply_effects: (input, stats) => {
		// bonus stats
		stats[CombatAttribute.ATK_P] += 0.12;
		stats[CombatAttribute.CritDamage] += 0.16;

		if (input.character.conditionals['knowing']) {
			stats[ElementDMGBonus.Electro] += 0.05 * (input.character.conditionals['intuition'] || 0);
		}
		stats[CombatAttribute.CritDamage] += 0.3 * (input.character.conditionals['traces_of_predecessors'] || 0);
	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: 'Probe',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Stage 1 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.3311, 0.3311],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 2 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.9961],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 3 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.3976, 0.3976, 0.3976],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 4 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.5302, 0.5302, 0.2653],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Stage 5 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.9881],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Heavy,
					name: 'Heavy Attack DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.8281, 0.8281],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.2327],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Dodge Counter DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [2.3858],
					apply_effects: (input, stats) => {},
				}
			]
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: 'Deduction',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Skill,
					name: 'Skill DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.9881],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: 'Forever Seeking',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Liberation,
					name: 'Decipher DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [3.9782],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Liberation,
					name: 'Law of Reigns DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.9573, 0.9573, 0.9573, 0.9573, 2.5528],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Liberation,
					name: 'Revamp DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.2187, 0.2187, 0.2187, 0.2187, 0.6561, 0.6561],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: 'Cogitation Model',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Liberation,
					name: 'Cogitation Model DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [14.6606],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Pivot - Impale Stage 1 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.1967],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Pivot - Impale Stage 2 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.6092, 0.6092, 0.6092, 0.6092],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Pivot - Impale Stage 3 DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [1.3325, 1.3325],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Skill,
					name: 'Divergence DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.4959, 0.4959, 0.4959, 1.7355, 1.7355],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Liberation,
					name: 'Unfathomed DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.3883, 0.3883, 3.1058],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: 'Principle',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Intro,
					name: 'Skill DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [0.9941, 0.9941],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: 'Chain Rule',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Outro,
					name: 'Skill DMG',
					element: Element.Electro,
					attribute: BaseAttribute.ATK,
					values: [2.3763],
					apply_effects: (input, stats) => {}
				}
			]
		}
	},
	image: {
		portrait
	}
};

export default character;