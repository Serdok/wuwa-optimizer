<!--<script lang="ts" module>-->
<!--	import { tv } from 'tailwind-variants';-->

<!--	export const stat_variants = tv({-->
<!--		base: '',-->
<!--		variants: {-->
<!--			variant: {-->
<!--				primary_stat: '',-->
<!--				secondary_stat: '',-->
<!--				sub_stat: '',-->
<!--			}-->
<!--		},-->
<!--		defaultVariants: {-->
<!--			variant: 'primary_stat',-->
<!--		}-->
<!--	});-->
<!--</script>-->

<script lang="ts">
	import { BASE_STATS, STAT_ICONS, type StatKey } from '$lib/data/stats';

	interface Props {
		key: StatKey,
		value: number
	}

	const { key, value }: Props = $props();
</script>

{#if value !== 0}
	<div class="flex flex-row items-center gap-2">
		<img src={STAT_ICONS[key]} alt={key} class="size-6" />
		{#if BASE_STATS.includes(key)}
			<div>{value.toFixed(0)}</div>
		{:else}
			<div>{(value * 100).toFixed(1)}%</div>
		{/if}
	</div>
{/if}