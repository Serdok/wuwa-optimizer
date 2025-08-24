<script lang="ts">
	import type { CharacterKey, SkillType } from '$lib/data/characters/types';
	import type { DamageSelection, Target } from '$lib/data/optimizer/types';

	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	
	import { get_character } from '$lib/data/characters/utils';
	import { get_message } from '$lib/messages';

	interface Props {
		key: CharacterKey;
		rank: number;
		target: Target;
		damage_selection: DamageSelection;
	}

	let { key, rank, target = $bindable(), damage_selection = $bindable() }: Props = $props();

	const character = $derived(get_character(key).create_ranked(get_character(key), rank));
	
	let open = $state(false);

	function on_target_change(new_target: Target) {
		target = new_target;
		open = false;
	}

	$effect(() => {
		if (target.kind === 'motion') {
			const { skill, motion } = target;
			if (!Object.values(character.skills).some(s => s.key === skill && s.motions.some(m => m.key === motion))) {
				target = { kind: 'stat', stat: 'atk' };
			}
		}
	})
</script>

<div class="flex flex-row gap-1">
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'secondary', class: 'justify-start px-3 flex-1' })}>
			{#if target.kind === 'stat'}
				{get_message(target.stat)}
			{:else}
				{get_message(target.skill)} - {get_message(target.motion)}
			{/if}
		</Dialog.Trigger>
		<Dialog.Content class="max-w-[70%] h-2/3 flex flex-col flex-wrap gap-2">
			<Dialog.Header>
				<Dialog.Title>{get_message('optimization_target')}</Dialog.Title>
			</Dialog.Header>
			<div class="columns columns-4 gap-2">
				<div class="break-inside-avoid border rounded-lg p-2 flex flex-col gap-2">
					<div>{get_message('basic_stats')}</div>
					<div class="flex flex-col gap-1">
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'hp' })}>{get_message('hp')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'atk' })}>{get_message('atk')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'def' })}>{get_message('def')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'crit_rate' })}>{get_message('crit_rate')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'crit_dmg' })}>{get_message('crit_dmg')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'energy_regen' })}>{get_message('energy_regen')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'healing_bonus' })}>{get_message('healing_bonus')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: `${character.base_element}_bonus` })}>{get_message(`${character.base_element}_bonus`)}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'general_bonus' })}>{get_message('general_bonus')}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: `${character.base_element}_amplify` })}>{get_message(`${character.base_element}_amplify`)}</Button>
						<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'general_amplify' })}>{get_message('general_amplify')}</Button>
					</div>
				</div>
				{#each Object.values(character.skills).filter(s => s.motions.length > 0) as skill (skill.key)}
					<div class="break-inside-avoid border rounded-lg p-2 flex flex-col gap-2">
						<div class="flex flex-row items-center">
							<span class="flex-1">{get_message(skill.key)}</span>
							<Badge variant="secondary">{get_message(skill.type)}</Badge>
						</div>
						<div class="flex flex-col gap-1">
							{#each skill.motions as motion (motion.key)}
								<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'motion', skill: skill.key, motion: motion.key })}>{get_message(motion.key)}</Button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</Dialog.Content>
	</Dialog.Root>

	<Select.Root type="single" bind:value={damage_selection}>
		<Select.Trigger class={buttonVariants({ variant: 'secondary', class: 'justify-start px-3 shrink-0' })}>{get_message(damage_selection)}</Select.Trigger>
		<Select.Content>
			<Select.Item value="non_crit">{get_message('non_crit')}</Select.Item>
			<Select.Item value="average">{get_message('average')}</Select.Item>
			<Select.Item value="forced_crit">{get_message('forced_crit')}</Select.Item>
		</Select.Content>
	</Select.Root>
</div>