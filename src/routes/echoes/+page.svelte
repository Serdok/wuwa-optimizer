<script lang="ts">
	import { base } from '$app/paths'
	import { get_echoes_as_state } from '$lib/db/echo';
	import { Sonata } from '$lib/types/echo';
	import { get_echo_class, get_echo_icon } from '$lib/data/echo';
	import { get_sonata_image } from '$lib/data/sonata';
	import { is_flat_stat } from '$lib/data/stat';
	import { STATS_ICONS } from '$lib/data/stat.js';
	import { get_sub_stat_efficiency } from '$lib/data/echo_stats';
	import IcRoundDelete from '~icons/ic/round-delete';
	import { delete_echo } from '$lib/db/echo.js';

	const echoes = get_echoes_as_state();
	const stats_efficiency = $derived(echoes.current.map(echo => echo.sub_stats.map(get_sub_stat_efficiency)));

	const quality_class = {
		2: 'flex flex-row gap-2 bg-rarity-2',
		3: 'flex flex-row gap-2 bg-rarity-3',
		4: 'flex flex-row gap-2 bg-rarity-4',
		5: 'flex flex-row gap-2 bg-rarity-5',
	}

	const sonata_class = {
		[Sonata.FreezingFrost]: 'w-6 border border-blue-600 rounded-full',
		[Sonata.MoltenRift]: 'w-6 border border-orange-400 rounded-full',
		[Sonata.VoidThunder]: 'w-6 border border-purple-600 rounded-full',
		[Sonata.SierraGale]: 'w-6 border border-emerald-400 rounded-full',
		[Sonata.CelestialLight]: 'w-6 border border-yellow-300 rounded-full',
		[Sonata.SunSinkingEclipse]: 'w-6 border border-fuchsia-700 rounded-full',
		[Sonata.RejuvenatingGlow]: 'w-6 border border-lime-300 rounded-full',
		[Sonata.MoonlitClouds]: 'w-6 border border-white rounded-full',
		[Sonata.LingeringTunes]: 'w-6 border border-red-600 rounded-full',
	}
</script>

<div>
	<a href="{base}/echoes/new" class="bg-indigo-800 rounded-full px-3">Add a new echo</a>

	<div class="mt-2 grid grid-cols-4 gap-2">
		{#each echoes.current as echo, i (echo.id)}
			<div class="h-72 flex flex-col bg-indigo-800 gap-1 rounded-b-2xl">
				<div>
					<div class="{quality_class[echo.quality]}">
						<img src="{get_echo_icon(echo.name)?.head}" alt="{echo.name}" class="w-32 bg-indigo-800 rounded-tr-3xl"/>
						<div class="flex-1 pl-2 flex flex-col bg-indigo-800 rounded-bl-3xl">
							<p class="text-xs font-light">{get_echo_class(echo.name)}</p>
							<div class="flex flex-row items-center gap-1">
								<p class="font-bold">{echo.name}</p>
								<p class="text-sm font-semibold">+{echo.level}</p>
							</div>
							<div class="flex flex-row items-center gap-1">
								<img src="{get_sonata_image(echo.sonata)}" alt="{echo.sonata}" class="{sonata_class[echo.sonata]}"/>
								<p class="text-sm">{echo.sonata}</p>
							</div>
							<div class="mt-1 flex flex-row items-center gap-1">
								<img src="{STATS_ICONS[echo.main_stat.primary.attribute]}" alt="{echo.main_stat.primary.attribute}" class="w-6" />
								<p class="text-sm font-semibold">{echo.main_stat.primary.attribute}</p>
								{#if is_flat_stat(echo.main_stat.primary.attribute)}
									<p class="text-sm">{echo.main_stat.primary.value.toFixed(0)}</p>
								{:else}
									<p class="text-sm">{echo.main_stat.primary.value.toFixed(1)}%</p>
								{/if}
							</div>
							<div class="flex flex-row items-center gap-1">
								<img src="{STATS_ICONS[echo.main_stat.secondary.attribute]}" alt="{echo.main_stat.secondary.attribute}" class="w-4" />
								<p class="text-xs font-semibold">{echo.main_stat.secondary.attribute}</p>
								{#if is_flat_stat(echo.main_stat.secondary.attribute)}
									<p class="text-xs">{echo.main_stat.secondary.value.toFixed(0)}</p>
								{:else}
									<p class="text-xs">{echo.main_stat.secondary.value.toFixed(1)}%</p>
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="pl-2 flex-1 flex flex-col">
					{#each echo.sub_stats as sub_stat, j (sub_stat.attribute)}
						{@const efficiency = stats_efficiency[i][j]}
						<div class="flex flex-row items-center">
							<div class="flex-1 flex flex-row items-center">
								<img src="{STATS_ICONS[sub_stat.attribute]}" alt="{sub_stat.attribute}" class="w-6"/>
								<p class="text-sm font-medium">{sub_stat.attribute}</p>
								{#if is_flat_stat(sub_stat.attribute)}
									<p>+{sub_stat.value.toFixed(0)}</p>
								{:else}
									<p>+{sub_stat.value.toFixed(1)}%</p>
								{/if}
							</div>
							<div class="text-sm font-light italic pr-2">
								{#if efficiency !== null}
									<p>{(efficiency * 100).toFixed(2)}%</p>
								{:else}
									<p class="text-red-400">ERR</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
				<div class="pb-1 px-2 flex flex-row gap-2">
					{#if echo.equipped_by}
						<p class="flex-1 font-light">Equipped by {echo.equipped_by}</p>
					{:else}
						<p class="flex-1 font-light">Not equipped</p>
					{/if}
					<button type="button" onclick={() => delete_echo(echo.id)}><IcRoundDelete></IcRoundDelete></button>
				</div>
			</div>
		{/each}
	</div>
</div>
