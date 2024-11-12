import { z } from 'zod';
import { Sonata } from '$lib/types/echo';

import { characters } from '$lib/data/characters';
import { weapons } from '$lib/data/weapons';

export const schema = z.object({
	character: z.object({
		name: z.string().refine(val => val in characters),
		sequence: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
		conditionals: z.record(z.string(), z.number()),
	}),
	weapon: z.object({
		name: z.string().refine(val => val in weapons),
		rank: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).default(1),
		conditionals: z.record(z.string(), z.number()),
	}),
	selected_sonatas: z.object({
		allow_2p: z.nativeEnum(Sonata).array(),
		allow_5p: z.nativeEnum(Sonata).array()
	}),
})