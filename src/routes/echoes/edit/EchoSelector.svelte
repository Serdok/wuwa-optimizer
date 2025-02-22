<script lang="ts">
	import { base } from '$app/paths';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	import { COST_1, COST_3, COST_4, type EchoData } from '$lib/data/echoes';
	import { SONATA_DATA } from '$lib/data/sonatas';

	interface Props {
		key: string;
		open: boolean;
		selected: EchoData;
	}

	let { key = $bindable(), open = false, selected }: Props = $props();

	let filter = $state('');

	const cost_4 = $derived(COST_4.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
	const cost_3 = $derived(COST_3.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
	const cost_1 = $derived(COST_1.filter(e => e.key.toLowerCase().includes(filter.toLowerCase())));
</script>

{#snippet selector(title, echoes)}
	<div class="px-3 flex flex-col items-center gap-2">
		<span class="font-semibold text-xl">{title}</span>
		<ScrollArea>
			<div class="flex flex-row flex-wrap gap-2 pt-2">
				{#each echoes as echo}
					<button type="button" class="relative size-36 rounded-xl aspect-square {key === echo.key ? 'ring-2 ring-white' : ''}" onclick={() => { key = echo.key; open = false; }}>
						<img src="{base}/assets/echoes/head/{echo.image.head}" alt={echo.key} class="rounded-xl" />
						<span class="sr-only">{echo.key}</span>
						<span class="absolute bottom-0 right-0 flex flex-row space-x-1">
							{#each echo.possible_sonatas as s}
								<img src={SONATA_DATA[s].image} alt={s} class="backdrop-blur-lg border-2 border-black dark:border-white rounded-full w-8" />
							{/each}
						</span>
					</button>
				{/each}
			</div>
		</ScrollArea>
	</div>
{/snippet}

<Dialog.Root bind:open>
	<Dialog.Trigger type="button">
		<img src="{base}/assets/echoes/head/{selected.image.head}" alt={selected.key} class="rounded-xl size-72" />
	</Dialog.Trigger>
	<Dialog.Content class="max-w-[80%] h-3/4 flex flex-col gap-2">
		<Dialog.Header>
			<Dialog.Title>
				<Input bind:value={filter} placeholder='search...' class="mx-auto w-2/3" />
			</Dialog.Title>
		</Dialog.Header>
		<div class="flex-1 grid grid-cols-3 auto-rows-fr divide-x-2 space-x-2 overflow-y-hidden">
			{@render selector('4-cost', cost_4)}
			{@render selector('3-cost', cost_3)}
			{@render selector('1-cost', cost_1)}
		</div>
	</Dialog.Content>
</Dialog.Root>