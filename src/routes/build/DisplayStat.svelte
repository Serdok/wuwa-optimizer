<script lang="ts">
	import { type Attribute, BaseAttribute } from '$lib/types/stat';

	interface Props {
		attribute: Attribute | string,
		value: number,
	}

	const { attribute, value }: Props = $props();

</script>

<div class="flex flex-row items-center justify-between px-2">
	<div>{attribute}</div>
	{#if attribute in BaseAttribute}
		<div>{value.toFixed(0)}</div>
	{:else}
		<div>{(value * 100).toFixed(1)}%</div>
	{/if}
</div>