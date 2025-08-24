import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const basic_bonuses = [0.4, 0.5, 0.6, 0.7, 0.8] as const;
const res_bonuses = [0.12, 0.15, 0.18, 0.21, 0.24] as const;

const init = {
	key: 'whispers_of_sirens',
	weapon_type: 'rectifier',
	base_stats: {
	  primary: { stat: 'atk', value: 40 },
	  secondary: { stat: 'crit_dmg', value: 0.16 }
	}
} as const satisfies WeaponInit;

const buffs = {
	from_the_deep: { key: 'from_the_deep', kind: 'slider', min_value: 0, max_value: 2 },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.atk_p += ranks[rank - 1];
		if (buffs.from_the_deep >= 1) stats.basic_bonus += basic_bonuses[rank - 1];
		if (buffs.from_the_deep >= 2) stats.enemy_resistance -= res_bonuses[rank - 1];
	})
  .build();

export { data as whispers_of_sirens };
