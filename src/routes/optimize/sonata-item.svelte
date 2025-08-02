<script lang="ts">
	import { type SonataKey, SONATA_DATA } from '$lib/data/sonatas';
	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';
	import { Slider } from '$lib/components/ui/slider';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import { get_message } from '$lib/messages';

	interface Props {
		sonata: SonataKey;
		allow_list: number[];
		buffs: Record<string, number>;
	}

	const { sonata, allow_list = $bindable(), buffs = $bindable() }: Props = $props();

	const data = SONATA_DATA[sonata];

	const activated = $derived(data.piece_effects.map(e => ({ piece: e, value: allow_list && allow_list.includes(e) })));

	function toggle_effect(item: { piece: number, value: boolean }) {
		allow_list.splice(allow_list.indexOf(item.piece), 1);
	}
</script>

<div class="border rounded-xl p-2 flex flex-col gap-4">
	<div class="flex flex-row items-center space-x-1">
		<img src={data.image} alt={sonata} class="size-6"/>
		<span>{get_message(sonata)}</span>
	</div>
	<div class="flex-1 px-2 flex flex-col space-y-4">
		{#each Object.entries(data.buffs) as [key, buff]}
			{#if buff.kind === 'slider'}
				<div>
					<div class="flex flex-row items-center space-x-2">
						<Input id={key} bind:value={buffs[key]} class="basis-16 h-8 rounded-xl" />
						<Label for={key}>{get_message(key)}</Label>
					</div>
					<Slider type="single" bind:value={buffs[key]} min={buff.min_value} max={buff.max_value} step={1} class="mt-2" />
				</div>
			{:else}
				<div class="flex flex-row items-center space-x-2">
					<Switch id={key} bind:checked={() => buffs[key] > 0, (v) => buffs[key] = +v} />
					<Label for={key}>{get_message(key)}</Label>
				</div>
			{/if}
		{/each}
	</div>
	<div class="mt-2 flex flex-row w-auto gap-4 justify-evenly">
		{#each activated as item}
			<div class="flex flex-row items-center gap-2">
				<Checkbox id="{sonata}-{item.piece}" checked={item.value} onCheckedChange={() => toggle_effect(item)} />
				<Label for="{sonata}-{item.piece}">Allow {item.piece}-Pc</Label>
			</div>
		{/each}
	</div>
</div>