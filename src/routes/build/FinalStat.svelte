<script lang="ts">
	import type { Attribute } from '$lib/types/stat';
	import { STATS_ICONS } from '$lib/data/stat';

	const { attribute, value, is_percentage = true }: { attribute: Attribute, value: number, is_percentage?: boolean } = $props();
</script>

{#if value !== 0}
	<div class="flex flex-row justify-between gap-4">
		<div class="flex flex-row items-center gap-1">
			<img src="{STATS_ICONS[attribute]}" alt="{attribute}" class="w-6"/>
			<div class="text-lg">{attribute}</div>
		</div>
		{#if is_percentage}
			<div class="text-lg">{value.toFixed(1)}%</div>
		{:else}
			<div class="text-lg">{value.toFixed(0)}</div>
		{/if}
	</div>
{/if}