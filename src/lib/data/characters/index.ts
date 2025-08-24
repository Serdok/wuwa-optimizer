export const CHARACTERS = {
	// 1.1
	jinhsi: (await import('./jinhsi')).jinhsi,
	changli: (await import('./changli')).changli,
	// 2.0
	carlotta: (await import('./carlotta')).carlotta,
	// 2.1
	phoebe: (await import('./phoebe')).phoebe,
	// 2.2
	cantarella: (await import('./cantarella')).cantarella,
	// 2.3
	zani: (await import('./zani')).zani,
	// 2.4
	cartethyia: (await import('./cartethyia')).cartethyia,
} as const;
