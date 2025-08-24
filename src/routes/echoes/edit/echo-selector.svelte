<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';

	import { COST_1, COST_3, COST_4 } from '$lib/data/echoes';
	import type { EchoDef } from '$lib/data/echoes/types';
	import { get_echo_image } from '$lib/data/echoes/images';

	import EchoSelectorItem from './echo-selector-item.svelte';

	interface Props {
		key: string;
		open: boolean;
		selected: EchoDef;
	}

	let { key = $bindable(), open = $bindable(false), selected }: Props = $props();

	let filter = $state('');

	const cost_4 = $derived(COST_4.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
	const cost_3 = $derived(COST_3.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
	const cost_1 = $derived(COST_1.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger type="button">
		<img src={get_echo_image(selected.key)} alt={selected.key} class="rounded-xl size-72" />
	</Dialog.Trigger>
	<Dialog.Content class="w-4/5 h-3/4 flex flex-col gap-2">
		<Dialog.Header>
			<Dialog.Title>
				<Input bind:value={filter} placeholder='Search...' class="mx-auto w-2/3" />
			</Dialog.Title>
		</Dialog.Header>
		<div class="flex-1 grid grid-cols-3 auto-rows-fr divide-x-2 gap-x-2 overflow-y-hidden">
			<EchoSelectorItem title="4-cost" echoes={cost_4} bind:key bind:open />
			<EchoSelectorItem title="3-cost" echoes={cost_3} bind:key bind:open />
			<EchoSelectorItem title="1-cost" echoes={cost_1} bind:key bind:open />
		</div>
	</Dialog.Content>
</Dialog.Root>