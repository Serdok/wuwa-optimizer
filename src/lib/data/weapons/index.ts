export const WEAPONS = {
	broadsword: (await import('./broadsword')).BROADSWORDS,
	sword: (await import('./sword')).SWORDS,
	pistol: (await import('./pistol')).PISTOLS,
	gauntlet: (await import('./gauntlet')).GAUNTLETS,
	rectifier: (await import('./rectifier')).RECTIFIERS,
} as const;
