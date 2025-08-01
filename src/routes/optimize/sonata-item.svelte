<script lang="ts">
	import { type SonataKey, SONATA_DATA } from '$lib/data/sonatas';
	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';
	import { Slider } from '$lib/components/ui/slider';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import { m } from '$lib/paraglide/messages';

	interface Props {
		sonata: SonataKey;
		on_allow_change: (state: { sonata: SonataKey, allowed: number[] }) => void;
		on_buff_change: (buff: { sonata: SonataKey, key: string, value: number }) => void;
	}

	const { sonata, on_allow_change, on_buff_change }: Props = $props();

	const data = SONATA_DATA[sonata];

	const buffs = $state(Object.fromEntries(Object.values(data.buffs).map(b => [b.key, b.value])));
	const allow_list = $state(data.piece_effects.map(p => ({ piece: p, value: false, })));
</script>

<div class="border rounded-xl p-2 flex flex-col gap-4">
	<div class="flex flex-row items-center space-x-1">
		<img src={data.image} alt={sonata} class="size-6"/>
		<span>{m[sonata]?.() || sonata}</span>
	</div>
	<div class="flex-1 px-2 flex flex-col space-y-4">
		{#each Object.entries(data.buffs) as [key, buff]}
			{#if buff.kind === 'slider'}
				<div>
					<div class="flex flex-row items-center space-x-2">
						<Input id={key} bind:value={buffs[key]} onchange={() => on_buff_change({ sonata, key, value: buffs[key] })} class="basis-16 h-8 rounded-xl" />
						<Label for={key}>{m[key]?.() || key}</Label>
					</div>
					<Slider type="single" bind:value={buffs[key]} min={buff.min_value} max={buff.max_value} step={1} onValueCommit={() => on_buff_change({ sonata, key, value: buffs[key]})} class="mt-2" />
				</div>
			{:else}
				{@const checked = buffs[key] > 0}
				<div class="flex flex-row items-center space-x-2">
					<Switch id={key} {checked} onCheckedChange={chk => { buffs[key] = +chk; on_buff_change({ sonata, key, value: buffs[key] }); }} />
					<Label for={key}>{m[key]?.() || key}</Label>
				</div>
			{/if}
		{/each}
	</div>
	<div class="mt-2 flex flex-row w-auto gap-4 justify-evenly">
		{#each allow_list as item}
			<div class="flex flex-row items-center gap-2">
				<Checkbox id="{sonata}-{item.piece}" bind:checked={item.value} onCheckedChange={() => on_allow_change({ sonata, allowed: allow_list.filter(v => v.value).map(v => v.piece) })}/>
				<Label for="{sonata}-{item.piece}">Allow {item.piece}-Pc</Label>
			</div>
		{/each}
	</div>
</div>