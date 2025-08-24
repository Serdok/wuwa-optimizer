import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const skill_bonus = [0.48, 0.60, 0.72, 0.84, 0.96] as const;

const init = {
	key: 'the_last_dance',
	weapon_type: 'pistol',
	base_stats: {
	  primary: { stat: 'atk', value: 40 },
	  secondary: { stat: 'crit_dmg', value: 0.16 }
	}
} as const satisfies WeaponInit;

const buffs = {
	silent_eulogy: { key: 'silent_eulogy', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.atk_p += ranks[rank - 1];
		if (buffs.silent_eulogy) stats.skill_bonus += skill_bonus[rank - 1];
	})
  .build();

export { data as the_last_dance };
