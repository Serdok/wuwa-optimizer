import { Attribute, type Stat } from '$lib/types/stat';
import type { CharacterStat } from '$lib/types/character';

export enum WeaponType {
	BroadSword = 'Broadsword',
	Sword = 'Sword',
	Pistol = 'Pistol',
	Gauntlet = 'Gauntlet',
	Rectifier = 'Rectifier',
}

export const WeaponQuality = [5, 4, 3, 2, 1] as const;
export type WeaponQuality = typeof WeaponQuality[number];

export const WeaponSyntonize = [1, 2, 3, 4, 5] as const;
export type WeaponSyntonize = typeof WeaponSyntonize[number];

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

export type WeaponStackMetadata = {
	name: string,
	default_value: number,
	max_stacks?: number,
};

export type WeaponStack = {
	name: string,
	default_value: number,
	value: number,
	max_stacks?: number,
};

export type WeaponConditional = {
	name: string,
	condition: (weapon: Weapon) => boolean,
	pre_compute: (weapon: Weapon, stats: CharacterStat) => CharacterStat,
}

export type WeaponMetadata = {
	game_id: number,
	name: string,
	quality: WeaponQuality,
	weapon_type: WeaponType,
	main_stat: {
		primary: { attribute: Attribute.HP | Attribute.ATK | Attribute.DEF, value: number },
		secondary: Stat,
	},
	stacks: { [key in string]: WeaponStackMetadata },
	conditionals: WeaponConditional[],
	image: string,
}

export type Weapon = {
	game_id: number,
	name: string,
	quality: WeaponQuality,
	weapon_type: WeaponType,
	syntonize: WeaponSyntonize,
	main_stat: {
		primary: { attribute: Attribute.HP | Attribute.ATK | Attribute.DEF, value: number },
		secondary: Stat,
	},
	stacks: { [key in string]: (WeaponStackMetadata & { value: number, }) },
	conditionals: WeaponConditional[],
	image: string,
};

