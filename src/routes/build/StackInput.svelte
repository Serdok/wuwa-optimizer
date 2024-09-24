<script lang="ts">
	import type { Character, CharacterStackMetadata } from '$lib/types/character';
	import { clamp, object_has_prop } from '$lib/utils';

	const { stack, on_update = () => {} }: { stack: CharacterStackMetadata, on_update?: (name: string, value: number) => void } = $props();

	let is_active = $state(false);
	let value: number = $state(stack.default_value);

	function update_value() {
		if (object_has_prop(stack, 'max_stacks')) {
			value = clamp(value, 0, stack.max_stacks);
		} else {
			value = is_active ? 1 : 0;
		}

		on_update(stack.name, value);
	}
</script>

<div>
	{#if !!stack.max_stacks}
		<label class="text-sm">
			<input type="number" bind:value={value} min="0" max="{stack.max_stacks}" onchange="{update_value}" class="h-6 text-xs bg-indigo-600 rounded"/>
			{stack.name}
			<input type="range" bind:value={value} min="0" max="{stack.max_stacks}" onchange="{update_value}" class="text-xs bg-indigo-600"/>
			{value}
		</label>
	{:else}
		<label class="text-sm">
			<input type="checkbox" bind:checked={is_active} onchange="{update_value}" class="text-xs bg-indigo-600 rounded"/>
			{stack.name}
		</label>
	{/if}
</div>