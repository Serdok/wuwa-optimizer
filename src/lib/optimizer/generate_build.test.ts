import { describe, expect, it } from 'vitest';
import { type Echo, EchoClass, Sonata } from '$lib/types/echo';
import { generate_combinations, is_valid_combination } from '$lib/optimizer/generate_build';
import { Attribute } from '$lib/types/stat';
import MOCK_ECHOES from './MOCK_ECHOES.json' with { type: 'json' };
const MOCK = MOCK_ECHOES as Echo[];

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

describe('validate combination constraints', () => {
	describe('general use cases', () => {
		it('should return false if the total cost exceeds 12', () => {
			const build: Echo[] = [
				{
					id: '4a428f61-a88d-4b7e-bdcc-3af660df05ab',
					name: 'Fusion Dreadmane',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Common,
					cost: 1,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.ATK_P, value: 18 },
						secondary: { attribute: Attribute.HP, value: 2280 }
					},
					sub_stats: [
						{ attribute: Attribute.DEF, value: 60 },
						{ attribute: Attribute.CritDamage, value: 15 },
						{ attribute: Attribute.ATK, value: 30 },
						{ attribute: Attribute.CritRate, value: 8.7 },
						{ attribute: Attribute.EnergyRegen, value: 10 }
					],
					equipped_by: null
				},
				{
					id: 'be20755b-1ad0-4024-9a03-611aba7e6900',
					name: 'Viridblaze Saurian',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Elite,
					cost: 3,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.ATK_P, value: 18 },
						secondary: { attribute: Attribute.HP, value: 2280 }
					},
					sub_stats: [
						{ attribute: Attribute.CritDamage, value: 15 },
						{ attribute: Attribute.HP, value: 430 },
						{ attribute: Attribute.CritRate, value: 7.5 },
						{ attribute: Attribute.ResonanceLiberationBonus, value: 8.6 },
						{ attribute: Attribute.DEF_P, value: 10.9 }
					],
					equipped_by: null
				},
				{
					id: 'e636a200-7aa6-4951-905b-a3539c85746d',
					name: 'Havoc Dreadmane',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Elite,
					cost: 3,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.FusionBonus, value: 30 },
						secondary: { attribute: Attribute.ATK, value: 100 }
					},
					sub_stats: [
						{ attribute: Attribute.CritDamage, value: 21 },
						{ attribute: Attribute.ResonanceLiberationBonus, value: 10.9 },
						{ attribute: Attribute.ATK, value: 40 },
						{ attribute: Attribute.HP_P, value: 8.6 },
						{ attribute: Attribute.CritRate, value: 6.9 }
					],
					equipped_by: null
				},
				{
					id: '9d4e0c02-4962-4907-b252-ea195da27c29',
					name: 'Violet-Feathered Heron',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Elite,
					cost: 3,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.ATK_P, value: 30 },
						secondary: { attribute: Attribute.ATK, value: 100 }
					},
					sub_stats: [
						{ attribute: Attribute.CritRate, value: 7.5 },
						{ attribute: Attribute.ATK_P, value: 7.1 },
						{ attribute: Attribute.CritDamage, value: 17.4 },
						{ attribute: Attribute.HP_P, value: 9.4 },
						{ attribute: Attribute.HeavyAttackBonus, value: 7.9 }
					],
					equipped_by: null
				},
				{
					id: '89ea59ce-9182-4ceb-b640-04472199192c',
					name: 'Inferno Rider',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Overlord,
					cost: 4,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.CritDamage, value: 44 },
						secondary: { attribute: Attribute.ATK, value: 150 }
					},
					sub_stats: [
						{ attribute: Attribute.CritDamage, value: 15 },
						{ attribute: Attribute.HP_P, value: 10.1 },
						{ attribute: Attribute.DEF, value: 60 },
						{ attribute: Attribute.CritRate, value: 6.9 },
						{ attribute: Attribute.ResonanceLiberationBonus, value: 9.4 }
					],
					equipped_by: null
				}
			];

			expect(is_valid_combination(build, [])).toBe(false);
		});

		it('should return false if names are not unique within the same sonata', () => {
			const build: Echo[] = [
				{
					id: 'be20755b-1ad0-4024-9a03-611aba7e6900',
					name: 'Fusion Warrior',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Common,
					cost: 1,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.ATK_P, value: 18 },
						secondary: { attribute: Attribute.HP, value: 2280 }
					},
					sub_stats: [
						{ attribute: Attribute.CritDamage, value: 15 },
						{ attribute: Attribute.HP, value: 430 },
						{ attribute: Attribute.CritRate, value: 7.5 },
						{ attribute: Attribute.ResonanceLiberationBonus, value: 8.6 },
						{ attribute: Attribute.DEF_P, value: 10.9 }
					],
					equipped_by: null
				},
				{
					id: 'be20755b-1ad0-4024-9a03-611aba7e6900',
					name: 'Fusion Warrior',
					quality: 5,
					sonata: Sonata.MoltenRift,
					class: EchoClass.Common,
					cost: 1,
					level: 25,
					main_stat: {
						primary: { attribute: Attribute.ATK_P, value: 18 },
						secondary: { attribute: Attribute.HP, value: 2280 }
					},
					sub_stats: [
						{ attribute: Attribute.CritDamage, value: 15 },
						{ attribute: Attribute.HP, value: 430 },
						{ attribute: Attribute.CritRate, value: 7.5 },
						{ attribute: Attribute.ResonanceLiberationBonus, value: 8.6 },
						{ attribute: Attribute.DEF_P, value: 10.9 }
					],
					equipped_by: null
				}
			];

			expect(is_valid_combination(build, [])).toBe(false);
		});

		it('should return true for a valid combination that meet the sonata filter', () => {
			expect(is_valid_combination(MOCK, [{ sonata: Sonata.MoltenRift, allow_2p: true, allow_5p: false }])).toBe(true);
			expect(is_valid_combination(MOCK, [{ sonata: Sonata.MoltenRift, allow_2p: false, allow_5p: true }])).toBe(true);
			expect(is_valid_combination(MOCK, [{ sonata: Sonata.MoltenRift, allow_2p: true, allow_5p: true }])).toBe(true);
		});
	});

	describe('edge cases', () => {
		it('should consider a combination without filter as invalid', () => {
			expect(is_valid_combination(MOCK, [])).toBe(false);
		});

		it('should return false if no valid sonata constraints are met', () => {
			expect(is_valid_combination(MOCK, [{sonata: Sonata.CelestialLight, allow_2p: true, allow_5p: false}])).toBe(false);
		});
	});
});
