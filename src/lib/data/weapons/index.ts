import { BROADSWORDS } from '$lib/data/weapons/broadsword';
import { SWORDS } from '$lib/data/weapons/sword';
import { PISTOLS } from '$lib/data/weapons/pistol';
import { GAUNTLETS } from '$lib/data/weapons/gauntlet';
import { RECTIFIERS } from '$lib/data/weapons/rectifier';

export const WEAPONS = {
	broadsword: BROADSWORDS,
	sword: SWORDS,
	pistol: PISTOLS,
	gauntlet: GAUNTLETS,
	rectifier: RECTIFIERS,
} as const;
