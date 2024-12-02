<script lang="ts">
	import { type Attribute, BaseAttribute } from '$lib/types/stat';
	import { base } from '$app/paths';
	import { attribute_asset } from '$lib/data/attribute';
	import { cn } from '$lib/utils';

	interface Props {
		attribute: Attribute | string,
		value: number,
		class?: string
	}

	const { attribute, value, class: className }: Props = $props();

</script>

<div class={cn('flex flex-row items-center gap-2', className)}>
	<img src="{base}/assets/attribute/{attribute_asset[attribute]}" alt={attribute} class="size-6" />
	{#if attribute in BaseAttribute}
		<div>{value.toFixed(0)}</div>
	{:else}
		<div>{(value * 100).toFixed(1)}%</div>
	{/if}
</div>