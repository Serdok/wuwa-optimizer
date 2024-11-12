import { type WeaponData, WeaponType } from '$lib/types/weapon';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

const atk_increase = [0.12, 0.15, 0.18, 0.21, 0.24];
const skill_increase = [0.04, 0.05, 0.06, 0.07, 0.08];

const data: WeaponData = {
	name: 'Blazing Brilliance',
	weapon_type: WeaponType.Sword,
	quality: 5,
	base_stats: {
		primary: { attribute: BaseAttribute.ATK, value: 47 },
		secondary: { attribute: CombatAttribute.CritDamage, value: 0.108 }
	},
	conditionals: {
		'searing_feather': {
			kind: 'slider',
			name: 'Searing Feather',
			value: 14,
			min_value: 0,
			max_value: 14,
		}
	},
	apply_effect: (input, stats) => {
		stats[CombatAttribute.ATK_P] += atk_increase[input.weapon.rank - 1];
		stats[AttackDMGBonus.Skill] += skill_increase[input.weapon.rank - 1] * (input.weapon.conditionals['searing_feather'] ?? 0);
	}
};

export default data;