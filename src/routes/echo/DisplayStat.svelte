<script lang="ts" module>
	import { tv } from 'tailwind-variants';
	import type { VariantProps } from 'tailwind-variants';

	export const statVariants = tv({
		slots: {
			base: 'flex flex-row items-center space-x-2',
			img: '',
			alt_img: '',
			text: '',
		},
		variants: {
			variant: {
				primary: {
					img: 'w-6',
					alt_img: 'font-light',
					text: 'font-light',
				},
				secondary: {
					img: 'w-10',
					alt_img: 'text-lg font-semibold',
					text: 'text-xl font-semibold',
				},
				sub_stat: {
					img: 'w-8',
					alt_img: '',
					text: 'text-lg',
				},
			}
		}
	});

	export type StatVariant = VariantProps<typeof statVariants>['variant'];
</script>

<script lang="ts">
	import { type Stat, type Attribute, } from '$lib/types/stat';
	import { BaseAttribute } from '$lib/types/stat';
	import { attribute_asset } from '$lib/data/attribute';
	import { base } from '$app/paths';
	import { cn } from '$lib/utils';

	interface Props {
		stat: Stat<Attribute>,
		variant: StatVariant,
		class?: string
	}

	let { stat, variant, class: className }: Props = $props();
	const { base: root, img, alt_img, text } = statVariants({ variant });
</script>

<div class={cn(root({ className }))}>
	{#if attribute_asset[stat.attribute]}
		<img src="{base}/assets/attribute/{attribute_asset[stat.attribute]}" alt={stat.attribute} class={img()}/>
	{:else}
		<span class={alt_img()}>{stat.attribute}</span>
	{/if}
	{#if Object.values(BaseAttribute).includes(stat.attribute)}
		<span class={text()}>{stat.value.toFixed(0)}</span>
	{:else}
		<span class={text()}>{(stat.value * 100).toFixed(1)}%</span>
	{/if}
</div>
