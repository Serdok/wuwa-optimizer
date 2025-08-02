import type { Echo } from '$lib/data/echoes/types';
import type {
	OptimizerContext,
	OptimizerRequest,
	OptimizerOptions
} from '$lib/data/optimizer';
import { SONATA_DATA, type SonataKey } from '$lib/data/sonatas';
import { type StatKey, STATS } from '$lib/data/stats';
import { type AttackKey, CHARACTERS, type SkillKey } from '$lib/data/characters';
import { WEAPONS } from '$lib/data/weapons';
import {
	apply_echo_stats,
	get_base_stats,
	get_default_stats,
	get_display_stats,
	get_final_stats
} from './stats';
import { weapon_secondary_curve } from '$lib/data/weapons/curve';
import { default_finalizer } from '$lib/optimizer/finalizer';

export type MotionDamage = {
	type: AttackKey;
	key: string;
	non_crit: number[],
	average: number[],
	forced_crit: number[],
};

export type SkillDamage<S extends SkillKey> = {
	type: S;
	key: string;
	motions: MotionDamage[];
};

export type DamageResult = {
	build: Echo[];
	skills: { [S in SkillKey]: SkillDamage<S>; };
	build_stats: Record<StatKey, number>;
	display_stats: Partial<Record<StatKey, number>>;
	final_stats: Record<StatKey, number>;
	target_value: number;
};

export function compute_damage(build: Echo[], input: OptimizerRequest, options: OptimizerOptions): DamageResult {
	const character = CHARACTERS[input.character.key];
	const weapon = WEAPONS[character.weapon_type][input.weapon.key];

	const base_stats = get_base_stats(character, weapon);
	const default_stats = get_default_stats();

	const combat_stats = Object.fromEntries(
		Object.entries(default_stats).map(([key, value]) => {
			const stat = key as StatKey;
			return [stat, value + (input.character.extra_stats[stat].value ?? 0)];
		})
	) as Record<StatKey, number>;

	const context: OptimizerContext = { character, build, };

	character.apply_effects(input, combat_stats, context);
	weapon.apply_effects(input, combat_stats, context);
	combat_stats[weapon.base_stats.secondary.stat] += weapon.base_stats.secondary.value * weapon_secondary_curve['6/90'];

	const build_stats = structuredClone(combat_stats);
	build.forEach((echo) => apply_echo_stats(build_stats, echo));

	const sets = Object.groupBy(build, e => e.sonata);
	for (const [key, echoes] of Object.entries(sets)) {
		const sonata = key as SonataKey;
		SONATA_DATA[sonata].apply_effects(input, build_stats, context);
	}

	const skills = Object.fromEntries(
		Object.values(character.skills)
			.filter((s) => s.motions.length > 0)
			.map((skill) => {
				const skill_stats = structuredClone(build_stats);
				skill.apply_effects(input, skill_stats, context);

				return [
					skill.type,
					{
						type: skill.type,
						key: skill.key,
						motions: skill.motions.map((motion) => {
							const attack_stats = structuredClone(skill_stats);
							motion.apply_effects(input, attack_stats, context);

							return {
								type: motion.type,
								key: motion.key,
								...default_finalizer(motion, base_stats, attack_stats)
							};
						})
					}
				];
			})
	) as { [S in SkillKey]: SkillDamage<S>; };

	const display_stats = get_display_stats(base_stats, build_stats);
	const final_stats = get_final_stats(base_stats, build_stats);

	let target_value: number;
	if (input.target_key.kind === 'stat') {
		target_value = final_stats[input.target_key.stat];
	} else {
		const { skill, motion } = input.target_key;
		const target_skill = Object.values(skills).find(s => s.key === skill)!;
		const target_attack = target_skill.motions.find(a => a.key === motion)!;

		// todo: optimize against non-crit/forced_crit as well
		target_value = target_attack.average.reduce((acc, v) => acc + v, 0);
	}

	return {
		build,
		skills,
		build_stats,
		display_stats,
		final_stats,
		target_value,
	};
}
