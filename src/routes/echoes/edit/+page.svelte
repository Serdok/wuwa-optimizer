<script lang="ts">
	import { type PageProps } from './$types';

	import { db } from '$lib/db';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';

	import { ALL_ECHOES } from '$lib/data/echoes';
	import { SONATA_DATA } from '$lib/data/sonatas';
	import { Star, Trash } from 'lucide-svelte';
	import { PRIMARY_MAIN_STATS, SUB_STATS } from '$lib/data/echoes/base_stats';
	import { SECONDARY_MAIN_STATS } from '$lib/data/echoes/base_stats.js';
	import { BASE_STATS, STAT_ICONS, type StatKey, type StatValue } from '$lib/data/stats';
	import EchoSelector from './EchoSelector.svelte';
	import { toast } from 'svelte-sonner';
	import type { Echo } from '$lib/data/echoes/types';

	const { data }: PageProps = $props();

	let key: string = $state(data.echo?.key || ALL_ECHOES[0].key);
	const selected = $derived(ALL_ECHOES.find(e => e.key === key)!);

	let rank = $state(data.echo?.rank || 5);
	const max_level = $derived(rank * 5);

	let sonata = $state(data.echo?.sonata || ALL_ECHOES[0].possible_sonatas[0]);

	let level = $state(data.echo?.level || 25);
	const max_tuning = $derived(Math.floor(level / 5));

	const primary_stats = $derived(PRIMARY_MAIN_STATS[selected.cost].stats);
	let primary_key = $state(data.echo?.primary_stat.stat || '');
	const primary_base = $derived(primary_stats[primary_key as StatKey]?.values[rank].base || 0);
	const primary_value = $derived(primary_base * (1 + level * 0.16));

	const secondary_stats = $derived(SECONDARY_MAIN_STATS[selected.cost].stats);
	let secondary_key = $state(data.echo?.secondary_stat.stat || '');
	const secondary_base = $derived(secondary_stats[secondary_key as StatKey]?.values[rank].base || 0);
	const secondary_value = $derived(secondary_base * (1 + level * 0.16));

	let sub_stats: { stat: StatKey | ''; value: number }[] = $state(data.echo?.sub_stats || []);

	let echo_dialog_open = $state(false);

	function is_sub_stat_present(stat: StatKey, idx: number) {
		return sub_stats.some((s, i) => i < idx && s.stat === stat);
	}

	async function save_echo() {
		const updated: Echo = {
			id: data.echo?.id || crypto.randomUUID(),
			key,
			sonata,
			cost: selected.cost,
			rank,
			level,
			primary_stat: { stat: primary_key as StatKey, value: primary_value, },
			secondary_stat: { stat: secondary_key as StatKey, value: secondary_value, },
			sub_stats: $state.snapshot(sub_stats).filter(s => s.stat !== '') as StatValue[],
			created_at: data.echo?.created_at || Date.now(),
		};

		// console.log(updated);
		await db.echoes.put(updated);

		toast("Echo saved");
	}

	// reset sonata
	$effect(() => {
		if (!selected.possible_sonatas.includes(sonata)) {
			sonata = selected.possible_sonatas[0];
		}
	});

	// reset level
	$effect(() => {
		if (level > max_level) {
			level = max_level;
		}
	});

	// reset stat keys
	$effect(() => {
		if (!(primary_key in primary_stats)) {
			primary_key = Object.keys(primary_stats)[0];
		}

		if (!(secondary_key in secondary_stats)) {
			secondary_key = Object.keys(secondary_stats)[0];
		}
	})

	// reset sub stats
	$effect(() => {
		for (let i = 0; i < sub_stats.length; i += 1) {
			if (sub_stats[i].stat === '') continue;

			// remove duplicates
			for (let j = i + 1; j < sub_stats.length; j += 1) {
				if (sub_stats[j].stat === sub_stats[i].stat) {
					sub_stats[j] = { stat: '', value: 0 };
				}
			}

			if (!SUB_STATS[sub_stats[i].stat].values.includes(sub_stats[i].value)) {
				sub_stats[i].value = SUB_STATS[sub_stats[i].stat].values[0];
			}
		}
	})
</script>

<div class="flex flex-col space-y-2">
	<div class="flex flex-row gap-2">
		<EchoSelector bind:key bind:open={echo_dialog_open} {selected} />

		<div class="flex-1 flex flex-col gap-6">
			<div class="flex flex-row items-center space-x-2">
				<Button variant="outline" class="flex-1" onclick={() => echo_dialog_open = true}>{selected.key}</Button>
				<RadioGroup.Root name="rank" orientation="horizontal" bind:value={rank} class="flex flex-row">
					<Star class="size-6 fill-white" />
					{#each [2, 3, 4, 5] as r}
						<div>
							<RadioGroup.Item id="rank-{r}" value={r} class="sr-only peer" />
							<Label for="rank-{r}" class="peer-aria-checked:fill-white">
								<Star class="size-6 {r <= rank ? 'fill-current' : ''}" />
							</Label>
						</div>
					{/each}
				</RadioGroup.Root>
			</div>

			<Select.Root type="single" bind:value={sonata} allowDeselect={false}>
				<Select.Trigger>
					<div class="flex flex-row items-center space-x-2">
						<img src={SONATA_DATA[sonata].image} alt={sonata} class="size-8" />
						<span class="font-medium">{sonata}</span>
					</div>
				</Select.Trigger>
				<Select.Content>
					{#each selected.possible_sonatas as s}
						<Select.Item value={s} label={s}>
							<div class="flex flex-row items-center space-x-2">
								<img src={SONATA_DATA[s].image} alt={s} class="size-8" />
								<span class="font-medium">{s}</span>
							</div>
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			<div class="flex flex-row items-center space-x-2">
				<Input name="level" bind:value={level} class="flex-1" />
				<div class="flex flex-row space-x-0 divide-x-2">
					<Button onclick={() => level = 0} class="rounded-r-none" disabled={level === 0}>0</Button>
					<Button onclick={() => level = Math.max(level - 5, 0)} disabled={level === 0} class="rounded-l-none rounded-r-none" >-5</Button>
					<Button onclick={() => level = Math.min(level + 5, max_level)} disabled={level === max_level} class="rounded-l-none rounded-r-none">+5</Button>
					<Button onclick={() => level = max_level} class="rounded-l-none" disabled={level === max_level}>{max_level}</Button>
				</div>
			</div>

			<div class="flex flex-col space-y-1">
				<Select.Root type="single" bind:value={primary_key} allowDeselect={false}>
					<Select.Trigger>
						<div class="flex flex-row items-center space-x-2">
							{#if primary_key in STAT_ICONS}
								<img src={STAT_ICONS[primary_key]} alt={primary_key} class="size-8" />
								<span class="text-lg">{primary_key}</span>
								<span
									class="text-lg">{BASE_STATS.includes(primary_key) ? primary_value.toFixed(0) : (primary_value * 100).toFixed(1) + '%'}</span>
							{/if}
						</div>
					</Select.Trigger>
					<Select.Content>
						{#each Object.values(primary_stats) as s}
							{@const value = primary_stats[s.stat].values[rank].base * (1 + level * 0.16)}
							<Select.Item value={s.stat} label={s.stat}>
								<div class="flex flex-row items-center space-x-2">
									{#if s.stat in STAT_ICONS}
										<img src={STAT_ICONS[s.stat]} alt={s.stat} class="size-8" />
										<span class="text-lg">{s.stat}</span>
										<span
											class="text-lg">{BASE_STATS.includes(s.stat) ? value.toFixed(0) : (value * 100).toFixed(1) + '%'}</span>
									{/if}
								</div>
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<Select.Root type="single" bind:value={secondary_key} allowDeselect={false} >
					<Select.Trigger>
						<div class="flex flex-row items-center space-x-2">
							{#if secondary_key in STAT_ICONS}
								<img src={STAT_ICONS[secondary_key]} alt={secondary_key} class="size-6" />
								<span class="font-light">{secondary_key}</span>
								<span class="font-light">{BASE_STATS.includes(secondary_key) ? secondary_value.toFixed(0) : (secondary_value * 100).toFixed(1) + '%'}</span>
							{/if}
						</div>
					</Select.Trigger>
					<Select.Content>
						{#each Object.values(secondary_stats) as s}
							{@const value = secondary_stats[s.stat].values[rank].base * (1 + level * 0.16)}
							<Select.Item value={s.stat} label={s.stat}>
								<div class="flex flex-row items-center space-x-2">
									{#if s.stat in STAT_ICONS}
										<img src={STAT_ICONS[s.stat]} alt={s.stat} class="size-6" />
										<span class="font-light">{s.stat}</span>
										<span class="font-light">{BASE_STATS.includes(s.stat) ? value.toFixed(0) : (value * 100).toFixed(1) + '%'}</span>
									{/if}
								</div>
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="border-l-4 pl-2 basis-1/3 flex flex-col gap-2">
			<Button onclick={() => sub_stats.push({ stat: '', value: 0 })} disabled={sub_stats.length >= max_tuning}>add a tuning level</Button>
			<div class="flex flex-col justify-between space-y-4">
				{#each sub_stats as sub, i}
					<div class="flex flex-row items-center">
						<div class="flex-1 flex flex-row space-x-2">
							<Select.Root type="single" bind:value={sub_stats[i].stat}>
								<Select.Trigger>
									<div class="flex flex-row items-center space-x-2">
										{#if sub.stat in STAT_ICONS}
											<img src={STAT_ICONS[sub.stat]} alt={sub.stat} class="size-8" />
											<span class="font-medium">{sub.stat}</span>
										{/if}
									</div>
								</Select.Trigger>
								<Select.Content>
									{#each Object.values(SUB_STATS) as item}
										<Select.Item value={item.stat} label={item.stat} disabled={is_sub_stat_present(item.stat, i)}>
											<div class="flex flex-row items-center space-x-2">
												{#if item.stat in STAT_ICONS}
													<img src={STAT_ICONS[item.stat]} alt={item.stat} class="size-8" />
													<span class="font-medium">{item.stat}</span>
												{/if}
											</div>
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<Select.Root type="single" bind:value={sub_stats[i].value}>
								<Select.Trigger class="basis-1/3">
									<span class="font-medium">{BASE_STATS.includes(sub_stats[i].stat) ? sub_stats[i].value.toFixed(0) : (sub_stats[i].value * 100).toFixed(1) + '%'}</span>
								</Select.Trigger>
								<Select.Content>
									{#each SUB_STATS[sub_stats[i].stat].values as v}
										<Select.Item value={v} label={v}>
											<span class="font-medium">{BASE_STATS.includes(sub_stats[i].stat) ? v.toFixed(0) : (v * 100).toFixed(1) + '%'}</span>
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<Button variant="ghost" onclick={() => sub_stats = sub_stats.filter((_, idx) => idx !== i)}><Trash /></Button>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<Button onclick={() => save_echo()}>save</Button>
</div>