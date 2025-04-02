export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

export function combination_count<T>(arr: T[], length: number) {
	if (length > arr.length) { return 0; }

	let count = 1;
	for (let i = 0; i < length; i += 1) {
		count *= (arr.length - i) / (i + 1);
	}
	return count;
}

export function* generate_combinations<T>(arr: T[], length: number, start_index: number = 0, current: T[] = []): Generator<T[]> {
	if (current.length === length) {
		yield [...current];
		return;
	}

	if (arr.length - start_index < length - current.length) {
		// not enough elements left to generate a combination
		return;
	}

	for (let i = start_index; i < arr.length; i += 1) {
		current.push(arr[i]);
		yield* generate_combinations(arr, length, i + 1, current);
		current.pop();
	}
}

export function* generate_permutations<T>(items: T[], max_size: number, current: T[]): Generator<T[]> {
	if (current.length === max_size) {
		yield [...current];
	}

	if (current.length >= max_size) return;

	for (let i = 0; i < items.length; i += 1) {
		const next = [...current, items[i]];
		const remaining = items.filter((_, idx) => idx !== i);

		yield* generate_permutations(remaining, max_size, next);
	}
}