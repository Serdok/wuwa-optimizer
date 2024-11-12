import { describe, expect, it } from 'vitest';
import { characters } from '$lib/data/characters';
import { weapons } from '$lib/data/weapons';
import {
	apply_echo_stats, get_base_stats,
	get_default_stats,
	optimize
} from '$lib/optimizer/optimize';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';
import { Class, type Echo, Sonata } from '$lib/types/echo';
import type { OptimizerInput } from '$lib/types/optimizer';

import fd_1 from '$lib/mock/fd-1';
import fw_1 from '$lib/mock/fw-1';
import hd_1 from '$lib/mock/hd-1';
import ir_1 from '$lib/mock/ir-1';
import vfh_1 from '$lib/mock/vfh-1';

describe('optimizer pipeline', () => {
	it('should apply character and weapon base stats', () => {
		const changli = characters['changli'];
		const blazing_brilliance = weapons['blazing_brilliance'];

		const stats = get_base_stats(changli, blazing_brilliance);

		expect(stats[BaseAttribute.HP]).toBe(10387.5);
		expect(stats[BaseAttribute.ATK]).toBe(1050);
		expect(stats[BaseAttribute.DEF]).toBe(1099.998);
	});

	it('should apply echo stats', () => {
		const echo: Echo = {
			name: 'test',
			level: 25,
			class: Class.Common,
			cost: 1,
			sonata: Sonata.FreezingFrost,
			quality: 5,
			main_stat: {
				primary: { attribute: BaseAttribute.ATK, value: 100 },
				secondary: { attribute: CombatAttribute.ATK_P, value: 0.1 }
			},
			sub_stats: [
				{ attribute: CombatAttribute.ATK_P, value: 0.1 },
				{ attribute: CombatAttribute.CritRate, value: 0.2 },
				{ attribute: CombatAttribute.CritDamage, value: 0.5 },
				{ attribute: ElementDMGBonus.Aero, value: 0.1 },
				{ attribute: AttackDMGBonus.Liberation, value: 0.3 }
			]
		};

		const stats = get_default_stats();
		apply_echo_stats(stats, echo);

		expect(stats[BaseAttribute.ATK]).toBe(100);
		expect(stats[CombatAttribute.ATK_P]).toBe(0.2);
		expect(stats[CombatAttribute.CritRate]).toBe(0.25);
		expect(stats[CombatAttribute.CritDamage]).toBe(2);
		expect(stats[ElementDMGBonus.Aero]).toBe(0.1);
		expect(stats[AttackDMGBonus.Liberation]).toBe(0.3);
	});

	describe('build combination', () => {
		const echoes = [ir_1, vfh_1, hd_1, fw_1, fd_1];

		it('should find 0 builds', () => {
			const input: OptimizerInput = {
				character: { name: 'changli', sequence: 0, conditionals: {}, },
				weapon: { name: 'blazing_brilliance', rank: 1, conditionals: {}, },
				selected_sonatas: {
					allow_2p: [],
					allow_5p: [Sonata.FreezingFrost]
				}
			};

			const result = optimize(input, echoes);
			expect(result).toHaveLength(0);
		});

		it('should find 1 build', () => {
			const input: OptimizerInput = {
				character: { name: 'changli', sequence: 0, conditionals: {}, },
				weapon: { name: 'blazing_brilliance', rank: 1, conditionals: {}, },
				selected_sonatas: {
					allow_2p: [],
					allow_5p: [Sonata.MoltenRift]
				}
			};

			const result = optimize(input, echoes);
			expect(result).toHaveLength(1);

			const { build } = result[0];
			expect(build).toStrictEqual(echoes);
		});

		it('should find 26 builds', () => {
			const input: OptimizerInput = {
				character: { name: 'changli', sequence: 0, conditionals: {}, },
				weapon: { name: 'blazing_brilliance', rank: 1, conditionals: {}, },
				selected_sonatas: {
					allow_2p: [Sonata.MoltenRift],
					allow_5p: [Sonata.MoltenRift]
				}
			};

			const result = optimize(input, echoes);
			expect(result).toHaveLength(26);
			console.log(result[0].skills)
		});
	})
});