export const BROADSWORDS = {
	ages_of_harvest: (await import('./ages_of_harvest')).ages_of_harvest,
	lustrous_razor: (await import('./lustrous_razor')).lustrous_razor,
} as const;