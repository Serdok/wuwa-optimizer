import { type SonataFilter } from '$lib/types/optimizer';
import { type Echo, Sonata } from '$lib/types/echo';

export function generate_combinations<T>(arr: T[], length: number): T[][] {
	// base case: 1 empty combination can be generated with a length of 0
	if (length === 0) return [[]];

	return arr.flatMap((elem, i) => generate_combinations(arr.slice(i + 1), length - 1).map(rest => [elem, ...rest]));
}

export function is_valid_combination(build: Echo[], filter: SonataFilter): boolean {
	// ensure the total weight did not exceed the max weight (12)
	const total_weight = build.reduce<number>((weight, echo) => weight + echo.cost, 0);
	if (total_weight > 12) {
		return false;
	}

	// ensure the combination follows the given filter array
	const sets_count = build.reduce<{ [s in Sonata]?: number }>((sets, echo) => {
		sets[echo.sonata] = (sets[echo.sonata] || 0) + 1;
		return sets;
	}, {});

	const filter_validator = (sonata: Sonata, count: number) => {
		return filter.allow_2p.includes(sonata) && count >= 2 || filter.allow_5p.includes(sonata) && count == 5;
	}
	if (!Object.entries(sets_count).every(([key, count]) => { return filter_validator(key as Sonata, count); })) {
		return false;
	}

	// ensure all names are unique within each set
	const sonatas = [...filter.allow_2p, ...filter.allow_5p.filter(set => !filter.allow_2p.includes(set))];
	const sets = Object.fromEntries(sonatas.map(sonata => [sonata, build.filter(e => e.sonata === sonata)]));
	const unique_names_in_sets = Object.values(sets).map(set => set.every((echo, idx, self) => self.findIndex(e => e.name === echo.name) === idx));
	if (unique_names_in_sets.some(v => !v)) {
		// at least one set does not have a unique name combination
		return false;
	}

	return true;
}

export function generate_builds(echoes: Echo[], filter: SonataFilter): Echo[][] {
	return [1, 2, 3, 4, 5]
		.flatMap(length => generate_combinations(echoes, length))
		.filter(build => is_valid_combination(build, filter));
	// todo: add all permutations
}
