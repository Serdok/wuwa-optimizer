import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.128, 0.16, 0.192, 0.224, 0.256] as const;
const attack_bonus = [0.10, 0.125, 0.15, 0.175, 0.2] as const;

const init = {
	key: 'static_mist',
	weapon_type: 'pistol',
	base_stats: {
	  primary: { stat: 'atk', value: 47 },
	  secondary: { stat: 'crit_rate', value: 0.054 }
	}
} as const satisfies WeaponInit;

const buffs = {
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { rank }) => {
		stats.energy_regen += ranks[rank - 1];
		// todo: next character +atk% buff on outro
	})
  .build();

export { data as static_mist };
