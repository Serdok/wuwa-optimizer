import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const echo: Echo = {
	name: 'Havoc Dreadmane',
	quality: 5,
	level: 25,
	cost: 3,
	class: Class.Elite,
	sonata: Sonata.MoltenRift,
	main_stat: {
		primary: { attribute: BaseAttribute.ATK, value: 100 },
		secondary: { attribute: ElementDMGBonus.Fusion, value: 0.3 }
	},
	sub_stats: [
		{ attribute: CombatAttribute.CritDamage, value: 0.21 },
		{ attribute: AttackDMGBonus.Liberation, value: 0.109 },
		{ attribute: BaseAttribute.ATK, value: 40 },
		{ attribute: CombatAttribute.HP_P, value: 0.086 },
		{ attribute: CombatAttribute.CritRate, value: 0.069 }
	]
};

export default echo;