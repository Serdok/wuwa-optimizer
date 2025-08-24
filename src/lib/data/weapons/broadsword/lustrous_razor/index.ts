import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.128, 0.16, 0.192, 0.224, 0.256] as const;
const skill_bonuses = [0.07, 0.0875, 0.105, 0.1225, 0.14] as const;

const init = {
	key: 'lustrous_razor',
	weapon_type: 'broadsword',
	base_stats: {
	  primary: { stat: 'atk', value: 47 },
	  secondary: { stat: 'atk_p', value: 0.081 }
	}
} as const satisfies WeaponInit;

const buffs = {
	stormy_resolution: { key: 'stormy_resolution', kind: 'slider', min_value: 0, max_value: 3, },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.energy_regen += ranks[rank - 1];
		if (buffs.stormy_resolution) stats.skill_bonus += skill_bonuses[rank - 1];
	})
  .build();

export { data as lustrous_razor };
