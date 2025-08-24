<script lang="ts" generics="WT extends WeaponType">
	import type { WeaponType, WeaponKeysFor } from '$lib/data/weapons/types';
	import type { AsBuffValues, BuffDef, BuffSchema } from '$lib/data/optimizer/types';

	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';

	import { get_weapon } from '$lib/data/weapons/utils';

	import { get_message } from '$lib/messages';

	interface Props {
		weapon_type: WT;
		key: WeaponKeysFor<WT>;
		buffs: AsBuffValues<BuffDef, BuffSchema<BuffDef>>;
	}

	const { weapon_type, key, buffs = $bindable() }: Props = $props();

	const weapon = $derived(get_weapon(weapon_type, key));
</script>

<div class="px-2 flex flex-col gap-4">
	{#each Object.entries(weapon.buffs) as [key, buff]}
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
				<Switch id={key} bind:checked={() => buffs[key] > 0, (v) => buffs[key] = +v} />
				<Label for={key}>{get_message(key)}</Label>
			</div>
		{/if}
	{/each}
</div>