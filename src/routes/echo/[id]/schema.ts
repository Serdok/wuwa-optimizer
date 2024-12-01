import { z } from 'zod';

import { Sonata } from '$lib/types/echo';
import { all_echoes } from '$lib/data/echoes';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

export const schema = z.object({
	echo: z.object({
		name: z.string().refine(val => all_echoes.find(e => e.name === val)),
		quality: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).default(5),
		level: z.number().min(0).max(25),
		sonata: z.nativeEnum(Sonata),
		main_stat: z.object({
			primary: z.object({ attribute: z.nativeEnum(BaseAttribute), value: z.number() }),
			secondary: z.object({
				attribute: z.union([z.nativeEnum(CombatAttribute), z.nativeEnum(ElementDMGBonus)]).default(CombatAttribute.HP_P),
				value: z.number()
			}),
		}),
		sub_stats: z.object({
			attribute: z.union([z.nativeEnum(BaseAttribute), z.nativeEnum(CombatAttribute), z.nativeEnum(ElementDMGBonus), z.nativeEnum(AttackDMGBonus)]),
			value: z.number()
		}).array().max(5),
	})
})