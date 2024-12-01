import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	id: crypto.randomUUID(),
	name: 'Hoartoise',
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
		{ attribute: CombatAttribute.CritDamage, value: 0.174 },
		{ attribute: AttackDMGBonus.Basic, value: 0.079 },
		{ attribute: AttackDMGBonus.Skill, value: 0.086 },
		{ attribute: AttackDMGBonus.Liberation, value: 0.086 },
		{ attribute: BaseAttribute.ATK, value: 40 }
	],
	image: {
		head: 'T_IconMonsterHead_969_UI.png'
	}
};

export default echo;