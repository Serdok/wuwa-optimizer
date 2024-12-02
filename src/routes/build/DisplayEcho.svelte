<script lang="ts">
	import type { Echo } from '$lib/types/echo';
	import DisplayStat from './DisplayStat.svelte';
	import { base } from '$app/paths';
	import { sonata_assets } from '$lib/data/sonata';

	interface Props {
		echo: Echo
	}

	let { echo }: Props = $props();
</script>

<div class="flex flex-col border-2 rounded-lg gap-3">
	<div class="flex flex-row">
		<img src="{base}/assets/echo/head/{echo.image.head}" alt={echo.name} class="size-36" />
		<div class="flex flex-col gap-2 ml-2">
			<div>
				<span class="font-bold">{echo.name}</span>
				<div>(+{echo.level})</div>
			</div>
			<div class="flex flex-row gap-2 items-center">
				<img src="{base}/assets/sonata/{sonata_assets[echo.sonata]}" alt="{echo.sonata}" class="w-8 border-2 border-white rounded-full"/>
				<span>{echo.sonata}</span>
			</div>
			<div class="flex flex-col">
				<DisplayStat {...echo.main_stat.secondary} />
				<DisplayStat {...echo.main_stat.primary} />
			</div>
		</div>
	</div>
	<div class="flex flex-row flex-wrap space-x-2 justify-evenly my-2">
		{#each echo.sub_stats as sub_stat}
			<DisplayStat {...sub_stat} />
		{/each}
	</div>
</div>