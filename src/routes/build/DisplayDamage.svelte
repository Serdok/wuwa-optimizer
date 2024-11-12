<script lang="ts">
	import type { AttackData } from '$lib/types/optimizer';

	interface Props {
		motion: AttackData,
		crit_option: 'non_crit' | 'average' | 'crit'
	}

	const { motion, crit_option }: Props = $props();

	const non_crit = $derived(format_motion_values(motion.non_crit.map(v => v.toFixed(0))));
	const average = $derived(format_motion_values(motion.average.map(v => v.toFixed(0))));
	const crit = $derived(format_motion_values(motion.crit.map(v => v.toFixed(0))));

	function format_motion_values(values: string[]) {
		return values.reduce<{ [v: string]: number }>((obj, val) => {
			obj[val] = (obj[val] || 0) + 1;
			return obj;
		}, {});
	}
</script>

{#snippet display(values)}
	{#each Object.entries(values) as [value, count], i}
		{#if count > 1}<span class="text-xs px-0.5">{count}x</span>{/if}
		{value}
		{#if i < Object.keys(values).length - 1} + {/if}
	{/each}
{/snippet}

<div class="flex flex-row justify-between px-2">
	<div>{motion.name}</div>
	{#if crit_option === 'non_crit'}
		<div>{@render display(non_crit)}</div>
	{:else if crit_option === 'average'}
		<div>{@render display(average)}</div>
	{:else if crit_option === 'crit'}
		<div>{@render display(crit)}</div>
	{/if}
</div>