<script lang="ts">
	import type { OptimizedSkill } from '$lib/types/character';
	import DisplayDamage from './DisplayDamage.svelte';

	const { skill_damage, type, skill }: { skill_damage: 0 | 1 | 2, type: string, skill: OptimizedSkill } = $props();
</script>

<div class="break-inside-avoid flex flex-col px-2 rounded-md border-2">
	<div class="font-semibold">{type} - {skill.name}</div>
	<div class="flex flex-col">
		{#each skill.motions as motion (motion.name)}
			<div class="flex flex-row justify-between gap-2">
				<div class="text-sm">{motion.name}</div>
				<div class="text-sm">
					<DisplayDamage {skill_damage} hits={motion.hits} ></DisplayDamage>
				</div>
			</div>
		{/each}
	</div>
</div>
