<script lang="ts">
	import type { Nullable, Schema } from '$lib/utils';
	import type {
		DamageResult, DamageSelection,
		EchoRequest, SonataRequest,
		Target
	} from '$lib/data/optimizer/types';
	import type { CharacterKey } from '$lib/data/characters/types';
	import type { WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';
	import type { StatType } from '$lib/data/stats/types';
	import { SONATA_TYPES, type SonataType } from '$lib/data/sonatas/types';

	import { PRIMARY_MAIN_STATS } from '$lib/data/echoes/base_stats';
	import { STAT_ICONS } from '$lib/data/stats/display';

	import { db } from '$lib/db';

	import * as Accordion from '$lib/components/ui/accordion';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Progress } from '$lib/components/ui/progress';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	import CharacterSelector from './character-selector.svelte';
	import WeaponSelector from './weapon-selector.svelte';
	import OptimizerSelector from './optimizer-selector.svelte';
	import CharacterBuffs from './character-buffs.svelte';
	import WeaponBuffs from './weapon-buffs.svelte';
	import CharacterStats from './character-stats.svelte';
	import ExtraStatsConfigurator from './extra-stats-configurator.svelte';
	import SonataItem from './sonata-item.svelte';
	import OptimizerResult from './optimizer-result.svelte';

	import { ChartColumnBig, LoaderCircle } from 'lucide-svelte';

	import { create_buff_values, create_character_request, create_weapon_request } from '$lib/data/optimizer/utils';
	import { get_character } from '$lib/data/characters/utils';
	import { get_weapon, get_weapon_keys_of_type } from '$lib/data/weapons/utils';
	import { get_sonata } from '$lib/data/sonatas/utils';
	import { get_empty_stats, has_icon } from '$lib/data/stats/utils';

	import { optimize } from '$lib/optimizer/optimize';

	import { get_message } from '$lib/messages';

	let character_key: CharacterKey = $state('changli');
	let character_rank = $state(0);
	let character_buffs = $state(create_buff_values(get_character('changli').buffs));
	let character_stat_bonus = $state(get_character('changli').stat_bonus);

	let extra_stats = $state(get_empty_stats());

	let weapon_key: WeaponKeysFor<WeaponType> = $state('blazing_brilliance');
	let weapon_rank = $state(1);
	let weapon_buffs = $state(create_buff_values(get_weapon('sword', 'blazing_brilliance').buffs));

	let target: Target = $state({ kind: 'stat', stat: 'atk' });
	let keep_count = $state(3);

	const character = $derived(get_character(character_key));

	const weapon_keys = $derived(get_weapon_keys_of_type(character.weapon_type));
	const safe_weapon_key = $derived(weapon_keys.includes(weapon_key) ? weapon_key : weapon_keys[0]);

	const weapon = $derived(get_weapon(character.weapon_type, safe_weapon_key));

	let echo_primaries: Record<number, StatType[]> = $state({});

	let sonata_input: Schema<SonataRequest, 'sonata'> = $state(SONATA_TYPES.reduce((acc, key) => {
		const data = get_sonata(key);
		acc[data.key as SonataType] = {
			sonata: data.key as SonataType,
			buffs: create_buff_values(data.buffs),
			activated_pieces: [...data.piece_effects],
		};

		return acc;
	}, {} as Schema<SonataRequest, 'sonata'>));

	let damage_selection: DamageSelection = $state('average');

	let optimizer_controller: Nullable<ReturnType<typeof optimize>> = $state(null);
	let optimizer_running = $state(false);
	let starting = $state(false);
	let start_time = $state(0);
	let total_builds = $state(0);
	let tested_count = $state(0);

	let results: DamageResult[] = $state([]);

	async function start_optimizer() {
		starting = true;
		optimizer_running = true;
		start_time = performance.now();
		results = [];

		const character_request = create_character_request({
			key: $state.snapshot(character_key),
			rank: $state.snapshot(character_rank),
			buffs: $state.snapshot(character_buffs),
			stat_bonus: $state.snapshot(character_stat_bonus),
			extra_stats: $state.snapshot(extra_stats),
		});

		const weapon_request = create_weapon_request({
			type: $state.snapshot(character.weapon_type),
			key: $state.snapshot(weapon_key),
			rank: $state.snapshot(weapon_rank),
			buffs: $state.snapshot(weapon_buffs),
		});

		const echo_request: EchoRequest = {
			rainbow_build_allowed: true,
			partial_build_allowed: true,
			allowed_primary_stats: $state.snapshot(echo_primaries),
		};

		optimizer_controller = optimize(
			await db.echoes.toArray(),
			{
				character: character_request,
				weapon: weapon_request,
				sonatas: $state.snapshot(sonata_input),
				echos: echo_request,
				target: $state.snapshot(target),
				keep_count: $state.snapshot(keep_count),
			},
			{
				on_progress: (data) => {
					console.log('progress', data);
					total_builds = data.total;
					tested_count = data.progress.reduce((acc, count) => acc + count, 0);
				},
				on_batch: ({ batch }) => {
					results = batch;
				},
				on_complete: (data) => {
					console.log('complete', data, `${((performance.now() - start_time) / 1000).toFixed(3)} ms`);
					optimizer_controller = null;
					optimizer_running = false;
				}
			}
		);

		starting = false;
	}

	$effect(() => {
		character_buffs = create_buff_values(character.buffs);
		character_stat_bonus = character.stat_bonus;
	});

	$effect(() => {
		weapon_buffs = create_buff_values(weapon.buffs);
	});
</script>

<svelte:head>
	<title>{get_message(character.key)} - WuWa Optimizer</title>
</svelte:head>

<Tabs.Root value="character">
	<Tabs.List>
		<Tabs.Trigger value="character">{get_message('character')}</Tabs.Trigger>
		<Tabs.Trigger value="echoes">{get_message('echoes')}</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="character">
		<div class="grid grid-cols-3 auto-cols-fr justify-stretch gap-2">
			<div class="border rounded-lg overflow-hidden">
				<img src="{character.image.portrait}" alt="{character.key}" class="scale-125" />
			</div>
			<div class="border rounded-lg flex flex-col gap-4">
				<div class="flex-1 flex-col gap-4">
					<div class="p-2 flex flex-col gap-2">
						<span>{get_message('character')}</span>
						<CharacterSelector bind:key={character_key} bind:rank={character_rank} />
					</div>
					<div class="p-2 flex flex-col gap-2">
						<span>{get_message('weapon')}</span>
						<WeaponSelector weapon_type={character.weapon_type} bind:key={weapon_key} bind:rank={weapon_rank} />
					</div>
					<div class="p-2 flex flex-col gap-2">
						<span>{get_message('optimizer_options')}</span>
						<OptimizerSelector key={character_key} rank={character_rank} bind:target bind:damage_selection />
					</div>
				</div>
			</div>
			<div class="border rounded-lg">
				<Accordion.Root type="single" value={'character-buffs'}>
					<Accordion.Item value="character-buffs">
						<Accordion.Trigger class="px-2">{get_message('character_buffs')}</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<CharacterBuffs {character} rank={character_rank} bind:buffs={character_buffs} />
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="weapon-buffs">
						<Accordion.Trigger class="px-2">{get_message('weapon_buffs')}</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<WeaponBuffs weapon_type={character.weapon_type} key={safe_weapon_key} bind:buffs={weapon_buffs} />
						</Accordion.Content></Accordion.Item>
					<Accordion.Item value="stats">
						<Accordion.Trigger class="px-2">{get_message('extra_stats')}</Accordion.Trigger>
						<Accordion.Content class="px-2 flex flex-col gap-4">
							<CharacterStats {character} bind:stats={character_stat_bonus} />
							<Dialog.Root>
								<Dialog.Trigger class={buttonVariants({ variant: 'outline', class: 'flex-1' })}>
									<ChartColumnBig />
									<span>{get_message('extra_stats')}</span>
								</Dialog.Trigger>
								<Dialog.Content class="max-w-[80%] flex flex-col gap-2">
									<Dialog.Header>
										<Dialog.Title>{get_message('extra_stats')}</Dialog.Title>
									</Dialog.Header>
									<ExtraStatsConfigurator {character} bind:stats={extra_stats} />
								</Dialog.Content>
							</Dialog.Root>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="echoes">
		<div class="flex flex-row gap-2">
			<div class="border rounded-lg flex flex-col gap-4">
				{#each [4, 3, 1] as cost (cost)}
					<div class="px-2 flex flex-col gap-2">
						<div class="font-bold">COST {cost}</div>
						<ToggleGroup.Root type="multiple" class="px-2 grid grid-cols-3 gap-1 w-auto" bind:value={echo_primaries[cost]}>
							{#each Object.values(PRIMARY_MAIN_STATS[cost].stats) as s (s.stat)}
								<ToggleGroup.Item value={s.stat} class="min-w-max border rounded-lg">
									<div class="flex flex-row items-center gap-x-1">
										{#if has_icon(s.stat)}
											<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
											<div>{get_message(s.stat)}</div>
										{/if}
									</div>
								</ToggleGroup.Item>
							{/each}
						</ToggleGroup.Root>
					</div>
				{/each}
			</div>
			<div class="border rounded-lg grid grid-cols-3 gap-2">
				{#each SONATA_TYPES as sonata (sonata)}
					<SonataItem {sonata} bind:buffs={sonata_input[sonata].buffs} bind:allow_list={sonata_input[sonata].activated_pieces} />
				{/each}
			</div>
		</div>
	</Tabs.Content>
</Tabs.Root>

{#if !optimizer_controller}
	<Button type="button" onclick={() => start_optimizer()} class="mt-2 min-w-full" disabled={starting}>Optimize</Button>
{/if}

{#if optimizer_running}
	{@const percentage = total_builds > 0 ? (tested_count / total_builds) * 100 : 0}
	<Button type="button" onclick={() => optimizer_controller?.cancel_all()} class="mt-2 min-w-full">
		<LoaderCircle class="animate-spin" />
		Cancel
	</Button>

	<div class="my-2">
		<div>Tested {tested_count} builds out of {total_builds} ({percentage.toFixed(2)} %)</div>
		<Progress value={tested_count} max={total_builds} />
	</div>
{/if}

{#if results.length > 0}
		<div class="px-2 flex flex-col gap-4 divide-y-2">
			{#each results as result, i (i)}
				<OptimizerResult {result} {i} total_results={results.length} {damage_selection} {target} />
			{/each}
		</div>
{/if}
