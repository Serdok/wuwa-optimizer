import { describe, expect, it } from 'vitest';
import { generate_combinations } from '$lib/optimizer/build';

describe('generate combinations', () => {
	describe('general use cases', () => {
		it('should generate 1 combination for a single-element array with combination size of 1', () => {
			expect(generate_combinations([1], 1)).toStrictEqual([[1]]);
		});

		it('should generate combinations of size 1 with multiple elements', () => {
			expect(generate_combinations([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]]);
		});

		it('should generate combinations of size 2 with multiple elements', () => {
			expect(generate_combinations([1, 2, 3], 2)).toStrictEqual([
				[1, 2],
				[1, 3],
				[2, 3]
			]);
		});

		it('should generate 1 combination of size equal to the input array length', () => {
			expect(generate_combinations([1, 2, 3], 3)).toStrictEqual([[1, 2, 3]]);
		});

		it('should generate all combinations from a large input array with a small combination size', () => {
			expect(generate_combinations([1, 2, 3, 4, 5], 2)).toStrictEqual([
				[1, 2],
				[1, 3],
				[1, 4],
				[1, 5],
				[2, 3],
				[2, 4],
				[2, 5],
				[3, 4],
				[3, 5],
				[4, 5]
			]);
		});
	});

	describe('edge cases', () => {
		it('should generate no combinations from an empty input array', () => {
			expect(generate_combinations([], 2)).toStrictEqual([]);
		});

		it('should generate no combinations when the combination size is greater than the input array length', () => {
			expect(generate_combinations([1, 2, 3], 5)).toStrictEqual([]);
		});

		it('should generate the empty combination when the combination size is 0', () => {
			expect(generate_combinations([], 0)).toStrictEqual([[]]);
			expect(generate_combinations([1, 2, 3], 0)).toStrictEqual([[]]);
		});
	});

	describe('duplicate elements', () => {
		it('should generate combinations including duplicate elements', () => {
			expect(generate_combinations([1, 1, 2], 2)).toStrictEqual([
				[1, 1],
				[1, 2],
				[1, 2]
			]);
		});
	});
});