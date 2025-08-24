import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'sword_to_mark_tides_trace_dmg',
		type: 'intro',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0208, 0.0208, 0.0208, 0.0624]
	},
	{
		key: 'sword_to_call_for_freedom_dmg',
		type: 'intro',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0428, 0.0997]
	}
] as const satisfies MotionDef[];

export { data as intro };
