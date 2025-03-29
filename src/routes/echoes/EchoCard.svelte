<script lang="ts">
	import { base } from '$app/paths';

	import { db } from '$lib/db';

	import { Button } from '$lib/components/ui/button';
	import { Pencil, Star, Trash } from 'lucide-svelte';

	import type { Echo } from '$lib/data/echoes/types';
	import { SONATA_DATA } from '$lib/data/sonatas';
	import { BASE_STATS, STAT_ICONS } from '$lib/data/stats';

	import { m } from '$lib/paraglide/messages';
	import { get_echo_image } from '$lib/data/echoes/images';

	interface Props {
		echo: Echo;
	}

	const { echo }: Props = $props();

	async function delete_echo(id: string) {
		await db.echoes.delete(id);
	}

</script>

<div class="border-2 rounded-xl">
	<div class="flex flex-row gap-4">
		<img src={get_echo_image(echo.key)} alt={echo.key} class="rounded-xl size-44" />
		<div class="flex-1 flex flex-col gap-2 py-2">
			<div>
				<span class="text-lg font-medium">{echo.key}</span>
				<div class="flex flex-row items-center justify-around">
					<span class="text-sm font-light">+{echo.level}</span>
					<div class="flex flex-row items-center">
						{#each { length: echo.rank } as _}
							<Star class="size-3 fill-white" />
						{/each}
					</div>
				</div>
			</div>
			<div class="flex flex-row items-center space-x-2">
				<img src={SONATA_DATA[echo.sonata].image} alt={echo.sonata} class="size-8" />
				<span>{echo.sonata}</span>
			</div>
			<div class="flex flex-col">
				<div class="flex flex-row items-center space-x-2">
					{#if echo.primary_stat.stat in STAT_ICONS}
						<img src={STAT_ICONS[echo.primary_stat.stat]} alt={echo.primary_stat.stat} class="size-10" />
						<span class="text-lg">{m[echo.primary_stat.stat]?.() || echo.primary_stat.stat}</span>
						<span
							class="text-lg">{BASE_STATS.includes(echo.primary_stat.stat) ? echo.primary_stat.value.toFixed(0) : (echo.primary_stat.value * 100).toFixed(1) + '%'}</span>
					{/if}
				</div>
				<div class="flex flex-row items-center space-x-2">
					{#if echo.secondary_stat.stat in STAT_ICONS}
						<img src={STAT_ICONS[echo.secondary_stat.stat]} alt={echo.secondary_stat.stat} class="size-6" />
						<span
							class="font-light">{BASE_STATS.includes(echo.secondary_stat.stat) ? echo.secondary_stat.value.toFixed(0) : (echo.secondary_stat.value * 100).toFixed(1) + '%'}</span>
					{/if}
				</div>
			</div>
		</div>
		<div class="basis-1/4 border-l-2 pl-2 pt-2 flex flex-col">
			{#each echo.sub_stats as sub_stat}
				<div class="flex flex-row items-center space-x-2">
					{#if sub_stat.stat in STAT_ICONS}
						<img src={STAT_ICONS[sub_stat.stat]} alt={sub_stat.stat} class="size-8" />
						<span>{BASE_STATS.includes(sub_stat.stat) ? sub_stat.value.toFixed(0) : (sub_stat.value * 100).toFixed(1) + '%'}</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div class="border-t-2 flex flex-row items-center justify-end gap-2">
		<Button variant="ghost" href="{base}/echoes/edit?id={echo.id}"><Pencil /></Button>
		<Button variant="ghost" onclick={() => delete_echo(echo.id)}><Trash /></Button>
	</div>
</div>