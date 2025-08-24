import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const skill_bonus = [0.04, 0.05, 0.06, 0.07, 0.08] as const;

const init = {
	key: 'blazing_brilliance',
	weapon_type: 'sword',
	base_stats: {
	  primary: { stat: 'atk', value: 47 },
	  secondary: { stat: 'crit_dmg', value: 0.108 }
	}
} as const satisfies WeaponInit;

const buffs = {
	searing_feather: { key: 'searing_feather', kind: 'slider', min_value: 0, max_value: 14 },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.atk_p += ranks[rank - 1];
		stats.skill_bonus += skill_bonus[rank - 1] * buffs.searing_feather;
	})
  .build();

export { data as blazing_brilliance };
