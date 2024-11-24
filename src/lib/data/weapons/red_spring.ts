import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const weapon: WeaponData = {
	name: 'Red Spring',
	quality: 5,
	weapon_type: WeaponType.Sword,
	base_stats: {
		primary: { attribute: BaseAttribute.ATK, value: 47 },
		secondary: { attribute: CombatAttribute.CritRate, value: 0.054 }
	},
	conditionals: {
		electric_amplification: {
			name: 'Electric Amplification',
			kind: 'slider',
			value: 2,
			min_value: 0,
			max_value: 2,
		}
	},
	apply_effect: (input, stats) => {
		stats[ElementDMGBonus.Common] += 0.12;

	}
};

export default weapon;