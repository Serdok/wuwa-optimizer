import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { AttackType, Attribute, SkillType } from '$lib/types/stat';
import { base } from '$app/paths';
import type { CharacterMetadata } from '$lib/types/character';

const character: CharacterMetadata = {
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
					values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785]
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
					values: [12.1275]
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
					values: [0.445, 0.2596, 0.2596, 0.2596, 0.2596]
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
	conditionals: [
		{
			name: 'Fiery Feather',
			condition: (character) => character.stacks['fiery_feather'].value > 0,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// ATK increased by 25%
					[Attribute.ATK_P]: (stats[Attribute.ATK_P] || 0) + 0.25,
				}
			},
		},
		{
			name: 'Secret Strategist',
			condition: (character) => character.stacks['enflamement'].value > 0,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// Fusion DMG increased by 5% per Enflamement stack
					[Attribute.FusionBonus]: (stats[Attribute.FusionBonus] || 0) + (0.05 * character.stacks['enflamement'].value),
				}
			},
		},
		{
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
					[Attribute.ForteCircuitDEFIgnore]: (stats[Attribute.ForteCircuitDEFIgnore] || 0) + 0.15,
					[Attribute.ResonanceLiberationDEFIgnore]: (stats[Attribute.ResonanceLiberationDEFIgnore] || 0) + 0.15,
					[Attribute.IntroDEFIgnore]: (stats[Attribute.IntroDEFIgnore] || 0) + 0.15,
					[Attribute.OutroDEFIgnore]: (stats[Attribute.OutroDEFIgnore] || 0) + 0.15,
				}
			}
		},
		{
			name: 'Hidden Thoughts',
			condition: (character) => character.resonance_chain >= 1,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// Increase DMG by 10%
					[Attribute.FusionBonus]: (stats[Attribute.FusionBonus] || 0) + 0.1,
				}
			}
		},
		{
			name: 'Pursuit of Desires',
			condition: (character) => character.resonance_chain >= 2 && character.stacks['enflamement'].value > 0,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// Enflamement increase Crit Rate by 25%
					[Attribute.CritRate]: (stats[Attribute.CritRate] || 0) + 0.25,
				}
			}
		},
		{
			name: 'Learned Secrets',
			condition: (character) => character.resonance_chain >= 3,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// Resonance Liberation DMG increased by 80%
					[Attribute.ResonanceLiberationBonus]: (stats[Attribute.ResonanceLiberationBonus] || 0) + 0.8,
				}
			}
		},
		{
			name: 'Polished Words',
			condition: (character) => character.resonance_chain >= 4 && character.stacks['polished_words'].value > 0,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// All team members ATK increased by 20%
					[Attribute.ATK_P]: (stats[Attribute.ATK_P] || 0) + 0.2,
				}
			}
		},
		{
			name: 'Sacrificed Gains',
			condition: (character) => character.resonance_chain >= 5,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// Flaming Sacrifice multiplier increased by 50%
					[Attribute.ForteCircuitMultiplier]: (stats[Attribute.ForteCircuitMultiplier] || 0) + 0.5,
					// Flaming Sacrifice damage increased by 50%
					[Attribute.ForteCircuitBonus]: (stats[Attribute.ForteCircuitBonus] || 0) + 0.5,
				}
			},
		},
		{
			name: 'Realized Plans',
			condition: (character) => character.resonance_chain >= 6,
			pre_compute: (character, stats) => {
				return {
					...stats,
					// Resonance Skill, Forte Circuit and Resonance Liberation ignore an additional 40% of DEF
					[Attribute.ResonanceSkillDEFIgnore]: (stats[Attribute.ResonanceSkillDEFIgnore] || 0) + 0.4,
					[Attribute.ForteCircuitDEFIgnore]: (stats[Attribute.ForteCircuitDEFIgnore] || 0) + 0.4,
					[Attribute.ResonanceLiberationDEFIgnore]: (stats[Attribute.ResonanceLiberationDEFIgnore] || 0) + 0.4,
				}
			}
		}
	],
	image: {
		circle: `${base}/assets/character/circle/T_IconRoleHeadCircle256_26_UI.png`,
		head: `${base}/assets/character/head/T_IconRoleHead256_26_UI.png`,
		portrait: `${base}/assets/character/portrait/T_IconRole_Pile_changli_UI.png`,
	}
} as const;

export default character;