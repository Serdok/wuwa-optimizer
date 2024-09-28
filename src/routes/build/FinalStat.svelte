<script lang="ts">
	import type { Attribute } from '$lib/types/stat';
	import { STATS_ICONS } from '$lib/data/stat';

	const { attribute, value, is_percentage = true }: { attribute: Attribute, value: number | undefined, is_percentage?: boolean } = $props();
</script>

{#if value && value !== 0}
	<div class="flex flex-row justify-between gap-4">
		<div class="flex flex-row items-center gap-1">
			<img src="{STATS_ICONS[attribute]}" alt="{attribute}" class="w-4"/>
			<div class="text-sm">{attribute}</div>
		</div>
		{#if is_percentage}
			<div class="text-sm">{(value * 100).toFixed(1)}%</div>
		{:else}
			<div class="text-sm">{value.toFixed(0)}</div>
		{/if}
	</div>
{/if}