<script lang="ts">
	import DisplayDamage from './DisplayDamage.svelte';

	import { m } from '$lib/paraglide/messages';

	interface Props {
		motion: { key: string, non_crit: number[], average: number[], forced_crit: number[] };
		damage_selection: 'non-crit' | 'average' | 'forced-crit',
	}

	const { motion, damage_selection }: Props = $props();
</script>

<div class="px-2 flex flex-row justify-between gap-2">
	<div>{m[motion.key]?.() || motion.key}</div>
	<div>
		{#if damage_selection === 'non-crit'}
			<DisplayDamage values={motion.non_crit} />
		{:else if damage_selection === 'forced-crit'}
			<DisplayDamage values={motion.forced_crit} />
		{:else}
			<DisplayDamage values={motion.average} />
		{/if}
	</div>
</div>