<script lang="ts">

	interface Props {
		values: number[],
	}

	const { values }: Props = $props();

	const formatted_values = $derived(format_motion_values(values.map(v => v.toFixed(0))));

	function format_motion_values(values: string[]) {
		return values
			.reduce<{ [v: string]: number }>((obj, val) => {
			  obj[val] = (obj[val] || 0) + 1;
			  return obj;
		}, {});
	}
</script>

{#each Object.entries(formatted_values) as [value, count], i}
	{#if count > 1}<span class="text-xs px-0.5">{count}x</span>{/if}
	{value}
	{#if i < Object.keys(formatted_values).length - 1} +{/if}
{/each}