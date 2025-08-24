import type { Schema } from '$lib/utils';
import { STAT_ICONS } from '$lib/data/stats/display';

export const BASE_STATS = ['hp', 'atk', 'def'] as const;
export type BaseStatType = typeof BASE_STATS[number];

export const COMBAT_STATS = ['hp_p', 'atk_p', 'def_p', 'crit_rate', 'crit_dmg', 'energy_regen', 'healing_bonus'] as const;
export type CombatStatType = typeof COMBAT_STATS[number];

export const MOTION_BONUS = ['basic_bonus', 'heavy_bonus', 'skill_bonus', 'burst_bonus', 'intro_bonus', 'outro_bonus'] as const;
export type MotionBonusStatType = typeof MOTION_BONUS[number];

export const ELEMENT_BONUS = ['general_bonus', 'physical_bonus', 'glacio_bonus', 'fusion_bonus', 'electro_bonus', 'aero_bonus', 'spectro_bonus', 'havoc_bonus', 'aero_erosion_bonus', 'electro_flare_bonus', 'glacio_chafe_bonus', 'fusion_burst_bonus', 'spectro_frazzle_bonus', 'havoc_bane_bonus',] as const;
export type ElementBonusStatType = typeof ELEMENT_BONUS[number];

export const MOTION_AMPLIFY = ['basic_amplify', 'heavy_amplify', 'skill_amplify', 'burst_amplify', 'intro_amplify', 'outro_amplify'] as const;
export type MotionAmplifyStatType = typeof MOTION_AMPLIFY[number];

export const ELEMENT_AMPLIFY = ['general_amplify', 'physical_amplify', 'glacio_amplify', 'fusion_amplify', 'electro_amplify', 'aero_amplify', 'spectro_amplify', 'havoc_amplify', 'aero_erosion_amplify', 'electro_flare_amplify', 'glacio_chafe_amplify', 'fusion_burst_amplify', 'spectro_frazzle_amplify', 'havoc_bane_amplify',] as const;
export type ElementAmplifyStatType = typeof ELEMENT_AMPLIFY[number];

export const SPECIAL_STATS = ['coordinated_attack', 'echo_skill'] as const;
export type SpecialStatType = typeof SPECIAL_STATS[number];

export const EXTRA_STATS = ['skill_multiplier'] as const;
export type ExtraStatType = typeof EXTRA_STATS[number];

export const ENEMY_STATS = ['enemy_level', 'enemy_resistance', 'enemy_damage_vulnerability', 'enemy_def_ignore'] as const;
export type EnemyStatType = typeof ENEMY_STATS[number];

export const STATS = [...BASE_STATS, ...COMBAT_STATS, ...MOTION_BONUS, ...ELEMENT_BONUS, ...MOTION_AMPLIFY, ...ELEMENT_AMPLIFY, ...SPECIAL_STATS, ...EXTRA_STATS, ...ENEMY_STATS] as const;
export type StatType = typeof STATS[number];

export type StatDef<T extends StatType> = { stat: T, value: number, };
export type StatSchema<T extends StatType> = Schema<StatDef<T>, 'stat'>;
export type StatResult<T extends StatType> = Record<T, number>;

export type DisplayStats = keyof typeof STAT_ICONS;