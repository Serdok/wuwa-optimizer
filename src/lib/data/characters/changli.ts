import { AttackType, type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';


const character: CharacterData = {
	name: 'Changli',
	quality: 5,
	element: Element.Fusion,
	weapon_type: WeaponType.Sword,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 831 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 37 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 90 }
	},
	conditionals: {
		'enflamement': {
			kind: 'slider',
			name: 'Enflamement',
			sequence: 0,
			value: 4,
			min_value: 0,
			max_value: 4,
		},
		'fiery_feather': {
			kind: 'switch',
			name: 'Fiery Feather',
			sequence: 0,
			value: 1,
		},
		'polished_words': {
			kind: 'switch',
			name: 'Polished Words',
			sequence: 4,
			value: 0,
		},
	},
	apply_effects: (input, stats) => {
		// bonus stats
		stats[CombatAttribute.ATK_P] += 0.12;
		stats[CombatAttribute.CritRate] += 0.08;

		if (input.character.conditionals['fiery_feather'] > 0) {
			stats[CombatAttribute.ATK_P] += 0.25;
		}

		if (input.character.sequence >= 2 && input.character.conditionals['enflamement'] > 0) {
			stats[CombatAttribute.CritRate] += 0.25;
		}

		if (input.character.sequence >= 4 && input.character.conditionals['polished_words'] > 0) {
			stats[CombatAttribute.ATK_P] += 0.2;
		}
	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: 'Blazing Enlightment',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Basic Attack 1 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.2949, 0.2949],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 2 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.3549, 0.3549],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 3 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.3645, 0.3645, 0.3645],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 4 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.507, 0.2958, 0.2958, 0.2958],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack 1 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.6135],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack 2 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.5087, 0.5087],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack 3 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.44, 0.44, 0.44],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack 4 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.3803, 0.2218, 0.2218, 0.2218, 0.2218],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Heavy,
					name: 'Heavy Attack 4 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.2899, 0.2899, 0.2899, 0.3727],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Heavy,
					name: 'Mid-air Heavy Attack 4 DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [1.2327],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Basic,
					name: 'Dodge Counter',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.8264, 0.8264, 0.8264],
					apply_effects: (input, stats) => {},
				}
			]
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: 'Tripartite Flame',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 1) {
					stats[ElementDMGBonus.Common] += 0.1;
				}

				if (input.character.sequence >= 6) {
					stats[CombatAttribute.DEFIgnore] += 0.4;
				}
			},
			motions: [
				{
					type: AttackType.Skill,
					name: 'True Sight: Capture DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.8188, 0.8188, 0.8188, 1.6376],
					apply_effects: (input, stats) => {},
				},
				{
					type: AttackType.Skill,
					name: 'True Sight: Conquest DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.5895, 0.5895, 0.8252, 0.9431],
					apply_effects: (input, stats) => {
						// secret strategist
						stats[ElementDMGBonus.Fusion] += 0.05 * (input.character.conditionals['enflamement'] ?? 0);
					},
				},
				{
					type: AttackType.Skill,
					name: 'True Sight: Charge DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.7268, 1.0902],
					apply_effects: (input, stats) => {
						// secret strategist
						stats[ElementDMGBonus.Fusion] += 0.05 * (input.character.conditionals['enflamement'] ?? 0);
					},
				}
			]
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: 'Flaming Sacrifice',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 1) {
					stats[ElementDMGBonus.Common] += 0.1;
				}

				if (input.character.sequence >= 4) {
					stats[CombatAttribute.SkillMultiplier] += 0.5;
					stats[AttackDMGBonus.Skill] += 0.5;
				}

				if (input.character.sequence >= 6) {
					stats[CombatAttribute.DEFIgnore] += 0.4;
				}
			},
			motions: [
				{
					type: AttackType.Skill,
					name: 'Flaming Sacrifice DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785],
					apply_effects: (input, stats) => {
						stats[ElementDMGBonus.Fusion] += 0.2;
						stats[CombatAttribute.DEFIgnore] += 0.15;
					},
				}
			]
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: 'Radiance of Fealty',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 3) {
					stats[AttackDMGBonus.Liberation] += 0.8;
				}

				if (input.character.sequence >= 6) {
					stats[CombatAttribute.DEFIgnore] += 0.4;
				}
			},
			motions: [
				{
					type: AttackType.Liberation,
					name: 'Skill DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [12.1275],
					apply_effects: (input, stats) => {
						stats[ElementDMGBonus.Fusion] += 0.2;
						stats[CombatAttribute.DEFIgnore] += 0.15;
					},
				}
			]
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: 'Strategy of Duality',
			apply_effects: (input, stats) => {},
			motions: []
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: 'Obedience of Rules',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Intro,
					name: 'Skill DMG',
					element: Element.Fusion,
					attribute: BaseAttribute.ATK,
					values: [0.445, 0.2596, 0.2596, 0.2596, 0.2596],
					apply_effects: (input, stats) => {},
				}
			]
		}
	}
};

export default character;