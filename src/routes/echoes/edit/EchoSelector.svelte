<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	import { COST_1, COST_3, COST_4 } from '$lib/data/echoes';
	import type { EchoData } from '$lib/data/echoes/types';
	import { SONATA_DATA } from '$lib/data/sonatas';
	import { get_echo_image } from '$lib/data/echoes/images';

	interface Props {
		key: string;
		open: boolean;
		selected: EchoData;
	}

	let { key = $bindable(), open = $bindable(false), selected }: Props = $props();

	let filter = $state('');

	const cost_4 = $derived(COST_4.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
	const cost_3 = $derived(COST_3.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
	const cost_1 = $derived(COST_1.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
</script>

{#snippet selector(title, echoes)}
	<div class="px-3 flex flex-col items-center gap-2">
		<span class="font-semibold text-xl">{title}</span>
		<ScrollArea orientation="vertical" class="h-full">
			<div class="grid grid-cols-3 gap-2 pt-2 px-3">
				{#each echoes as echo}
					{@const sonata = echo.possible_sonatas.slice(0, 3)}
					{@const remaining = echo.possible_sonatas.length - sonata.length}
					<button type="button" class="relative size-36 rounded-xl aspect-square {key === echo.key ? 'ring-2 ring-white' : ''}" onclick={() => { key = echo.key; open = false; }}>
						<img src={get_echo_image(echo.key)} alt={echo.key} class="rounded-xl" />
						<span class="sr-only">{echo.key}</span>
						<span class="absolute bottom-0 right-0 flex flex-row items-center">
							{#each sonata as s}
								<img src={SONATA_DATA[s].image} alt={s} class="backdrop-blur-lg size-8 -ml-3 first:ml-0 " />
							{/each}
							{#if remaining > 0}
								<span class="bg-gray-700 size-8 rounded-full flex items-center justify-center border-2 border-white -ml-3 z-10">+{remaining}</span>
							{/if}
						</span>
					</button>
				{/each}
			</div>
		</ScrollArea>
	</div>
{/snippet}

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
			{@render selector('4-cost', cost_4)}
			{@render selector('3-cost', cost_3)}
			{@render selector('1-cost', cost_1)}
		</div>
	</Dialog.Content>
</Dialog.Root>