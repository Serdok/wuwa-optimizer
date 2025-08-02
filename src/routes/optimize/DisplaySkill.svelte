<script lang="ts" module>
	import type { SkillKey } from '$lib/data/characters';

	type S = SkillKey;
</script>

<script lang="ts" generics="S extends SkillKey">
	import DisplayMotion from './DisplayMotion.svelte';
	import type { SkillDamage } from '$lib/optimizer/build';

	import { m } from '$lib/paraglide/messages';
	import type { MotionTarget } from '$lib/data/optimizer';

	interface Props {
		skill: SkillDamage<S>,
		damage_selection: 'non-crit' | 'average' | 'forced-crit',
		target: MotionTarget,
	}

	const { skill, damage_selection, target }: Props = $props();
</script>

<div class="w-full break-inside-avoid flex flex-col pt-2 px-2">
	<div class="text-xl">{m[skill.key]?.() || skill.key}</div>
	<div>
		{#each skill.motions as motion (motion.key)}
			{@const selected = target.skill === skill.key && target.motion === motion.key}
			<DisplayMotion {motion} {damage_selection} {selected} />
		{/each}
	</div>
</div>