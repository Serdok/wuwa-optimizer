import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const dmg_bonus = [0.12, 0.15, 0.18, 0.21, 0.24];
const atk_bonus = [0.12, 0.15, 0.18, 0.21, 0.24];

const weapon: WeaponData = {
	name: 'Stringmaster',
	quality: 5,
	weapon_type: WeaponType.Rectifier,
	base_stats: {
		primary: { attribute: BaseAttribute.ATK, value: 40 },
		secondary: { attribute: CombatAttribute.CritRate, value: 0.08 }
	},
	conditionals: {
		electric_amplification: {
			name: 'Electric Amplification',
			kind: 'slider',
			value: 2,
			min_value: 0,
			max_value: 2,
		},
		off_field: {
			name: 'Is off-field',
			kind: 'switch',
			value: 1,
		}
	},
	apply_effect: (input, stats) => {
		stats[ElementDMGBonus.Common] += dmg_bonus[input.weapon.rank - 1];
		stats[CombatAttribute.ATK_P] += atk_bonus[input.weapon.rank - 1] * input.weapon.conditionals['electric_amplification'];
		if (input.weapon.conditionals['off_field']) {
			stats[CombatAttribute.ATK_P] += atk_bonus[input.weapon.rank - 1];
		}
	}
};

export default weapon;