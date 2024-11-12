import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	name: 'Jué',
	quality: 5,
	cost: 4,
	class: Class.Calamity,
	sonata: Sonata.CelestialLight,
	level: 25,
	main_stat: {
		primary: { attribute: BaseAttribute.ATK, value: 150 },
		secondary: { attribute: CombatAttribute.CritRate, value: 0.22 }
	},
	sub_stats: [
		{ attribute: CombatAttribute.HP_P, value: 0.064 },
		{ attribute: CombatAttribute.CritDamage, value: 0.162 },
		{ attribute: CombatAttribute.DEF_P, value: 0.109 },
		{ attribute: AttackDMGBonus.Liberation, value: 0.101 },
		{ attribute: AttackDMGBonus.Skill, value: 0.109 }
	]
};

export default echo;