import type { Schema } from '$lib/utils';
import type { Echo } from '$lib/data/echoes/types';
import type { DamageResult, OptimizerRequest, SkillDamage } from '$lib/data/optimizer/types';
import { type SonataType } from '$lib/data/sonatas/types';
import type { StatResult, StatType } from '$lib/data/stats/types';
import { get_character } from '$lib/data/characters/utils';
import { get_weapon } from '$lib/data/weapons/utils';
import { apply_piece_effects, get_sonata } from '$lib/data/sonatas/utils';
import { weapon_secondary_curve } from '$lib/data/weapons/curve';
import { default_finalizer } from '$lib/optimizer/finalizer';
import {
	apply_echo_stats,
	get_base_stats,
	get_default_stats,
	get_display_stats,
	get_final_stats
} from '$lib/data/stats/utils';
import type { CharacterKey, Characters } from '$lib/data/characters/types';
import type { WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';


export function compute_damage<CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>>(build: Echo[], request: OptimizerRequest<CK, WT, WK>) {
	const base_character = get_character(request.character.key);
	const character = base_character.create_ranked(base_character, request.character.rank);
	const weapon = get_weapon(request.weapon.type, request.weapon.key);

	const base_stats = get_base_stats(character.base_stats, weapon.base_stats);
	const default_stats = get_default_stats();

	const combat_stats = Object.fromEntries(
		Object.entries(default_stats).map(([key, value]) => {
			const stat = key as StatType;
			value += (request.character.extra_stats[stat] ?? 0);
			value += request.character.stat_bonus.filter(b => b.stat === stat).reduce((acc, b) => acc + b.value, 0);
			return [stat, value];
		})
	) as StatResult<StatType>;

	character.apply_effect(
		combat_stats,
		{
			buffs: request.character.buffs,
			rank: request.character.rank,
			character,
			weapon,
		}
	);
	weapon.apply_effect(
		combat_stats,
		{
			buffs: request.weapon.buffs,
			rank: request.weapon.rank,
			character,
			weapon,
		}
	);
	combat_stats[weapon.base_stats.secondary.stat] += weapon.base_stats.secondary.value * weapon_secondary_curve['6/90'];

	const build_stats = structuredClone(combat_stats);
	build.forEach((echo) => apply_echo_stats(build_stats, echo));

	const sets = Object.groupBy(build, e => e.sonata);
	for (const [key, group] of Object.entries(sets)) {
		const sonata_key = key as SonataType;
		apply_piece_effects(
			get_sonata(sonata_key),
			group.length,
			[
				build_stats,
				{
					buffs: request.sonatas[sonata_key].buffs,
					rank: 0,
					character,
					weapon,
				}
			]
		);
	}

	const skills = Object.fromEntries(
		Object.values(character.skills)
			.filter(s => s.motions.length > 0)
			.map(skill => {
				const skill_stats = structuredClone(build_stats);
				skill.apply_effect(
					skill_stats,
					{
						buffs: request.character.buffs,
						rank: request.character.rank,
						character,
						weapon,
					}
				);

				return [
					skill.type,
					{
						type: skill.type,
						key: skill.key,
						motions: skill.motions.map(motion => {
							const motion_stats = structuredClone(skill_stats);
							skill.motions_effect[motion.key]?.(
								motion_stats,
								{
									buffs: request.character.buffs,
									rank: request.character.rank,
									character,
									weapon,
								}
							);

							return {
								type: motion.type,
								key: motion.key,
								damage: default_finalizer(motion, base_stats, motion_stats)
							};
						})
					}
				];
			})
	) as Schema<SkillDamage, 'type'>;

	const display_stats = get_display_stats(base_stats, build_stats);
	const final_stats = get_final_stats(base_stats, build_stats);

	let target_value: number;
	if (request.target.kind === 'stat') {
		target_value = final_stats[request.target.stat];
	} else {
		const { skill, motion } = request.target;
		const target_skill = Object.values(skills).find(s => s.key === skill)!;
		const target_attack = target_skill.motions.find(a => a.key === motion)!;

		// todo: optimize against non-crit/forced_crit as well
		target_value = target_attack.damage.average.reduce((acc, v) => acc + v, 0);
	}

	return {
		build,
		skills,
		stats: { build: build_stats, display: display_stats, final: final_stats, },
		target: target_value,
	} as DamageResult;
}
