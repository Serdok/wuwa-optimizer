import { Class, type Echo, Sonata } from '$lib/types/echo';
import { BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	id: crypto.randomUUID(),
	name: 'Fusion Dreadmane',
	quality: 5,
	level: 25,
	class: Class.Common,
	cost: 1,
	sonata: Sonata.MoltenRift,
	main_stat: {
		primary: { attribute: BaseAttribute.HP, value: 2280 },
		secondary: { attribute: CombatAttribute.ATK_P, value: 0.18 }
	},
	sub_stats: [
		{ attribute: BaseAttribute.DEF, value: 60 },
		{ attribute: CombatAttribute.CritDamage, value: 0.15 },
		{ attribute: BaseAttribute.ATK, value: 30 },
		{ attribute: CombatAttribute.CritRate, value: 0.087 },
		{ attribute: CombatAttribute.EnergyRegen, value: 0.1 }
	],
	image: {
		head: 'T_IconMonsterHead_980_UI.png'
	}
};

export default echo;