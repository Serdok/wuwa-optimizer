export const PISTOLS = {
	the_last_dance: (await import('./the_last_dance')).the_last_dance,
	static_mist: (await import('./static_mist')).static_mist,
} as const;