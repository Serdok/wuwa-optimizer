export const SWORDS = {
	blazing_brilliance: (await import('./blazing_brilliance')).blazing_brilliance,
	emerald_of_genesis: (await import('./emerald_of_genesis')).emerald_of_genesis,
	defiers_thorn: (await import('./defiers_thorn')).defiers_thorn,
} as const;