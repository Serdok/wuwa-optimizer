import { Class, type Echo, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

const echo: Echo = {
	id: crypto.randomUUID(),
	name: 'Cyan-Feathered Heron',
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
		{ attribute: CombatAttribute.CritDamage, value: 0.186 },
		{ attribute: AttackDMGBonus.Liberation, value: 0.079 },
		{ attribute: CombatAttribute.EnergyRegen, value: 0.116 },
		{ attribute: CombatAttribute.CritRate, value: 0.075 },
		{ attribute: CombatAttribute.ATK_P, value: 0.116 }
	],
	image: {
		head: 'T_IconMonsterHead_135_UI.png'
	}
};

export default echo;