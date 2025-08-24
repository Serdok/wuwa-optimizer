<script lang="ts">
	import DisplayDamage from './display-damage.svelte';

	import type { DamageSelection, MotionDamage } from '$lib/data/optimizer/types';
	import { get_message } from '$lib/messages';

	interface Props {
		motion: MotionDamage;
		damage_selection: DamageSelection,
		selected: boolean,
	}

	const { motion, damage_selection, selected }: Props = $props();

	let node: HTMLDivElement;

	$effect(() => {
		node.dataset.selected = selected ? "true" : "false";
	})
</script>

<div bind:this={node} class="px-2 flex flex-row justify-between gap-2 data-[selected=true]:border-2 data-[selected=true]:border-red-400">
	<div>{get_message(motion.key)}</div>
	<div>
		<DisplayDamage values={motion.damage[damage_selection]} />
	</div>
</div>