import { type WeaponData } from '$lib/types/weapon';
import blazing_brilliance from '$lib/data/weapons/blazing_brilliance';
import ages_of_harvest from '$lib/data/weapons/ages_of_harvest';
import verdant_summit from '$lib/data/weapons/verdant_summit';
import veritys_handle from '$lib/data/weapons/veritys_handle';
import stringmaster from '$lib/data/weapons/stringmaster';
import red_spring from '$lib/data/weapons/red_spring';

export const broadswords: Record<string, WeaponData> = {
	ages_of_harvest,
	verdant_summit,
}

export const swords: Record<string, WeaponData> = {
	blazing_brilliance,
	red_spring,
};

export const pistols: Record<string, WeaponData> = {

};

export const gauntlets: Record<string, WeaponData> = {
	veritys_handle,
};

export const rectifiers: Record<string, WeaponData> = {
	stringmaster,
};

export const weapons: Record<string, WeaponData> = {
	...broadswords,
	...swords,
	...pistols,
	...gauntlets,
	...rectifiers,
};