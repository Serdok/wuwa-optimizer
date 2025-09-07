<script lang="ts">
	import { SONATAS } from '$lib/data/sonatas';
	import { get_echo_image } from '$lib/data/echoes/images';
	import { get_message } from '$lib/messages';

	import DisplayStat from './display-stat.svelte';
	import type { Echo } from '$lib/data/echoes/types';

	interface Props {
		echo: Echo;
	}

	const { echo }: Props = $props();

</script>

<div class="border rounded-lg flex flex-col gap-3">
	<div class="flex flex-row">
		<div class="relative aspect-square size-36">
			<img src={get_echo_image(echo.key)} alt={echo.key} />
			<div class="absolute bottom-0 right-0">
				<img src={SONATAS[echo.sonata].image} alt="{echo.sonata}" class="w-8" />
			</div>
		</div>
		<div class="flex flex-col gap-2 ml-2 min-w-0">
			<div class="flex flex-col">
				<span class="font-bold truncate">{get_message(echo.key)}</span>
				<span>(+{echo.level})</span>
			</div>
			<div class="flex flex-col">
				<DisplayStat key={echo.primary_stat.stat} value={echo.primary_stat.value} class="text-lg" />
				<DisplayStat key={echo.secondary_stat.stat} value={echo.secondary_stat.value} class="font-light" />
			</div>
		</div>
	</div>
	<div class="px-2 grid grid-cols-[repeat(auto-fit,minmax(75px,1fr))] gap-x-3 my-1">
		{#each echo.sub_stats as sub_stat}
			<DisplayStat key={sub_stat.stat} value={sub_stat.value} class="gap-1" />
		{/each}
	</div>
</div>