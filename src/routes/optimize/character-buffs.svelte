<script lang="ts">
	import type { CharacterDef } from '$lib/data/characters/types';
	import type { AsBuffValues, BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types.js';

	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';

	import { get_message } from '$lib/messages';

	interface Props {
		character: CharacterDef<BuffSchema<RankedBuffDef>>;
		rank: number;
		buffs: AsBuffValues<RankedBuffDef, BuffSchema<RankedBuffDef>>;
	}

	const { character, rank, buffs = $bindable() }: Props = $props();
</script>

<div class="px-2 flex flex-col gap-4">
	{#each Object.entries(character.buffs) as [key, buff]}
		{#if buff.kind === 'slider'}
			<div>
				<div class="flex flex-row items-center gap-2">
					<Input id={key} bind:value={buffs[key]} disabled={rank < buff.rank} class="basis-16 h-7" />
					<Label for={key}>{#if buff.rank > 0} (S{buff.rank}) {/if} {get_message(key)}</Label>
				</div>
				<Slider type="single" bind:value={buffs[key]} min={buff.min_value} max={buff.max_value} step={1} disabled={rank < buff.rank} class="mt-2" />
			</div>
		{:else}
			<div class="flex flex-row items-center gap-2">
				<Switch id={key} bind:checked={() => buffs[key] > 0, (v) => buffs[key] = +v} disabled={rank < buff.rank} />
				<Label for={key}>{#if buff.rank > 0} (S{buff.rank}) {/if} {get_message(key)}</Label>
			</div>
		{/if}
	{/each}
</div>