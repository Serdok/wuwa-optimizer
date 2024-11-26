<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	import { Star, Pencil, Trash } from 'lucide-svelte';
	import DisplayStat from './DisplayStat.svelte';
	import { sonata_assets } from '$lib/data/sonata';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

</script>

<div class="grid grid-cols-3 gap-2 auto-cols-fr">
	{#each data.echoes as echo}
		<div class="w-full flex flex-col border-2 p-2">
			<div class="flex flex-row gap-2">
				<div class="aspect-square">
					<img src="{base}/assets/echo/head/{echo.image.head}" alt={echo.name} class="size-44"/>
				</div>
				<div class="flex-1 flex flex-col space-x-2">
					<span class="text-center font-medium text-xl">{echo.name}</span>
					<div class="flex flex-row justify-around">
						<span>+ {echo.level}</span>
						<div class="flex flex-row">{#each Array(echo.quality) as icon}<Star class="w-3 fill-black dark:fill-white"/> {/each}</div>
					</div>
					<div class="flex flex-row items-center space-x-2">
						<div class="border-2 rounded-full">
							<img src="{base}/assets/sonata/{sonata_assets[echo.sonata]}" alt={echo.sonata} class="w-10"/>
						</div>
						<span>{echo.sonata}</span>
					</div>
					<DisplayStat stat={echo.main_stat.secondary} variant="secondary" class="mt-2" />
					<DisplayStat stat={echo.main_stat.primary} variant="primary" />
				</div>
				<div class="border-l-4 pl-2 flex flex-col gap-1">
					{#each echo.sub_stats as sub_stat, i (i)}
						<DisplayStat stat={sub_stat} variant="sub_stat" />
					{/each}
				</div>
			</div>
			<div class="flex flex-row items-center space-x-2 mt-1">
				<div class="flex-1 bg-gray-600 rounded-full px-6">
					<span class="font-light italic">Not equipped</span>
				</div>
				<Pencil/>
				<Trash/>
			</div>
		</div>
	{/each}
</div>