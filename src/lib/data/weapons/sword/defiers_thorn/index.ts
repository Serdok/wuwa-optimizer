import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const def_ignore = [0.08, 0.1, 0.12, 0.14, 0.16] as const;
const enemy_dmg_amp = [0.2, 0.25, 0.3, 0.35, 0.4] as const;

const init = {
	key: 'defiers_thorn',
	weapon_type: 'sword',
	base_stats: {
	  primary: { stat: 'atk', value: 33 },
	  secondary: { stat: 'hp_p', value: 0.161 }
	}
} as const satisfies WeaponInit;

const buffs = {
	a_free_knights_tarantella: { key: 'a_free_knights_tarantella', kind: 'slider', min_value: 0, max_value: 2 },
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.hp_p += ranks[rank - 1];
		if (buffs.a_free_knights_tarantella) {
			stats.enemy_def_ignore += def_ignore[rank - 1];
			stats.enemy_damage_vulnerability += enemy_dmg_amp[rank - 1];
		}
	})
  .build();

export { data as defiers_thorn };
