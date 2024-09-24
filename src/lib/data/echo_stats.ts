import { type Stat, Attribute } from '$lib/types/stat';

export const get_main_stat_value = (level: number, base: number) => base * (1 + level * 0.16);

export const get_sub_stat_efficiency = (stat: Stat) => {
	const base = SUB_STATS.find(s => s.attribute === stat.attribute);
	if (!base) return null;

	return (stat.value - base.values[0]) / (base.values[base.values.length - 1] - base.values[0]);
}

export const PRIMARY_MAIN_STATS = [
	{
		cost: 1,
		stats: [
			{
				attribute: Attribute.HP_P,
				values: [
					{ quality: 2, base: 0.028, },
					{ quality: 3, base: 0.03, },
					{ quality: 4, base: 0.034, },
					{ quality: 5, base: 0.045, },
				]
			},
			{
				attribute: Attribute.ATK_P,
				values: [
					{ quality: 2, base: 0.022, },
					{ quality: 3, base: 0.024, },
					{ quality: 4, base: 0.027, },
					{ quality: 5, base: 0.036, },
				]
			},
			{
				attribute: Attribute.DEF_P,
				values: [
					{ quality: 2, base: 0.022, },
					{ quality: 3, base: 0.024, },
					{ quality: 4, base: 0.027, },
					{ quality: 5, base: 0.036, },
				]
			},
		],
	},
	{
		cost: 3,
		stats: [
			{
				attribute: Attribute.HP_P,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.ATK_P,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.DEF_P,
				values: [
					{ quality: 2, base: 0.047, },
					{ quality: 3, base: 0.05, },
					{ quality: 4, base: 0.057, },
					{ quality: 5, base: 0.076, },
				]
			},
			{
				attribute: Attribute.GlacioBonus,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.FusionBonus,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.ElectroBonus,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.AeroBonus,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.SpectroBonus,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.HavocBonus,
				values: [
					{ quality: 2, base: 0.037, },
					{ quality: 3, base: 0.04, },
					{ quality: 4, base: 0.045, },
					{ quality: 5, base: 0.06, },
				]
			},
			{
				attribute: Attribute.EnergyRegen,
				values: [
					{ quality: 2, base: 0.0385, },	// approximation
					{ quality: 3, base: 0.05, },
					{ quality: 4, base: 0.057, },
					{ quality: 5, base: 0.076, },
				]
			}
		],
	},
	{
		cost: 4,
		stats: [
			{
				attribute: Attribute.HP_P,
				values: [
					{ quality: 2, base: 0.041, },
					{ quality: 3, base: 0.043, },
					{ quality: 4, base: 0.049, },
					{ quality: 5, base: 0.066, },
				]
			},
			{
				attribute: Attribute.ATK_P,
				values: [
					{ quality: 2, base: 0.041, },
					{ quality: 3, base: 0.043, },
					{ quality: 4, base: 0.049, },
					{ quality: 5, base: 0.066, },
				]
			},
			{
				attribute: Attribute.DEF_P,
				values: [
					{ quality: 2, base: 0.052, },
					{ quality: 3, base: 0.055, },
					{ quality: 4, base: 0.062, },
					{ quality: 5, base: 0.083, },
				]
			},
			{
				attribute: Attribute.CritRate,
				values: [
					{ quality: 2, base: 0.027, },
					{ quality: 3, base: 0.029, },
					{ quality: 4, base: 0.033, },
					{ quality: 5, base: 0.044, },
				]
			},
			{
				attribute: Attribute.CritDamage,
				values: [
					{ quality: 2, base: 0.054, },
					{ quality: 3, base: 0.058, },
					{ quality: 4, base: 0.066, },
					{ quality: 5, base: 0.088, },
				]
			},
			{
				attribute: Attribute.HealingBonus,
				values: [
					{ quality: 2, base: 0.0327, },	// approximation
					{ quality: 3, base: 0.035, },
					{ quality: 4, base: 0.039, },
					{ quality: 5, base: 0.052, },
				]
			},
		],
	},
] as const;

export const SECONDARY_MAIN_STATS = [
	{
		cost: 1,
		stats: [
			{
				attribute: Attribute.HP,
				values: [
					{ quality: 2, base: 114, },
					{ quality: 3, base: 152, },
					{ quality: 4, base: 228, },
					{ quality: 5, base: 456, },
				],
			},
		],
	},
	{
		cost: 3,
		stats: [
			{
				attribute: Attribute.ATK,
				values: [
					{ quality: 2, base: 12, },
					{ quality: 3, base: 13, },
					{ quality: 4, base: 15, },
					{ quality: 5, base: 20, },
				],
			},
		],
	},
	{
		cost: 4,
		stats: [
			{
				attribute: Attribute.ATK,
				values: [
					{ quality: 2, base: 18, },
					{ quality: 3, base: 20, },
					{ quality: 4, base: 22, },
					{ quality: 5, base: 30, },
				],
			},
		],
	},
] as const;

export const SUB_STATS = [
	{
		attribute: Attribute.HP,
		values: [320, 360, 390, 430, 470, 510, 540, 580],
	},
	{
		attribute: Attribute.ATK,
		values: [30, 40, 50, 60, 70],
	},
	{
		attribute: Attribute.DEF,
		values: [30, 40, 50, 60, 70],
	},
	{
		attribute: Attribute.HP_P,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
	},
	{
		attribute: Attribute.ATK_P,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
	},
	{
		attribute: Attribute.DEF_P,
		values: [0.081, 0.09, 0.1, 0.109, 0.118, 0.128, 0.138, 0.147],
	},
	{
		attribute: Attribute.CritRate,
		values: [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105],
	},
	{
		attribute: Attribute.CritDamage,
		values: [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21],
	},
	{
		attribute: Attribute.EnergyRegen,
		values: [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124],
	},
	{
		attribute: Attribute.BasicAttackBonus,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
	},
	{
		attribute: Attribute.HeavyAttackBonus,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
	},
	{
		attribute: Attribute.ResonanceSkillBonus,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
	},
	{
		attribute: Attribute.ResonanceLiberationBonus,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116],
	},
] as const;