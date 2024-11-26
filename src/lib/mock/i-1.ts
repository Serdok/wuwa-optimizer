import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const echo: Echo = {
	name: 'Lightcrusher',
	quality: 5,
	cost: 3,
	class: Class.Elite,
	sonata: Sonata.CelestialLight,
	level: 25,
	main_stat: {
		primary: { attribute: BaseAttribute.ATK, value: 100 },
		secondary: { attribute: ElementDMGBonus.Spectro, value: 0.3 }
	},
	sub_stats: [
		{ attribute: BaseAttribute.HP, value: 430 },
		{ attribute: CombatAttribute.CritDamage, value: 0.138 },
		{ attribute: CombatAttribute.CritRate, value: 0.099 },
		{ attribute: CombatAttribute.EnergyRegen, value: 0.108 },
		{ attribute: AttackDMGBonus.Skill, value: 0.064 }
	],
	image: {
		head: 'T_IconMonsterHead_328_UI.png'
	}
};

export default echo;