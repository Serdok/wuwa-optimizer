<script lang="ts">
	import type { Echo } from '$lib/types/echo';
	import DisplayStat from './DisplayStat.svelte';

	interface Props {
		echo: Echo
	}

	let { echo }: Props = $props();
</script>

<div class="flex flex-col">
	<div><span class="font-bold">{echo.name}</span> (+{echo.level})</div>
	<DisplayStat {...echo.main_stat.secondary} />
	<div class="flex flex-col">
		{#each echo.sub_stats as sub_stat}
			<DisplayStat {...sub_stat} />
		{/each}
	</div>
</div>