import {
	generate_combinations,
	generate_permutations,
	is_valid_combination
} from '$lib/optimizer/build';
import type { WorkerTask } from '$lib/optimizer/worker_pool';
import {
	apply_echo_stats,
	get_base_stats,
	get_default_stats,
	get_display_stats,
	get_final_stats
} from '$lib/optimizer/stats';
import { CHARACTERS } from '$lib/data/characters';
import { WEAPONS } from '$lib/data/weapons';
import { type StatKey, STATS } from '$lib/data/stats';
import { weapon_secondary_curve } from '$lib/data/weapons/curve';
import { default_finalizer } from '$lib/optimizer/finalizer';

self.onmessage = function (event: MessageEvent) {
	const { echoes, context, options } = event.data as WorkerTask['input'];

	// const permutations = generate_permutations(echoes, 5, []);
	const combinations = generate_combinations(echoes, 5);

	for (const build of combinations) {
		if (!is_valid_combination(build, context.filter)) {
			continue;
		}

		// todo: compute damage
		const character = CHARACTERS[context.character.key];
		const weapon = WEAPONS[character.weapon_type][context.weapon.key];

		const base_stats = get_base_stats(character, weapon);
		const default_stats = get_default_stats();

		const combat_stats = Object.fromEntries(
			Object.entries(default_stats).map(([key, value]) => {
				const stat = key as StatKey;
				return [stat, value + (base_stats[stat] ?? 0) + (context.character.extra_stats[stat].value ?? 0)];
			})
		) as Record<StatKey, number>;

		character.apply_effects(context, combat_stats);
		weapon.apply_effects(context, combat_stats);
		combat_stats[weapon.base_stats.secondary.stat] += weapon.base_stats.secondary.value * weapon_secondary_curve['6/90'];

		const build_stats = structuredClone(combat_stats);
		build.forEach((echo) => apply_echo_stats(build_stats, echo));

		const skills = Object.fromEntries(
			Object.values(character.skills)
				.filter((s) => s.motions.length > 0)
				.map((skill) => {
					const skill_stats = structuredClone(build_stats);
					skill.apply_effects(context, skill_stats);

					return [
						skill.type,
						{
							type: skill.type,
							key: skill.key,
							motions: skill.motions.map((motion) => {
								const attack_stats = structuredClone(skill_stats);
								motion.apply_effects(context, attack_stats);

								return {
									type: motion.type,
									key: motion.key,
									...default_finalizer(motion, base_stats, attack_stats)
								};
							})
						}
					];
				})
		);

		const display_stats = get_display_stats(base_stats, build_stats);
		const final_stats = get_final_stats(base_stats, build_stats);

		let target_value = 0;
		if (STATS.includes(options.sort_key)) {
			const key = options.sort_key as StatKey;
			target_value = final_stats[key];
		} else {
			// it is an attack
			const [skill_key, attack_key] = options.sort_key.split('-', 2);
			const target_skill = Object.values(skills).find(s => s.key === skill_key)!;
			const target_attack = target_skill.motions.find(a => a.key === attack_key)!;
			target_value = target_attack.average.reduce((acc, v) => acc + v, 0);
		}

		self.postMessage({
			build,
			skills,
			build_stats,
			display_stats,
			final_stats,
			target_value,
		});
	}

	self.postMessage({ type: 'complete' });
};
