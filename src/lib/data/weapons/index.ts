import blazing_brilliance from '$lib/data/weapons/blazing_brilliance';
import ages_of_harvest from '$lib/data/weapons/ages_of_harvest';
import { type WeaponData } from '$lib/types/weapon';

export const broadswords: Record<string, WeaponData> = {
	ages_of_harvest,
}

export const swords: Record<string, WeaponData> = {
	blazing_brilliance,
};

export const pistols: Record<string, WeaponData> = {

};

export const gauntlets: Record<string, WeaponData> = {

};

export const rectifiers: Record<string, WeaponData> = {

};

export const weapons: Record<string, WeaponData> = {
	...broadswords,
	...swords,
	...pistols,
	...gauntlets,
	...rectifiers,
};