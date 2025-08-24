<script lang="ts">
	import { ALL_ECHOES } from '$lib/data/echoes';
	import { PRIMARY_MAIN_STATS, SECONDARY_MAIN_STATS, SUB_STATS } from '$lib/data/echoes/base_stats';
	import { type StatType } from '$lib/data/stats/types';
	import { SONATAS } from '$lib/data/sonatas';
	import { SONATA_TYPES, type SonataType } from '$lib/data/sonatas/types';

	import { resolve } from '$app/paths';

	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	import { Button } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	import { Star } from 'lucide-svelte';

	import EchoCard from './echo-card.svelte';

	import { get_message } from '$lib/messages';

	let sonata_filter: SonataType[] = $state([]);
	let rank_filter: string[] = $state([]);
	let cost_filter: string[] = $state([]);

	// todo: apply filter on load?
	const echoes = liveQuery(() => db.echoes.orderBy('created_at').reverse().toArray());

	const sonata_counts = $derived.by(() => {
		if (!$echoes) return Object.fromEntries(SONATA_TYPES.map(s => [s, 0]));

		return Object.fromEntries(SONATA_TYPES.map(s => [s, $echoes.filter(e => e.sonata === s).length]));
	})

	const filtered = $derived.by(() => {
		if (!$echoes) return [];

		return $echoes
			.filter(e => sonata_filter.length === 0 || sonata_filter.includes(e.sonata))
			.filter(e => rank_filter.length === 0 || rank_filter.includes(e.rank.toString()))
			.filter(e => cost_filter.length === 0 || cost_filter.includes(e.cost.toString()))
			;
	})

	async function add_random_echo() {
		const choose_from_array = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

		const selection = choose_from_array(ALL_ECHOES);
		const rank = choose_from_array([2, 3, 4, 5]);
		const level = Math.floor(Math.random() * (rank * 5));

		const primary_stat = choose_from_array(Object.values(PRIMARY_MAIN_STATS[selection.cost].stats));
		const primary_base = primary_stat.values[rank].base;
		const primary_value = primary_base * (1 + level * 0.16);

		const secondary_stat = choose_from_array(Object.values(SECONDARY_MAIN_STATS[selection.cost].stats));
		const secondary_base = secondary_stat.values[rank].base;
		const secondary_value = secondary_base * (1 + level * 0.16);

		const sub_count = Math.floor(level / 5);
		const sub_stats = Array(sub_count);
		for (let i = 0; i < sub_count; i += 1) {
			const stat = choose_from_array(Object.keys(SUB_STATS)) as StatType;
			const value = choose_from_array(SUB_STATS[stat]!.values);
			sub_stats[i] = { stat, value };
		}

		await db.echoes.add({
			id: crypto.randomUUID(),
			key: selection.key,
			sonata: choose_from_array(selection.possible_sonatas),
			cost: selection.cost,
			rank,
			level,
			primary_stat: { stat: primary_stat.stat, value: primary_value },
			secondary_stat: { stat: secondary_stat.stat, value: secondary_value },
			sub_stats,
			created_at: Date.now(),
		});
	}
</script>

<div class="flex flex-col gap-2">
	<div>
		<ToggleGroup.Root type="multiple" bind:value={sonata_filter} class="grid grid-cols-7 w-auto gap-x-2 gap-y-1">
			{#each SONATA_TYPES as sonata}
				<ToggleGroup.Item value={sonata} class="min-w-max justify-start">
					<div class="flex flex-row items-center gap-x-2">
						<img src={SONATAS[sonata].image} alt={sonata} class="size-8" />
						<span>{get_message(sonata)} ({sonata_counts[sonata] || 0})</span>
					</div>
				</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root type="multiple" bind:value={rank_filter}>
			{#each [2, 3, 4, 5] as rank}
				<ToggleGroup.Item value={rank.toString()} class="flex flex-row items-center gap-0 min-w-max">{#each {length: rank} as _}<Star class="fill-white size-4" />{/each}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root type="multiple" bind:value={cost_filter}>
			<ToggleGroup.Item value={'1'}>COST-1</ToggleGroup.Item>
			<ToggleGroup.Item value={'3'}>COST-3</ToggleGroup.Item>
			<ToggleGroup.Item value={'4'}>COST-4</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>

	<div class="flex flex-row space-x-2">
		<Button variant="default" href={resolve('/echoes/edit')}>Add new echo</Button>
		<Button variant="default" onclick={() => add_random_echo()}>Randomize</Button>
	</div>

	<div>
		<span>{filtered.length} echoes</span>
		<div class="grid grid-cols-3 gap-4">
			{#each filtered as echo (echo.id)}
				<EchoCard {echo} />
			{/each}
		</div>
	</div>
</div>