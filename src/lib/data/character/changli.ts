import { AttackType, Attribute, SkillType } from '$lib/types/stat';
import type { CharacterConditional, CharacterMetadata, CharacterResonanceChain } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { base } from '$app/paths';

export default function(chain: CharacterResonanceChain): CharacterMetadata {
	const fiery_feather: CharacterConditional = {
		name: 'Fiery Feather',
		condition: (character) => character.stacks['fiery_feather'].value > 0,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// ATK increased by 25%
				[Attribute.ATK_P]: (stats[Attribute.ATK_P] || 0) + 0.25,
			}
		},
	};

	const secret_strategist: CharacterConditional = {
		name: 'Secret Strategist',
		condition: (character) => character.stacks['enflamement'].value > 0,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Fusion DMG increased by 5% per Enflamement stack
				[Attribute.FusionBonus]: (stats[Attribute.FusionBonus] || 0) + (0.05 * character.stacks['enflamement'].value),
			}
		},
	};

	const sweeping_force: CharacterConditional = {
		name: 'Sweeping Force',
		condition: (character) => character.stacks['sweeping_force'].value > 0,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Fusion DMG increased by 20%
				[Attribute.FusionBonus]: (stats[Attribute.FusionBonus] || 0) + 0.2,
				// DEF ignore increased by 15%
				[Attribute.BasicAttackDEFIgnore]: (stats[Attribute.BasicAttackDEFIgnore] || 0) + 0.15,
				[Attribute.HeavyAttackDEFIgnore]: (stats[Attribute.HeavyAttackDEFIgnore] || 0) + 0.15,
				[Attribute.ResonanceSkillDEFIgnore]: (stats[Attribute.ResonanceSkillDEFIgnore] || 0) + 0.15,
				[Attribute.ResonanceLiberationDEFIgnore]: (stats[Attribute.ResonanceLiberationDEFIgnore] || 0) + 0.15,
				[Attribute.IntroDEFIgnore]: (stats[Attribute.IntroDEFIgnore] || 0) + 0.15,
				[Attribute.OutroDEFIgnore]: (stats[Attribute.OutroDEFIgnore] || 0) + 0.15,
			}
		}
	};

	const hidden_thoughts: CharacterConditional = {
		name: 'Hidden Thoughts',
		condition: (character) => chain >= 1,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Increase DMG by 10%
				[Attribute.FusionBonus]: (stats[Attribute.FusionBonus] || 0) + 0.1,
			}
		}
	};

	const pursuit_of_desires: CharacterConditional = {
		name: 'Pursuit of Desires',
		condition: (character) => chain >= 2 && character.stacks['enflamement'].value > 0,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Enflamement increase Crit Rate by 25%
				[Attribute.CritRate]: (stats[Attribute.CritRate] || 0) + 0.25,
			}
		}
	};

	const learned_secrets: CharacterConditional = {
		name: 'Learned Secrets',
		condition: (character) => chain >= 3,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Resonance Liberation DMG increased by 80%
				[Attribute.ResonanceLiberationBonus]: (stats[Attribute.ResonanceLiberationBonus] || 0) + 0.8,
			}
		}
	}

	const polished_words: CharacterConditional = {
		name: 'Polished Words',
		condition: (character) => chain >= 4 && character.stacks['polished_words'].value > 0,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// All team members ATK increased by 20%
				[Attribute.ATK_P]: (stats[Attribute.ATK_P] || 0) + 0.2,
			}
		}
	};

	const sacrificed_gains: CharacterConditional = {
		name: 'Sacrificed Gains',
		condition: (character) => chain >= 5,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Flaming Sacrifice multiplier increased by 50%
				[Attribute.ResonanceSkillMultiplier]: (stats[Attribute.ResonanceSkillMultiplier] || 0) + 0.5,
				// Flaming Sacrifice damage increased by 50%
				[Attribute.ResonanceSkillBonus]: (stats[Attribute.ResonanceSkillBonus] || 0) + 0.5,
			}
		},
	};

	const realized_plans: CharacterConditional = {
		name: 'Realized Plans',
		condition: (character) => chain >= 6,
		pre_compute: (character, stats) => {
			return {
				...stats,
				// Resonance Skill, Forte Circuit and Resonance Liberation ignore an additional 40% of DEF
				[Attribute.ResonanceSkillDEFIgnore]: (stats[Attribute.ResonanceSkillDEFIgnore] || 0) + 0.4,
				[Attribute.ResonanceLiberationDEFIgnore]: (stats[Attribute.ResonanceLiberationDEFIgnore] || 0) + 0.4,
			}
		}
	};


	return {
		game_id: 1205,
		name: 'Changli',
		quality: 5,
		element: Element.Fusion,
		weapon_type: WeaponType.Sword,
		base_stats: {
			[Attribute.HP]: { attribute: Attribute.HP, value: 831, },
			[Attribute.ATK]: { attribute: Attribute.ATK, value: 37, },
			[Attribute.DEF]: { attribute: Attribute.DEF, value: 90, },
		},
		skills: {
			[SkillType.NormalAttack]: {
				name: 'Blazing Enlightment',
				motions: [
					{
						name: 'Basic Attack 1 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.2949, 0.2949],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Basic Attack 2 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.3549, 0.3549],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Basic Attack 3 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.3645, 0.3645, 0.3645],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Basic Attack 4 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.507, 0.2958, 0.2958, 0.2958],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Mid-air Attack 1 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.6135],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Mid-air Attack 2 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.5087, 0.5087],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Mid-air Attack 3 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.44, 0.44, 0.44],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Mid-air Attack 4 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.3803, 0.2218, 0.2218, 0.2218, 0.2218],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Heavy Attack 4 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.HeavyAttack,
						values: [0.2899, 0.2899, 0.2899, 0.3727],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Mid-air Heavy Attack 4 DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.HeavyAttack,
						values: [1.2327],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					},
					{
						name: 'Dodge Counter',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.BasicAttack,
						values: [0.8264, 0.8264, 0.8264],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					}
				]
			},
			[SkillType.ResonanceSkill]: {
				name: 'Tripartite Flames',
				motions: [
					{
						name: 'True Sight: Capture DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.ResonanceSkill,
						values: [0.8188, 0.8188, 0.8188, 1.6376],
						conditionals: [fiery_feather, hidden_thoughts, pursuit_of_desires, polished_words, realized_plans]
					},
					{
						name: 'True Sight: Conquest DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.ResonanceSkill,
						values: [0.5895, 0.5895, 0.8252, 0.9431],
						conditionals: [fiery_feather, secret_strategist, hidden_thoughts, pursuit_of_desires, polished_words, realized_plans]
					},
					{
						name: 'True Sight: Charge DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.ResonanceSkill,
						values: [0.7268, 1.0902],
						conditionals: [fiery_feather, secret_strategist, hidden_thoughts, pursuit_of_desires, polished_words, realized_plans]
					},
				]
			},
			[SkillType.ForteCircuit]: {
				name: 'Flaming Sacrifice',
				motions: [
					{
						name: 'Flaming Sacrifice DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.ResonanceSkill,
						values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785],
						conditionals: [fiery_feather, sweeping_force, hidden_thoughts, pursuit_of_desires, polished_words, sacrificed_gains, realized_plans]
					},
				]
			},
			[SkillType.ResonanceLiberation]: {
				name: 'Radiance of Fealty',
				motions: [
					{
						name: 'Skill DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.ResonanceLiberation,
						values: [12.1275],
						conditionals: [fiery_feather, sweeping_force, pursuit_of_desires, learned_secrets, polished_words, realized_plans]
					}
				]
			},
			[SkillType.IntroSkill]: {
				name: 'Obedience of Rules',
				motions: [
					{
						name: 'Skill DMG',
						element: Element.Fusion,
						attribute: Attribute.ATK,
						type: AttackType.IntroSkill,
						values: [0.445, 0.2596, 0.2596, 0.2596, 0.2596],
						conditionals: [fiery_feather, pursuit_of_desires, polished_words]
					}
				]
			},
			[SkillType.OutroSkill]: {
				name: 'Strategy of Duality',
				motions: [],
			},
		},
		stat_bonuses: [
			// Blazing Enlightment
			{ attribute: Attribute.CritRate, value: 0.012, },
			{ attribute: Attribute.CritRate, value: 0.028, },
			// Tripartite Flames
			{ attribute: Attribute.ATK_P, value: 0.018, },
			{ attribute: Attribute.ATK_P, value: 0.042, },
			// Radiance of Fealty
			{ attribute: Attribute.ATK_P, value: 0.018, },
			{ attribute: Attribute.ATK_P, value: 0.042, },
			// Obedience of Rules
			{ attribute: Attribute.CritRate, value: 0.012, },
			{ attribute: Attribute.CritRate, value: 0.028, },
		],
		stacks: {
			'enflamement': {
				name: 'Enflamement',
				default_value: 0,
				max_stacks: 4,
			},
			'fiery_feather': {
				name: 'Fiery Feather',
				default_value: 0,
			},
			'sweeping_force': {
				name: 'Sweeping Force',
				default_value: 0,
			},
			'polished_words': {
				name: 'Polished Words',
				default_value: 0,
			},
		},
		image: {
			circle: `${base}/assets/character/circle/T_IconRoleHeadCircle256_26_UI.png`,
			head: `${base}/assets/character/head/T_IconRoleHead256_26_UI.png`,
			portrait: `${base}/assets/character/portrait/T_IconRole_Pile_changli_UI.png`,
		}
	};
}