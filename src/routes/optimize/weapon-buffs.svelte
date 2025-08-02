<script lang="ts">
	import { type WeaponData, WEAPONS } from '$lib/data/weapons';

	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';

	import { get_message } from '$lib/messages';

	interface Props {
		weapon: WeaponData;
		buffs: Record<string, number>;
	}

	const { weapon, buffs = $bindable() }: Props = $props();

	const weapon_buffs = $derived(weapon.buffs);
</script>

<div class="px-2 flex flex-col gap-4">
	{#each Object.entries(weapon_buffs) as [key, buff]}
		{#if buff.kind === 'slider'}
			<div>
				<div class="flex flex-row items-center gap-2">
					<Input id={key} bind:value={buffs[key]} class="basis-16" />
					<Label for={key}>{get_message(key)}</Label>
				</div>
				<Slider type="single" bind:value={buffs[key]} min={buff.min_value} max={buff.max_value} step={1} class="mt-2" />
			</div>
		{:else}
			<div class="flex flex-row items-center gap-2">
				<Switch id={key} bind:checked={() => buffs[key] > 0, (v) => buffs[key] = +v} class="" />
				<Label for={key}>{get_message(key)}</Label>
			</div>
		{/if}
	{/each}
</div>