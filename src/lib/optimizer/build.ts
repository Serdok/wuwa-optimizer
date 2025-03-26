import type { Echo } from '$lib/data/echoes/types';
import type { EchoFilter } from '$lib/optimizer/index';
import type { SonataKey } from '$lib/data/sonatas';
import type { StatKey } from '$lib/data/stats';

export function combination_count<T>(arr: T[], length: number) {
	if (length > arr.length) { return 0; }

	let count = 1;
	for (let i = 0; i < length; i += 1) {
		count *= (arr.length - i) / (i + 1);
	}
	return count;
}

// export function generate_combinations<T>(arr: T[], length: number): T[][] {
// 	// base case: 1 empty combination can be generated with a length of 0
// 	if (length === 0) return [[]];
//
// 	return arr.flatMap((elem, i) => generate_combinations(arr.slice(i + 1), length - 1).map(rest => [elem, ...rest]));
// }

export function* generate_combinations<T>(arr: T[], length: number) {
	const indices = Array.from({ length }, (_, i) => i);
	while (true) {
		yield [...indices.map(i => arr[i])];

		let i = length - 1;
		while (i >= 0 && indices[i] === arr.length - length + i) {
			i -= 1;
		}
		if (i < 0) break;

		indices[i] += 1;
		for (let j = i + 1; j < length; j += 1) {
			indices[j] = indices[j - 1] + 1;
		}
	}
}

export function* generate_permutations<T>(items: T[], max_size: number, current: T[]): Generator<T[]> {
	if (current.length === max_size) {
		yield current;
	}

	if (current.length >= max_size) return;

	for (let i = 0; i < items.length; i += 1) {
		const next = [...current, items[i]];
		const remaining = items.filter((_, idx) => idx !== i);

		yield* generate_permutations(remaining, max_size, next);
	}
}

export function is_valid_combination(build: Echo[], filter: EchoFilter): boolean {
	// ensure the total weight did not exceed the max weight (12)
	const total_weight = build.reduce<number>((weight, echo) => weight + echo.cost, 0);
	if (total_weight > 12) {
		return false;
	}

	// ensure build main stats follows the filter
	const is_main_valid = (cost: number, stat: StatKey) => filter.allowed_primary_stats[cost].includes(stat) || false;
	const main_stats_valid = build.some(e => is_main_valid(e.cost, e.primary_stat.stat));
	if (!main_stats_valid) {
		return false;
	}

	// ensure the combination follows the given filter array
	const sets_count = Object.groupBy(build, e => e.sonata);

	const filter_validator = (sonata: SonataKey, count: number) => {
		return filter.allow_rainbow || (filter.allowed_2p.includes(sonata) && count >= 2) || (filter.allowed_5p.includes(sonata) && count == 5);
	}
	if (!Object.entries(sets_count).every(([key, echoes]) => { return filter_validator(key as SonataKey, echoes.length); })) {
		return false;
	}

	// ensure all names are unique within each set
	const sonatas = [...filter.allowed_2p, ...filter.allowed_5p.filter(set => !filter.allowed_2p.includes(set))];
	const sets = Object.fromEntries(sonatas.map(sonata => [sonata, build.filter(e => e.sonata === sonata)]));
	const unique_names_in_sets = Object.values(sets).map(set => set.every((echo, idx, self) => self.findIndex(e => e.key === echo.key) === idx));
	if (unique_names_in_sets.some(v => !v)) {
		// at least one set does not have a unique name combination
		return false;
	}

	return true;
}

