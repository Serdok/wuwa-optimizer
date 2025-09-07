<script lang="ts">
	import type { DamageResult, DamageSelection, Target } from '$lib/data/optimizer/types';
	import type { StatType } from '$lib/data/stats/types';
	import type { SonataType } from '$lib/data/sonatas/types';

	import { Separator } from '$lib/components/ui/separator';

	import EchoCard from './echo-card.svelte';
	import DisplayStat from './display-stat.svelte';
	import DisplaySkill from './display-skill.svelte';

	import { get_message } from '$lib/messages';
	import { get_sonata } from '$lib/data/sonatas/utils';
	import type { Echo } from '$lib/data/echoes/types';

	interface Props {
		result: DamageResult,
		i: number,
		total_results: number,
		damage_selection: DamageSelection,
		target: Target,
	}

	const { result, i, total_results, damage_selection, target }: Props = $props();

	const total_cost = $derived(result.build.reduce((acc, echo) => acc + echo.cost, 0));
	const build_sets = $derived(Object.groupBy(result.build, e => e.sonata) as { [key in SonataType]?: Echo[] });

	// todo: filter out elements that are not the same as the character
	const stat_entries = $derived.by(() => Object.entries(result.stats.display) as [StatType, number][]);
	const skill_target = $derived(target.kind === 'motion' ? target : null);
</script>

<div class="flex flex-col space-y-2">
	<div class="mt-2 flex flex-row items-center space-x-2">
		<span>build {i + 1}/{total_results}</span>
		<Separator orientation="vertical" />
		<span>total cost: {total_cost}/12</span>
		<Separator orientation="vertical" />
		<div class="flex flex-row items-center space-x-2">
			{#each Object.entries(build_sets) as [set, echoes] (set)}
				{@const data = get_sonata(set)}
				{#if echoes.length >= 2}
					<img src={data.image} alt={set} class="size-6"/>
					<span>{get_message(set)} - 2p</span>
				{/if}
				{#if echoes.length >= 5}
					<img src={data.image} alt={set} class="size-6" />
					<span>{get_message(set)} - 5p</span>
				{/if}
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-5 gap-1 justify-around">
		{#each result.build as echo (echo.id)}
			<!-- build -->
			<EchoCard {echo} />
		{/each}
	</div>
	<div class="columns-3">
		<!-- damage + stats -->
		<div class="break-inside-avoid flex flex-col gap-1 px-2">
			<div class="text-xl">Stats</div>
			{#each stat_entries as [key, value] (key)}
				{@const selected = target.kind === 'stat' && target.stat === key}
				<DisplayStat {key} {value} class={selected ? 'border-2 border-red-400' : ''} />
			{/each}
		</div>
		{#each Object.values(result.skills) as skill (skill.type)}
			<DisplaySkill {skill} {damage_selection} target={skill_target} />
		{/each}
	</div>
</div>