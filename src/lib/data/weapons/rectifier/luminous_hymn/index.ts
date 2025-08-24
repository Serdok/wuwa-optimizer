import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const normal_bonuses = [0.14, 0.175, 0.21, 0.245, 0.28] as const;

const init = {
	key: 'luminous_hymn',
	weapon_type: 'rectifier',
	base_stats: {
	  primary: { stat: 'atk', value: 40 },
	  secondary: { stat: 'crit_rate', value: 0.08 }
	}
} as const satisfies WeaponInit;

const buffs = {
	homebuilder_s_anthem: { key: 'homebuilder_s_anthem', kind: 'slider', min_value: 0, max_value: 3 },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.atk_p += ranks[rank - 1];
		stats.basic_bonus += normal_bonuses[rank - 1] * buffs.homebuilder_s_anthem;
		stats.heavy_bonus += normal_bonuses[rank - 1] * buffs.homebuilder_s_anthem;
	})
  .build();

export { data as luminous_hymn };
