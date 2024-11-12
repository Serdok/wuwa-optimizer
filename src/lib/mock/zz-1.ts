import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	name: 'Zig Zag',
	quality: 5,
	cost: 1,
	class: Class.Common,
	sonata: Sonata.CelestialLight,
	level: 25,
	main_stat: {
		primary: { attribute: BaseAttribute.HP, value: 2280 },
		secondary: { attribute: CombatAttribute.ATK_P, value: 0.18 }
	},
	sub_stats: [
		{ attribute: CombatAttribute.CritDamage, value: 0.138 },
		{ attribute: CombatAttribute.EnergyRegen, value: 0.068 },
		{ attribute: AttackDMGBonus.Skill, value: 0.064 },
		{ attribute: BaseAttribute.DEF, value: 40 },
		{ attribute: AttackDMGBonus.Heavy, value: 0.101 }
	]
};

export default echo;