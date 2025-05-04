<script lang="ts">
	import { get_echo_image } from '$lib/data/echoes/images';
	import { SONATA_DATA, type SonataKey } from '$lib/data/sonatas';
	import type { StatKey } from '$lib/data/stats';
	import type { DamageResult } from '$lib/optimizer/build';

	import DisplayStat from './DisplayStat.svelte';
	import DisplaySkill from './DisplaySkill.svelte';

	import { Separator } from '$lib/components/ui/separator';
	import { m } from '$lib/paraglide/messages';

	interface Props {
		result: DamageResult,
		i: number,
		total_results: number,
		damage_selection: 'non-crit' | 'average' | 'forced-crit',
	}

	const { result, i, total_results, damage_selection }: Props = $props();

	const total_cost = result.build.reduce((acc, echo) => acc + echo.cost, 0);
	const build_sets = result.build.reduce<{ [s in SonataKey]?: number }>((freq, e) => {
		freq[e.sonata] = (freq[e.sonata] || 0) + 1;
		return freq;
	}, {});
</script>

<div class="flex flex-col space-y-2">
	<div class="mt-2 flex flex-row items-center space-x-2">
		<span>build {i + 1}/{total_results}</span>
		<Separator orientation="vertical" />
		<span>total cost: {total_cost}/12</span>
		<Separator orientation="vertical" />
		<div class="flex flex-row items-center space-x-2">
			{#each Object.entries(build_sets) as [set, value]}
				{@const data = SONATA_DATA[set]}
				{#if value >= 2}
					<img src={data.image} alt={set} class="size-6"/>
					<span>{m[set]?.() || set} - 2p</span>
				{/if}
				{#if value >= 5}
					<img src={data.image} alt={set} class="size-6" />
					<span>{m[set]?.() || set} - 5p</span>
				{/if}
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-5 gap-1 justify-around">
		{#each result.build as echo (echo.id)}
			<!-- build -->
			<div class="border rounded-lg flex flex-col gap-3">
				<div class="flex flex-row">
					<img src={get_echo_image(echo.key)} alt={echo.key} class="size-36" />
					<div class="flex flex-col gap-2 ml-2">
						<div>
							<span class="font-bold">{echo.key}</span>
							<span>(+{echo.level})</span>
						</div>
						<div class="flex flex-row gap-2 items-center">
							<img src={SONATA_DATA[echo.sonata].image} alt="{echo.sonata}" class="w-8" />
							<span>{echo.sonata}</span>
						</div>
						<div class="flex flex-col">
							<DisplayStat key={echo.primary_stat.stat} value={echo.primary_stat.value} />
							<DisplayStat key={echo.secondary_stat.stat} value={echo.secondary_stat.value} />
						</div>
					</div>
				</div>
				<div class="flex flex-row flex-wrap space-x-2 justify-evenly my-2">
					{#each echo.sub_stats as sub_stat}
						<DisplayStat key={sub_stat.stat} value={sub_stat.value} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="columns-3">
		<!-- damage + stats -->
		<div class="break-inside-avoid flex flex-col gap-1 px-2">
			<div class="text-xl">Stats</div>
			{#each Object.entries(result.display_stats) as [key, value] (key)}
				<DisplayStat key={key as StatKey} {value} />
			{/each}
		</div>
		{#each Object.values(result.skills) as skill (skill.type)}
			<DisplaySkill {skill} {damage_selection} />
		{/each}
	</div>
</div>