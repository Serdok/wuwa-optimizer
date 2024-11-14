import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const dmg_bonus = [0.12, 0.15, 0.18, 0.21, 0.24];
const heavy_bonus = [0.24, 0.3, 0.36, 0.42, 0.48];

const data: WeaponData = {
	name: 'Verdant Summit',
	weapon_type: WeaponType.Broadsword,
	quality: 5,
	base_stats: {
		primary: { attribute: BaseAttribute.ATK, value: 47 },
		secondary: { attribute: CombatAttribute.CritDamage, value: 0.108 }
	},
	conditionals: {
		'swordsworn': {
			kind: 'slider',
			name: 'Swordsworn',
			value: 2,
			min_value: 0,
			max_value: 2
		}
	},
	apply_effect: (input, stats) => {
		// Attribute DMG bonus
		stats[ElementDMGBonus.Common] += dmg_bonus[input.weapon.rank - 1];
		stats[AttackDMGBonus.Heavy] += (input.weapon.conditionals['swordsworn'] || 0) * heavy_bonus[input.weapon.rank - 1];
	}
};

export default data;