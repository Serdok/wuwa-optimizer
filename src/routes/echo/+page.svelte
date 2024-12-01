<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import { Star, Pencil, Trash, Undo2 } from 'lucide-svelte';
	import DisplayStat from './DisplayStat.svelte';
	import { sonata_assets } from '$lib/data/sonata';

	import * as Card from '$lib/components/ui/card';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';

	import { Cost, Quality, Sonata } from '$lib/types/echo';
	import { db } from '$lib/db';
	import { invalidateAll } from '$app/navigation';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let quality_filter: string[] = $state(Quality.toReversed().map(q => q.toString()));
	let cost_filter: string[] = $state(Cost.toReversed().map(c => c.toString()));

	const sonata_values = Object.values(Sonata).map(s => ({ label: s, value: s, }));
	let sonata_filter: string[] = $state(Object.values(Sonata));
	const selected_sonata = $derived(sonata_values.filter(s => sonata_filter.includes(s.value)).map(s => s.label).join(', ') ?? "Select sonatas");

	let new_id = $derived(crypto.randomUUID());

	const filtered_echoes = $derived.by(() => {
		let echoes = data.echoes;
		echoes = echoes.filter(e => quality_filter.includes(e.quality.toString()));
		echoes = echoes.filter(e => cost_filter.includes(e.cost.toString()));
		echoes = echoes.filter(e => sonata_filter.includes(e.sonata));
		return echoes;
	});

	function reset_filters() {
		quality_filter = Quality.toReversed().map(q => q.toString());
		cost_filter = Cost.toReversed().map(c => c.toString());
		sonata_filter = Object.values(Sonata);
	}
</script>


<Card.Root>
	<Card.Header>
		<Card.Title>
			<div class="flex flex-row items-center justify-between">
				<span>Echo Filter</span>
				<Button onclick={reset_filters}>
					<Undo2 class="size-4"/>
					Reset filters
				</Button>
			</div>
		</Card.Title>
		<Card.Description>Showing {filtered_echoes.length} echoes out of {data.echoes.length} total</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col">
			<ToggleGroup.Root type="multiple" variant="outline" bind:value={quality_filter}>
				{#each Quality.toReversed() as quality}
					<ToggleGroup.Item value={quality.toString()} aria-label="Quality {quality}">
						{#each Array(quality) as icon}<Star class="w-3 fill-black dark:fill-white"/>{/each}
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			<ToggleGroup.Root type="multiple" variant="outline" bind:value={cost_filter}>
				{#each Cost.toReversed() as cost}
					<ToggleGroup.Item value={cost.toString()} aria-label="{cost}-cost">{cost}-cost</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			<Select.Root type="multiple" bind:value={sonata_filter}>
				<Select.Trigger>{selected_sonata}</Select.Trigger>
				<Select.Content>
					{#each sonata_values as item}
						<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</Card.Content>
</Card.Root>

<div class="my-4">
	<Button disabled>Scan new echo</Button>
	<Button variant="default" href="/echo/{new_id}">Add new echo</Button>
</div>

<div class="grid grid-cols-3 gap-2 auto-cols-fr">
	{#each filtered_echoes as echo}
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
				<div class="flex-1 px-6">
					<span class="font-light italic">Not equipped</span>
				</div>
				<Button variant="ghost" href="/echo/{echo.id}"><Pencil/></Button>
				<Button variant="ghost" onclick={() => { db.echoes.delete(echo.id); invalidateAll(); }}><Trash/></Button>
			</div>
		</div>
	{/each}
</div>