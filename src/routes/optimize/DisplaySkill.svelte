<script lang="ts" module>
	import type { SkillKey } from '$lib/data/characters';

	type S = SkillKey;
</script>

<script lang="ts" generics="S extends SkillKey">
	import DisplayMotion from './DisplayMotion.svelte';
	import type { SkillDamage } from '$lib/optimizer/build';

	import { m } from '$lib/paraglide/messages';

	interface Props {
		skill: SkillDamage<S>,
		damage_selection: 'non-crit' | 'average' | 'forced-crit',
	}

	const { skill, damage_selection }: Props = $props();
</script>

<div class="w-full break-inside-avoid flex flex-col pt-2 px-2">
	<div class="text-xl">{m[skill.key]?.() || skill.key}</div>
	<div>
		{#each skill.motions as motion (motion.key)}
			<DisplayMotion {motion} {damage_selection} />
		{/each}
	</div>
</div>