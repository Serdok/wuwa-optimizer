import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	name: 'Fusion Warrior',
	level: 25,
	class: Class.Common,
	cost: 1,
	sonata: Sonata.MoltenRift,
	quality: 5,
	main_stat: {
		primary: { attribute: BaseAttribute.HP, value: 2280 },
		secondary: { attribute: CombatAttribute.ATK_P, value: 0.18 }
	},
	sub_stats: [
		{ attribute: CombatAttribute.CritDamage, value: 0.15 },
		{ attribute: BaseAttribute.HP, value: 430 },
		{ attribute: CombatAttribute.CritRate, value: 0.075 },
		{ attribute: AttackDMGBonus.Liberation, value: 0.086 },
		{ attribute: CombatAttribute.DEF_P, value: 0.109 }
	]
};

export default echo;