import { AttackType, type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

import portrait from './T_IconRole_Pile_jiyan_UI.png';

const character: CharacterData = {
	name: 'Jiyan',
	element: Element.Aero,
	weapon_type: WeaponType.Broadsword,
	quality: 5,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 839 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 35 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 97 }
	},
	conditionals: {
		resolve: {
			kind: 'slider',
			name: 'Resolve',
			sequence: 0,
			value: 60,
			min_value: 0,
			max_value: 60
		},
		qingloong_mode: {
			kind: 'switch',
			name: 'Qingloong Mode',
			sequence: 0,
			value: 1
		},
		versatility: {
			kind: 'switch',
			name: 'Versatility',
			sequence: 2,
			value: 0
		},
		prudence: {
			kind: 'switch',
			name: 'Prudence',
			sequence: 4,
			value: 0
		},
		resolution: {
			kind: 'slider',
			name: 'Resolution',
			sequence: 5,
			value: 0,
			min_value: 0,
			max_value: 15
		},
		momentum: {
			kind: 'slider',
			name: 'Momentum',
			sequence: 6,
			value: 0,
			min_value: 0,
			max_value: 2
		}
	},
	apply_effects: (input, stats) => {
		// bonus stats
		stats[CombatAttribute.ATK_P] += 0.12;
		stats[CombatAttribute.CritRate] += 0.08;

		if (input.character.conditionals['heavenly_balance']) {
			stats[CombatAttribute.ATK_P] += 0.1;
		}
		if (input.character.conditionals['tempest_taming']) {
			stats[CombatAttribute.CritDamage] += 0.12;
		}
		if (input.character.conditionals['versatility']) {
			stats[CombatAttribute.ATK_P] += 0.28;
		}
		if (input.character.conditionals['prudence']) {
			stats[AttackDMGBonus.Heavy] += 0.25;
		}
		stats[CombatAttribute.ATK_P] += 0.03 * (input.character.conditionals['resolution'] || 0);
	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: 'Lone Lance',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Stage 1 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.7316],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 2 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.4373],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 3 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.3638, 0.3638, 0.3638, 0.3638, 0.3638],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 4 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.662, 0.662],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Stage 5 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.236, 0.236, 0.236, 0.236, 0.236, 0.236, 0.236, 1.5345, 1.5345],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Heavy Attack DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.222, 0.222, 0.222, 0.222, 0.222, 0.222],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Windborne Strike Damage',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.0596],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Abyssal Slash Damage',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.8171],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.2326],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Banner Of Triumph Damage',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.7952],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack Follow-Up DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.5566],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Basic,
					name: 'Dodge Counter DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.2584, 1.2584],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: 'Windqueller',
			apply_effects: (input, stats) => {
				if (
					input.character.conditionals['resolve'] > 30 ||
					input.character.conditionals['qingloong_mode']
				) {
					stats[AttackDMGBonus.Skill] += 0.2;
				}
				if (input.character.sequence >= 3) {
					stats[CombatAttribute.CritRate] += 0.16;
					stats[CombatAttribute.CritDamage] += 0.32;
				}
			},
			motions: [
				{
					type: AttackType.Skill,
					name: 'Skill DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.0636, 1.0636, 1.0636, 1.0636],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: 'Qingloong at War',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 3) {
					stats[CombatAttribute.CritRate] += 0.16;
					stats[CombatAttribute.CritDamage] += 0.32;
				}
				stats[CombatAttribute.SkillMultiplier] += 1.2 * (input.character.conditionals['momentum'] || 0);
			},
			motions: [
				{
					type: AttackType.Heavy,
					name: 'Emerald Storm - Finale',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.4291, 1.4291, 4.2873],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: 'Emerald Storm - Prelude',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 3) {
					stats[CombatAttribute.CritRate] += 0.16;
					stats[CombatAttribute.CritDamage] += 0.32;
				}
			},
			motions: [
				{
					type: AttackType.Heavy,
					name: 'Lance of Qingloong Stage 1 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.6552, 0.6552, 0.6552, 0.6552, 0.6552, 0.6552, 0.6552, 0.6552],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Lance of Qingloong Stage 2 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.6155, 0.6155, 0.6155, 0.6155, 0.6155, 0.6155, 0.6155, 0.6155],
					apply_effects: (input, stats) => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Lance of Qingloong Stage 3 DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [0.6676, 0.6676, 0.6676, 0.6676, 0.6676, 0.6676, 0.6676, 0.6676],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: 'Tactical Strike',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 3) {
					stats[CombatAttribute.CritRate] += 0.16;
					stats[CombatAttribute.CritDamage] += 0.32;
				}
			},
			motions: [
				{
					type: AttackType.Intro,
					name: 'Skill DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [1.9881],
					apply_effects: (input, stats) => {}
				}
			]
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: 'Discipline',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 5) {
					stats[CombatAttribute.SkillMultiplier] += 1.2;
				}
			},
			motions: [
				{
					type: AttackType.Outro,
					name: 'Skill DMG',
					element: Element.Aero,
					attribute: BaseAttribute.ATK,
					values: [3.134],
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