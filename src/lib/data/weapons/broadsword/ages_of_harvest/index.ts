import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const skill_bonuses = [0.24, 0.3, 0.36, 0.42, 0.48] as const;

const init = {
	key: 'ages_of_harvest',
	weapon_type: 'broadsword',
	base_stats: {
	  primary: { stat: 'atk', value: 47 },
	  secondary: { stat: 'crit_rate', value: 0.054 }
	}
} as const satisfies WeaponInit;

const buffs = {
	ageless_marking: { key: 'ageless_marking', kind: 'toggle' },
	ethereal_endowment: { key: 'ethereal_endowment', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.general_bonus += ranks[rank - 1];
		if (buffs.ageless_marking) stats.skill_bonus += skill_bonuses[rank - 1];
		if (buffs.ethereal_endowment) stats.skill_bonus += skill_bonuses[rank - 1];
	})
  .build();

export { data as ages_of_harvest };
