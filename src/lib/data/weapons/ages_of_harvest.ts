import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

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
	conditionals: {
		'ageless_marking': {
			kind: 'switch',
			name: 'Ageless Marking',
			value: 1,
		},
		'ethereal_endowment': {
			kind: 'switch',
			name: 'Ethereal Endowment',
			value: 1,
		}
	},
	apply_effect: (input, stats) => {
		// Attribute DMG bonus
		stats[ElementDMGBonus.Common] += dmg_bonus[input.weapon.rank - 1];
		stats[AttackDMGBonus.Skill] += (input.weapon.conditionals['ageless_marking'] || 0) * skill_bonus[input.weapon.rank - 1];
		stats[AttackDMGBonus.Skill] += (input.weapon.conditionals['ethereal_endowment'] || 0) * skill_bonus[input.weapon.rank - 1];
	}
};

export default data;