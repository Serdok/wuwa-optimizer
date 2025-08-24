<script lang="ts">
	import { get_echo_image } from '$lib/data/echoes/images/index.js';
	import { SONATAS } from '$lib/data/sonatas/index.js';

	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import type { EchoDef } from '$lib/data/echoes/types';

	interface Props {
		title: string;
		echoes: EchoDef[];
		key: string;
		open: boolean;
	}

	let { title, echoes, key = $bindable(), open = $bindable() }: Props = $props();
</script>

<div class="px-3 flex flex-col items-center gap-2">
	<span class="font-semibold text-xl">{title}</span>
	<ScrollArea orientation="vertical" class="h-full">
		<div class="grid grid-cols-3 gap-2 pt-2 px-3">
			{#each echoes as echo (echo.key)}
				{@const sonata = echo.possible_sonatas.slice(0, 3)}
				{@const remaining = echo.possible_sonatas.length - sonata.length}
				<button type="button" class="relative size-36 rounded-xl aspect-square {key === echo.key ? 'ring-2 ring-white' : ''}" onclick={() => { key = echo.key; open = false; }}>
					<img src={get_echo_image(echo.key)} alt={echo.key} class="rounded-xl" />
					<span class="sr-only">{echo.key}</span>
					<span class="absolute bottom-0 right-0 flex flex-row items-center">
							{#each sonata as s}
								<img src={SONATAS[s].image} alt={s} class="backdrop-blur-lg size-8 -ml-3 first:ml-0 " />
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