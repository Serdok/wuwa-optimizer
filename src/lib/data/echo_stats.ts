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
					{ quality: 2, base: 2.8, },
					{ quality: 3, base: 3, },
					{ quality: 4, base: 3.4, },
					{ quality: 5, base: 4.5, },
				]
			},
			{
				attribute: Attribute.ATK_P,
				values: [
					{ quality: 2, base: 2.2, },
					{ quality: 3, base: 2.4, },
					{ quality: 4, base: 2.7, },
					{ quality: 5, base: 3.6, },
				]
			},
			{
				attribute: Attribute.DEF_P,
				values: [
					{ quality: 2, base: 2.2, },
					{ quality: 3, base: 2.4, },
					{ quality: 4, base: 2.7, },
					{ quality: 5, base: 3.6, },
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
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.ATK_P,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.DEF_P,
				values: [
					{ quality: 2, base: 4.7, },
					{ quality: 3, base: 5, },
					{ quality: 4, base: 5.7, },
					{ quality: 5, base: 7.6, },
				]
			},
			{
				attribute: Attribute.GlacioBonus,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.FusionBonus,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.ElectroBonus,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.AeroBonus,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.SpectroBonus,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.HavocBonus,
				values: [
					{ quality: 2, base: 3.7, },
					{ quality: 3, base: 4, },
					{ quality: 4, base: 4.5, },
					{ quality: 5, base: 6, },
				]
			},
			{
				attribute: Attribute.EnergyRegen,
				values: [
					{ quality: 2, base: 3.85, },	// approximation
					{ quality: 3, base: 5, },
					{ quality: 4, base: 5.7, },
					{ quality: 5, base: 7.6, },
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
					{ quality: 2, base: 4.1, },
					{ quality: 3, base: 4.3, },
					{ quality: 4, base: 4.9, },
					{ quality: 5, base: 6.6, },
				]
			},
			{
				attribute: Attribute.ATK_P,
				values: [
					{ quality: 2, base: 4.1, },
					{ quality: 3, base: 4.3, },
					{ quality: 4, base: 4.9, },
					{ quality: 5, base: 6.6, },
				]
			},
			{
				attribute: Attribute.DEF_P,
				values: [
					{ quality: 2, base: 5.2, },
					{ quality: 3, base: 5.5, },
					{ quality: 4, base: 6.2, },
					{ quality: 5, base: 8.3, },
				]
			},
			{
				attribute: Attribute.CritRate,
				values: [
					{ quality: 2, base: 2.7, },
					{ quality: 3, base: 2.9, },
					{ quality: 4, base: 3.3, },
					{ quality: 5, base: 4.4, },
				]
			},
			{
				attribute: Attribute.CritDamage,
				values: [
					{ quality: 2, base: 5.4, },
					{ quality: 3, base: 5.8, },
					{ quality: 4, base: 6.6, },
					{ quality: 5, base: 8.8, },
				]
			},
			{
				attribute: Attribute.HealingBonus,
				values: [
					{ quality: 2, base: 3.27, },	// approximation
					{ quality: 3, base: 3.5, },
					{ quality: 4, base: 3.9, },
					{ quality: 5, base: 5.2, },
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
		values: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	},
	{
		attribute: Attribute.ATK_P,
		values: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	},
	{
		attribute: Attribute.DEF_P,
		values: [8.1, 9, 10, 10.9, 11.8, 12.8, 13.8, 14.7],
	},
	{
		attribute: Attribute.CritRate,
		values: [6.3, 6.9, 7.5, 8.1, 8.7, 9.3, 9.9, 10.5],
	},
	{
		attribute: Attribute.CritDamage,
		values: [12.6, 13.8, 15, 16.2, 17.4, 18.6, 19.8, 21],
	},
	{
		attribute: Attribute.EnergyRegen,
		values: [6.8, 7.6, 8.4, 9.2, 10, 10.8, 11.6, 12.4],
	},
	{
		attribute: Attribute.BasicAttackBonus,
		values: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	},
	{
		attribute: Attribute.HeavyAttackBonus,
		values: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	},
	{
		attribute: Attribute.ResonanceSkillBonus,
		values: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	},
	{
		attribute: Attribute.ResonanceLiberationBonus,
		values: [6.4, 7.1, 7.9, 8.6, 9.4, 10.1, 10.9, 11.6],
	},
] as const;