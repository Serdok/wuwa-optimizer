<script lang="ts">
	import { BASE_STATS, STAT_ICONS, type StatKey } from '$lib/data/stats';
	import { cn } from '$lib/utils';

	interface Props {
		key: StatKey,
		value: number,
		class?: string,
	}

	const { key, value, class: class_name }: Props = $props();
</script>

{#if value !== 0}
	<div class={cn("flex flex-row items-center gap-2", class_name)}>
		<img src={STAT_ICONS[key]} alt={key} class="size-6" />
		{#if BASE_STATS.includes(key)}
			<div>{value.toFixed(0)}</div>
		{:else}
			<div>{(value * 100).toFixed(1)}%</div>
		{/if}
	</div>
{/if}