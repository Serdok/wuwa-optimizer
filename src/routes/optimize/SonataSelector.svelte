<script lang="ts">
	import { SONATA_DATA, type SonataKey, SONATAS } from '$lib/data/sonatas';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';

	import { m } from '$lib/paraglide/messages';

	let buffs: Record<SonataKey, Record<string, number>> = $state(Object.fromEntries(SONATAS.map(s => {
		return [s, Object.fromEntries(Object.values(SONATA_DATA[s].buffs).map(b => [b.key, b.value]))];
	})));
</script>

<div class="grid grid-cols-3 gap-2">
	{#each SONATAS as sonata (sonata)}
		{@const data = SONATA_DATA[sonata]}
		<div class="border rounded-xl p-2">
			<div class="flex flex-row items-center space-x-1">
				<img src={data.image} alt={sonata} class="size-6"/>
				<span>{m[sonata]?.() || sonata}</span>
			</div>
			<div class="mt-4 px-2 flex flex-col space-y-4">
				{#each Object.entries(data.buffs) as [key, buff]}
					{#if buff.kind === 'slider'}
						<div>
							<div class="flex flex-row items-center space-x-2">
								<Input id={key} bind:value={buffs[sonata][key]} class="basis-16 h-8 rounded-xl" />
								<Label for={key}>{m[key]?.() || key}</Label>
							</div>
							<Slider type="single" bind:value={buffs[sonata][key]} min={buff.min_value} max={buff.max_value} step={1} class="mt-2" />
						</div>
					{:else}
						{@const checked = buffs[sonata][key] > 0}
						<div class="flex flex-row items-center space-x-2">
							<Switch id={key} {checked} onCheckedChange={chk => buffs[sonata][key] = +chk} />
							<Label for={key}>{m[key]?.() || key}</Label>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>