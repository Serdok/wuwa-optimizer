<script lang="ts">
	import type { CharacterKey } from '$lib/data/characters/types';
	import { CHARACTERS } from '$lib/data/characters';

	import * as Select from '$lib/components/ui/select';

	import { get_message } from '$lib/messages';

	interface Props {
		key: CharacterKey;
		rank: number;
	}

	let { key = $bindable(), rank = $bindable() }: Props = $props();

</script>

<div class="px-1 flex flex-row gap-2">
	<Select.Root type="single" bind:value={key}>
		<Select.Trigger class="flex-1">{get_message(key)}</Select.Trigger>
		<Select.Content>
			{#each Object.values(CHARACTERS) as chr (chr.key)}
				<Select.Item label={get_message(chr.key)} value={chr.key} />
			{/each}
		</Select.Content>
	</Select.Root>
	<Select.Root type="single" bind:value={() => rank.toString(), (v) => rank = +v}>
		<Select.Trigger class="basis-24">S{rank}</Select.Trigger>
		<Select.Content>
			{#each [0, 1, 2, 3, 4, 5, 6] as s (s)}
				<Select.Item label="S{s}" value={s.toString()} />
			{/each}
		</Select.Content>
	</Select.Root>
</div>