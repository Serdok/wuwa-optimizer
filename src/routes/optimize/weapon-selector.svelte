<script lang="ts" generics="WT extends WeaponType">
	import type { WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';

	import * as Select from "$lib/components/ui/select";

	import { get_weapon_keys_of_type } from '$lib/data/weapons/utils';

	import { get_message } from '$lib/messages';

	interface Props {
		weapon_type: WT;
		key: WeaponKeysFor<WT>;
		rank: number
	}

	let { weapon_type, key = $bindable(), rank = $bindable() }: Props = $props();

	const weapon_keys = $derived(get_weapon_keys_of_type(weapon_type));

	$effect(() => {
		if (!weapon_keys.includes(key)) {
			key = weapon_keys[0];
		}
	})
</script>

<div class="px-1 flex flex-row gap-2">
	<Select.Root type="single" bind:value={key}>
		<Select.Trigger class="flex-1">{get_message(key)}</Select.Trigger>
		<Select.Content>
			{#each weapon_keys as k (k)}
				<Select.Item label={get_message(k)} value={k} />
			{/each}
		</Select.Content>
	</Select.Root>
	<Select.Root type="single" bind:value={() => rank.toString(), (v) => rank = +v}>
		<Select.Trigger class="basis-24">R{rank}</Select.Trigger>
		<Select.Content>
			{#each [1, 2, 3, 4, 5] as r (r)}
				<Select.Item label="R{r}" value={r.toString()} />
			{/each}
		</Select.Content>
	</Select.Root>
</div>