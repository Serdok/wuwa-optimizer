import { Class, type Echo, Sonata } from '$lib/types/echo';
import { BaseAttribute, CombatAttribute } from '$lib/types/stat';

const echo: Echo = {
	name: 'Inferno Rider',
	level: 25,
	sonata: Sonata.MoltenRift,
	quality: 5,
	cost: 4,
	class: Class.Overlord,
	main_stat: {
		primary: { attribute: BaseAttribute.ATK, value: 150 },
		secondary: { attribute: CombatAttribute.CritDamage, value: 0.44 }
	},
	sub_stats: [
		{ attribute: CombatAttribute.DEF_P, value: 0.138 },
		{ attribute: BaseAttribute.DEF, value: 50 },
		{ attribute: CombatAttribute.CritRate, value: 0.081 },
		{ attribute: CombatAttribute.EnergyRegen, value: 0.108 },
		{ attribute: CombatAttribute.CritDamage, value: 0.162 }
	]
};

export default echo;