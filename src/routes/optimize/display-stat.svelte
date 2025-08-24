<script lang="ts">
	import type { StatType } from '$lib/data/stats/types';
	import { cn } from '$lib/utils';
	import { has_icon, is_base_stat } from '$lib/data/stats/utils';

	import { STAT_ICONS } from '$lib/data/stats/display';

	interface Props {
		key: StatType,
		value: number,
		class?: string,
	}

	const { key, value, class: class_name }: Props = $props();
</script>

{#if value !== 0}
	<div class={cn("flex flex-row items-center gap-2", class_name)}>
		{#if has_icon(key)}
			<img src={STAT_ICONS[key]} alt={key} class="size-6" />
		{/if}
		{#if is_base_stat(key)}
			<div>{value.toFixed(0)}</div>
		{:else}
			<div>{(value * 100).toFixed(1)}%</div>
		{/if}
	</div>
{/if}