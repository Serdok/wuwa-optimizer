import type { ElementKey } from '$lib/data/elements';
import type { AttackKey } from '$lib/data/characters';

export const BASE_STATS = ['hp', 'atk', 'def'] as const;
export type BaseStatKey = typeof BASE_STATS[number];

export const COMBAT_STATS = ['hp_p', 'atk_p', 'def_p', 'crit_rate', 'crit_dmg', 'energy_regen', 'healing_bonus'] as const;
export type CombatStatKey = typeof COMBAT_STATS[number];

export const ATTACK_BONUS = ['basic_bonus', 'heavy_bonus', 'skill_bonus', 'burst_bonus', 'intro_bonus', 'outro_bonus'] as const;
export type AttackBonusKey = typeof ATTACK_BONUS[number];
export type AsAttackBonusKey<T extends AttackKey> = `${T}_bonus` extends AttackBonusKey ? `${T}_bonus` : never;

export const ELEMENT_BONUS = [
	'general_bonus',
	'physical_bonus',
	'glacio_bonus',
	'fusion_bonus',
	'electro_bonus',
	'aero_bonus',
	'spectro_bonus',
	'havoc_bonus',
	'aero_erosion_bonus',
	'electro_flare_bonus',
	'glacio_chafe_bonus',
	'fusion_burst_bonus',
	'spectro_frazzle_bonus',
	'havoc_bane_bonus',
] as const;
export type ElementBonusKey = typeof ELEMENT_BONUS[number];
export type AsElementBonusKey<T extends ElementKey> = `${T}_bonus` extends ElementBonusKey ? `${T}_bonus` : never;

export const ATTACK_AMPLIFY = ['basic_amplify', 'heavy_amplify', 'skill_amplify', 'burst_amplify', 'intro_amplify', 'outro_amplify'] as const;
export type AttackAmplifyKey = typeof ATTACK_BONUS[number];
export type AsAttackAmplifyKey<T extends AttackKey> = `${T}_amplify` extends AttackAmplifyKey ? `${T}_amplify` : never;

export const ELEMENT_AMPLIFY = [
	'general_amplify',
	'physical_amplify',
	'glacio_amplify',
	'fusion_amplify',
	'electro_amplify',
	'aero_amplify',
	'spectro_amplify',
	'havoc_amplify',
	'aero_erosion_amplify',
	'electro_flare_amplify',
	'glacio_chafe_amplify',
	'fusion_burst_amplify',
	'spectro_frazzle_amplify',
	'havoc_bane_amplify',
] as const;
export type ElementAmplifyKey = typeof ELEMENT_AMPLIFY[number];
export type AsElementAmplifyKey<T extends ElementKey> = `${T}_amplify` extends ElementAmplifyKey ? `${T}_amplify` : never;

export const EXTRA_STATS = ['coordinated_attack', 'skill_multiplier', 'enemy_level', 'enemy_resistance', 'enemy_def_ignore'] as const;
export type ExtraStatKey = typeof EXTRA_STATS[number];

export const STATS = [...BASE_STATS, ...COMBAT_STATS, ...ATTACK_BONUS, ...ELEMENT_BONUS, ...ATTACK_AMPLIFY, ...ELEMENT_AMPLIFY, ...EXTRA_STATS, ] as const;
export type StatKey = typeof STATS[number];
export type AsStatPercentage<T extends BaseStatKey> = `${T}_p` extends StatKey ? `${T}_p` : never;

export type StatValue<T extends StatKey = StatKey> = { stat: T, value: number, };
export type StatValueMap<T extends StatKey = StatKey> = { [K in T]: StatValue<K> };

import STAT_ICONS from './display';
export { STAT_ICONS };