import { type Echo, Sonata } from '$lib/types/echo';

export function generate_combinations<T>(arr: T[], length: number): T[][] {
	// base case: 1 empty combination can be generated with a length of 0
	if (length === 0) return [[]];

	return arr.flatMap((elem, i) => generate_combinations(arr.slice(i + 1), length - 1).map(rest => [elem, ...rest]));
}

export function is_valid_combination(build: Echo[], sonata_filter: { sonata: Sonata, allow_2p: boolean, allow_5p: boolean }[]): boolean {
	// ensure the total weight did not exceed the max weight
	const total_weight = build.reduce((acc, echo) => acc + echo.cost, 0);
	if (total_weight > 12) {
		return false;
	}

	const grouped_by_sonata = build.reduce<{ [sonata in Sonata]?: Echo[] }>((group, echo) => {
		group[echo.sonata] = (group[echo.sonata] || []).concat(echo);
		return group;
	}, {});

	// ensure all names are unique within each set
	const unique_names = Object.values(grouped_by_sonata).every(echoes => echoes.map(echo => echo.name).every((name, index, arr) => arr.indexOf(name) === index));
	if (!unique_names) {
		return false;
	}

	// ensure the combination follows the given sonata filter
	const allowed_sonata = Object.entries(grouped_by_sonata).every(([key, echoes]) => {
		const sonata = key as Sonata;
		const count = echoes.length;

		const filter = sonata_filter.find(s => s.sonata === sonata);
		if (filter) {
			return (filter.allow_2p && count >= 2) || (filter.allow_5p && count >= 5);
		}

		return false;
	})
	return allowed_sonata;
}

export function generate_builds(echoes: Echo[], sonata_filter: { sonata: Sonata, allow_2p: boolean, allow_5p: boolean }[]): Echo[][] {
	return [1, 2, 3, 4, 5]
		.flatMap(length =>  generate_combinations(echoes, length))
		.filter(build => is_valid_combination(build, sonata_filter));
}