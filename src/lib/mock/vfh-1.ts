import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	name: 'Violet-Feathered Heron',
	quality: 5,
	level: 25,
	sonata: Sonata.MoltenRift,
	class: Class.Elite,
	cost: 3,
	main_stat: {
		primary: { attribute: BaseAttribute.ATK, value: 100 },
		secondary: { attribute: CombatAttribute.ATK_P, value: 0.3 }
	},
	sub_stats: [
		{ attribute: CombatAttribute.CritRate, value: 0.075 },
		{ attribute: CombatAttribute.ATK_P, value: 0.071 },
		{ attribute: CombatAttribute.CritDamage, value: 0.174 },
		{ attribute: CombatAttribute.HP_P, value: 0.094 },
		{ attribute: AttackDMGBonus.Heavy, value: 0.079 }
	]
};

export default echo;