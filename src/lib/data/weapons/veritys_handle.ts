import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const dmg_bonus = [0.12, 0.15, 0.18, 0.21, 0.24];
const burst_bonus = [0.48, 0.60, 0.72, 0.84, 0.96];

const weapon: WeaponData = {
	name: "Verity's Handle",
	quality: 5,
	weapon_type: WeaponType.Gauntlet,
	base_stats: {
		primary: { attribute: BaseAttribute.ATK, value: 47 },
		secondary: { attribute: CombatAttribute.CritRate, value: 0.054 }
	},
	conditionals: {
		ad_veritatem: {
			kind: 'switch',
			name: 'Ad Veritatem',
			value: 1,
		}
	},
	apply_effect: (input, stats) => {
		stats[ElementDMGBonus.Common] += dmg_bonus[input.weapon.rank - 1];
		stats[AttackDMGBonus.Liberation] += input.weapon.conditionals['ad_veritatem'] * burst_bonus[input.weapon.rank - 1];
	}
};

export default weapon;