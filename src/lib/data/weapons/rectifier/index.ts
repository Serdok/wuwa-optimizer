export const RECTIFIERS = {
	luminous_hymn: (await import('./luminous_hymn')).luminous_hymn,
	whispers_of_sirens: (await import('./whispers_of_sirens')).whispers_of_sirens,
} as const;