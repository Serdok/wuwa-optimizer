import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const dmg_bonus = [0.12, 0.15, 0.18, 0.21, 0.24];
const skill_bonus = [0.24, 0.3, 0.36, 0.42, 0.48];

const data: WeaponData = {
	name: 'Ages of Harvest',
	weapon_type: WeaponType.Broadsword,
	quality: 5,
	base_stats: {
		primary: { attribute: BaseAttribute.ATK, value: 47 },
		secondary: { attribute: CombatAttribute.CritRate, value: 0.054 }
	},
	// passive: {
	// 	name: 'Divine Blessing',
	// 	description: rank => `Grants ${(dmg_bonus[rank - 1] * 100).toFixed(0)}% Attribute DMG Bonus. Casting Intro Skill gives the equipper Ageless Marking, which grants ${(skill_bonus[rank - 1] * 100).toFixed(0)}% Resonance Skill DMG Bonus for 12s. Casting Resonance Skill gives the equipper Ethereal Endowment, which grants ${(skill_bonus[rank - 1] * 100).toFixed(0)}% Resonance Skill DMG Bonus for 12s.`
	// },
	apply_effect: (input, stats) => {
		// Attribute DMG bonus
		stats[ElementDMGBonus.Common] += dmg_bonus[input.weapon.rank - 1];
	}
};

export default data;