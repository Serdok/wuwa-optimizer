import type { BaseStatKey, StatValue } from '$lib/data/stats';
import type { Buff, GameplayEffect } from '$lib/data/optimizer';

import { SWORDS } from './swords';
import { BROADSWORDS } from './broadswords';
import { PISTOLS } from './pistols';
import { GAUNTLETS } from './gauntlets';
import { RECTIFIERS } from './rectifier';

export const WEAPON_TYPES = ['broadsword', 'sword', 'pistol', 'gauntlet', 'rectifier'] as const;
export type WeaponKey = typeof WEAPON_TYPES[number];

export const WEAPONS: Record<WeaponKey, Record<string, WeaponData>> = {
	broadsword: BROADSWORDS,
	sword: SWORDS,
	pistol: PISTOLS,
	gauntlet: GAUNTLETS,
	rectifier: RECTIFIERS,
};

export type WeaponData = GameplayEffect & {
	key: string,
	weapon_type: WeaponKey,
	base_stats: {
		primary: StatValue<BaseStatKey>,
		secondary: StatValue,
	},
	buffs: { [key: string]: Buff },
};
