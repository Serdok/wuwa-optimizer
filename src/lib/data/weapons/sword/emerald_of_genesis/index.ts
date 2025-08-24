import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.128, 0.16, 0.192, 0.224, 0.256] as const;
const atk_bonus = [0.06, 0.075, 0.09, 0.105, 0.12] as const;

const init = {
	key: 'emerald_of_genesis',
	weapon_type: 'sword',
	base_stats: {
	  primary: { stat: 'atk', value: 47 },
	  secondary: { stat: 'crit_rate', value: 0.054 }
	}
} as const satisfies WeaponInit;

const buffs = {
	stormy_resolution: { key: 'stormy_resolution', kind: 'slider', min_value: 0, max_value: 2, },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.energy_regen += ranks[rank - 1];
		stats.atk_p += atk_bonus[rank - 1] * buffs.stormy_resolution;
	})
  .build();

export { data as emerald_of_genesis };
