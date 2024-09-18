import type { UUID } from '$lib/types/common';
import type { Stat } from '$lib/types/stat';

export enum WeaponType {
	BroadSword = 'Broadsword',
	Sword = 'Sword',
	Pistol = 'Pistol',
	Gauntlet = 'Gauntlet',
	Rectifier = 'Rectifier',
}

export const WeaponQuality = [5, 4, 3, 2, 1] as const;
export type WeaponQuality = typeof WeaponQuality[number];

export const WeaponLevel = [
	{ key: '1/20', ascension: 0, level: 1, },
	{ key: '20/20', ascension: 0, level: 20, },
	{ key: '20/40', ascension: 1, level: 20, },
	{ key: '40/40', ascension: 1, level: 40, },
	{ key: '40/50', ascension: 2, level: 40, },
	{ key: '50/50', ascension: 2, level: 50, },
	{ key: '50/60', ascension: 3, level: 50, },
	{ key: '60/60', ascension: 3, level: 60, },
	{ key: '60/70', ascension: 4, level: 60, },
	{ key: '70/70', ascension: 4, level: 70, },
	{ key: '70/80', ascension: 5, level: 70, },
	{ key: '80/80', ascension: 5, level: 80, },
	{ key: '80/90', ascension: 6, level: 80, },
	{ key: '90/90', ascension: 6, level: 90, },
] as const;
export type WeaponLevel = typeof WeaponLevel[number]['key'];

export type WeaponMetadata = {
	name: string,
	quality: WeaponQuality,
	type: WeaponType,
	main_stat: {
		primary: Stat,
		secondary: Stat,
	},
	icon: string,
}

export type Weapon = {
	id: UUID,
	name: string,
	level: WeaponLevel,
	main_stat: {
		primary: Stat,
		secondary: Stat,
	}
};

