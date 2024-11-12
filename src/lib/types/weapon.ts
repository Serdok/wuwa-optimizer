import { type Attribute, BaseAttribute, CombatAttribute, type Stat } from '$lib/types/stat';
import type { OptimizerInput } from '$lib/types/optimizer';

export enum WeaponType {
	Broadsword = 'Broadsword',
	Sword = 'Sword',
	Pistol = 'Pistol',
	Gauntlet = 'Gauntlet',
	Rectifier = 'Rectifier',
}

export const Quality = [1, 2, 3, 4, 5] as const;
export type Quality = typeof Quality[number];

export const Rank = [1, 2, 3, 4, 5] as const;
export type Rank = typeof Rank[number];

export type SwitchBuff = {
	kind: 'switch',
	name: string,
	value: number,
};

export type SliderBuff = {
	kind: 'slider',
	name: string,
	value: number,
	min_value: number,
	max_value: number,
};

export type Conditional = SwitchBuff | SliderBuff;

export type WeaponData = {
	name: string,
	weapon_type: WeaponType,
	quality: Quality,
	base_stats: {
		primary: Stat<BaseAttribute.ATK>,
		secondary: Stat<CombatAttribute>,
	},
	conditionals: Record<string, Conditional>,
	apply_effect: (input: OptimizerInput, stats: Record<Attribute, number>) => undefined
}
