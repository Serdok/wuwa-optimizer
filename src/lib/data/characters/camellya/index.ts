import { AttackType, type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

import portrait from './T_IconRole_Pile_chun_UI.png';

// todo: implement sequence 6 extra attacks + damage type overwrite on heavy attack
const data: CharacterData = {
	name: 'Camellya',
	element: Element.Havoc,
	quality: 5,
	weapon_type: WeaponType.Sword,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 826 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 36 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 95 }
	},
	conditionals: {
		seedbed: {
			kind: 'switch',
			name: 'Seedbed',
			sequence: 0,
			value: 1
		},
		epiphyte: {
			kind: 'switch',
			name: 'Epiphyte',
			sequence: 0,
			value: 1
		},
		budding_mode: {
			kind: 'switch',
			name: 'Budding Mode',
			sequence: 0,
			value: 1
		},
		crimson_pistils: {
			kind: 'slider',
			name: 'Crimson Pistils',
			sequence: 0,
			value: 100,
			min_value: 0,
			max_value: 100
		},
		somewhere_no_one_travelled: {
			kind: 'switch',
			name: 'Somewhere No One Travelled',
			sequence: 1,
			value: 0,
		},
		roots_set_deep_in_eternity: {
			kind: 'switch',
			name: 'Roots Set Deep In Eternity',
			sequence: 4,
			value: 0
		},
	},
	apply_effects: (input, stats) => {
		// bonus stats
		stats[CombatAttribute.CritDamage] += 0.16;
		stats[CombatAttribute.ATK_P] += 0.12;

		stats[ElementDMGBonus.Havoc] += input.character.conditionals['seedbed'] * 0.15;
		stats[AttackDMGBonus.Basic] += input.character.conditionals['epiphyte'] * 0.15;

		stats[CombatAttribute.CritDamage] += input.character.conditionals['somewhere_no_one_travelled'] * 0.28;

		if (input.character.sequence >= 3) {
			stats[CombatAttribute.ATK_P] += input.character.conditionals['budding_mode'] * 0.58;
		}

		stats[AttackDMGBonus.Basic] += input.character.conditionals['roots_set_deep_in_eternity'] * 0.25;
	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: 'Burgeoning',
			apply_effects: () => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Basic Attack 1 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.6253],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 2 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.4648, 0.4648],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 3 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.507, 0.507, 0.507],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 4 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: Array(20).fill(0.247),
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Basic Attack 5 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.4817, 0.4817, 0.4817, 0.4817],
					apply_effects: () => {}
				},
				{
					type: AttackType.Heavy,
					name: 'Heavy Attack DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.8814, 0.8814, 0.8814],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Mid-air Attack DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.6561, 0.6561],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Dodge Counter DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.994, 0.994, 0.994],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: 'Valse of Bloom and Blight',
			apply_effects: (input, stats) => {
				if (input.character.conditionals['budding_mode']) {
					stats[CombatAttribute.SkillMultiplier] += 0.5 + Math.min(input.character.conditionals['crimson_pistils'] * 0.05, 0.5);
				}
			},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Crimson Blossom DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [1.1362, 1.1362],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Vining Waltz 1 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.9633],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Vining Waltz 2 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.4563, 0.4563],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Vining Waltz 3 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.2195, 0.2195, 0.2195, 0.2195, 0.2195, 0.2195],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Vining Waltz 4 DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.6759, 0.6759, 0.6759],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Blazing Waltz DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: Array(19).fill(0.2195),
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Floral Ravage DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.5261, 0.5261, 0.5261, 0.5261, 0.5261],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Vining Ronde DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [0.5295, 0.5295, 0.5295],
					apply_effects: () => {}
				},
				{
					type: AttackType.Basic,
					name: 'Atonement DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [1.1333, 1.1333],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: 'Fervor Efflorescent',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 3) {
					stats[CombatAttribute.SkillMultiplier] += 0.5;
				}
			},
			motions: [
				{
					type: AttackType.Liberation,
					name: 'Skill DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [12.0281],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: 'Vegetative Universe',
			apply_effects: (input, stats) => {},
			motions: [
				{
					type: AttackType.Basic,
					name: 'Ephemeral DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [12.6545],
					apply_effects: (input, stats) => {
						if (input.character.sequence >= 2) {
							stats[CombatAttribute.SkillMultiplier] += 1.2;
						}
					}
				}
			]
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: 'Everblooming',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 5) {
					stats[CombatAttribute.SkillMultiplier] += 3.03;
				}
			},
			motions: [
				{
					type: AttackType.Intro,
					name: 'Everblooming',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [1.9881],
					apply_effects: () => {}
				}
			]
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: 'Twining',
			apply_effects: (input, stats) => {
				if (input.character.sequence >= 5) {
					stats[CombatAttribute.SkillMultiplier] += 0.68;
				}
			},
			motions: [
				{
					type: AttackType.Outro,
					name: 'Skill DMG',
					element: Element.Havoc,
					attribute: BaseAttribute.ATK,
					values: [3.2924],
					apply_effects: () => {}
				}
			]
		}
	},
	image: {
		portrait
	}
};

export default data;