<script lang="ts">
	import type { CharacterDef } from '$lib/data/characters/types';
	import type { StatDef, StatType } from '$lib/data/stats/types';
	import type { RankedBuffDef, BuffSchema } from '$lib/data/optimizer/types';

	import { STAT_ICONS } from '$lib/data/stats/display';

	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	import { get_message } from '$lib/messages';
	import { has_icon } from '$lib/data/stats/utils';

	interface Props {
		character: CharacterDef<BuffSchema<RankedBuffDef>>;
		stats: StatDef<StatType>[];
	}

	let { character, stats = $bindable() }: Props = $props();

	const data = $derived(character.stat_bonus);
	let checked_stats = $state<boolean[]>(Array(character.stat_bonus.length).fill(true));

	function synchronize_stats() {
		stats = data.filter((_, i) => checked_stats[i]);
	}

	function add_all_stats() {
		checked_stats = Array(character.stat_bonus.length).fill(true);
		synchronize_stats();
	}

	function remove_all_stats() {
		checked_stats = Array(character.stat_bonus.length).fill(false);
		synchronize_stats();
	}

	function toggle_stat(i: number, checked?: boolean) {
		const target = checked ?? !checked_stats[i];
		if (checked_stats[i] === target) return;
		checked_stats[i] = target;
		synchronize_stats();
	}

	synchronize_stats();
</script>

<div class="flex flex-row justify-center gap-2">
	<Button type="button" variant="outline" onclick={() => add_all_stats()}>Add all</Button>
	<Button type="button" variant="outline" onclick={() => remove_all_stats()}>Remove all</Button>
</div>
<div class="grid grid-cols-2 auto-cols-fr gap-2">
	{#each data as s, i (i)}
		{@const checked = checked_stats[i]}
		<div class="px-4 flex flex-row items-center">
			<Checkbox id="stat-{s.stat}-{i}" {checked} onCheckedChange={(v) => toggle_stat(i, v)} />
			<Label for="stat-{s.stat}-{i}" class="pl-2 flex flex-row items-center">
				{#if has_icon(s.stat)}
					<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-5" />
				{/if}
				<div class="flex flex-row items-center">
					<div>{get_message(s.stat)}</div>
					<div class="ml-0">+{(s.value * 100).toFixed(1)}%</div>
				</div>
			</Label>
		</div>
	{/each}
</div>