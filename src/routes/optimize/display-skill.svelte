<script lang="ts">
	import DisplayMotion from './display-motion.svelte';
	import type { DamageSelection, SkillDamage, MotionTarget } from '$lib/data/optimizer/types';

	import { get_message } from '$lib/messages';
	import type { Nullable } from '$lib/utils';

	interface Props {
		skill: SkillDamage,
		damage_selection: DamageSelection,
		target: Nullable<MotionTarget>,
	}

	const { skill, damage_selection, target }: Props = $props();
</script>

<div class="w-full break-inside-avoid flex flex-col pt-2 px-2">
	<div class="text-xl">{get_message(skill.key)}</div>
	<div>
		{#each skill.motions as motion (motion.key)}
			{@const selected = target !== null && target.skill === skill.key && target.motion === motion.key}
			<DisplayMotion {motion} {damage_selection} {selected} />
		{/each}
	</div>
</div>