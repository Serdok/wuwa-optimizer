<script lang="ts">
	import type { PageData } from './$types';
	import { dev } from '$app/environment';
	import { base } from '$app/paths';

	import SuperDebug, { intProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { Switch } from '$lib/components/ui/switch';
	import { Slider } from '$lib/components/ui/slider';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { type Conditional as CharacterCond, Sequence, type SliderBuff } from '$lib/types/character';
	import { type Conditional as WeaponCond } from '$lib/types/weapon';
	import { Rank } from '$lib/types/weapon';
	import { Sonata } from '$lib/types/echo';

	import { optimize } from '$lib/optimizer/optimize';
	import { all_echoes } from '$lib/mock';

	import type { OptimizerOutput } from '$lib/types/optimizer';
	import DisplayStat from './DisplayStat.svelte';
	import DisplayDamage from './DisplayDamage.svelte';
	import DisplayEcho from './DisplayEcho.svelte';

	interface Props {
		data: PageData,
	}

	const { data }: Props = $props();
	const form = superForm(data.form, {
		SPA: true,
		dataType: 'json',
		validators: zod(data.schema),
		resetForm: false,
		onUpdate: ({ form }) => {
			if (!form.valid) return;
			console.log('form ok!')

			const input = form.data;
			results = optimize(input, all_echoes);
			console.log(results);
		}
	});

	const { form: form_data, allErrors, enhance } = form;

	const selected_character = $derived($form_data.character.name && data.characters[$form_data.character.name]);
	const selected_weapon = $derived($form_data.weapon.name && data.weapons[$form_data.weapon.name]);

	const sequence_proxy = intProxy(form, 'character.sequence');
	const rank_proxy = intProxy(form, 'weapon.rank');

	let toggle_conditionals: { character: Record<string, boolean>, weapon: Record<string, boolean> } = $state({ character: {}, weapon: {} });
	let slider_conditionals: { character: Record<string, number[]>, weapon: Record<string, number[]>} = $state({ character: {}, weapon: {} });

	let results: OptimizerOutput[] = $state([]);
	let crit_option: 'non_crit' | 'average' | 'crit' = $state('average');

	function on_character_change(value: string) {
		const character = data.characters[value];
		if (selected_weapon && character.weapon_type !== selected_weapon.weapon_type) {
			// reset weapon if type differs
			$form_data.weapon.name = '';
		}

		const is_slider = (entry: [string, CharacterCond]): entry is [string, SliderBuff] => entry[1].kind === 'slider';

		// reset conditionals
		$form_data.character.conditionals = Object.fromEntries(
			Object.entries(character.conditionals).map(([key, cond]) => [key, cond.value])
		);
		toggle_conditionals['character'] = Object.fromEntries(
			Object.entries(character.conditionals).filter(c => c[1].kind === 'switch').map(([key, cond]) => [key, cond.value > 0])
		);
		slider_conditionals['character'] = Object.fromEntries(
			Object.entries(character.conditionals).filter(is_slider).map(([key, cond]) => [key, [cond.value]])
		)
	}

	function on_sequence_change(value: string) {
		// reset conditionals
		Object.entries($form_data.character.conditionals).forEach(([key,]) => {
			if (selected_character && selected_character.conditionals[key].sequence > Number(value)) {
				$form_data.character.conditionals[key] = 0;
				if (selected_character.conditionals[key].kind === 'switch') toggle_conditionals['character'][key] = false;
				if (selected_character.conditionals[key].kind === 'slider') slider_conditionals['character'][key] = [0];
			}
		})
	}

	function on_weapon_change(value: string) {
		const weapon = data.weapons[value];

		const is_slider = (entry: [string, WeaponCond]): entry is [string, SliderBuff] => entry[1].kind === 'slider';

		// reset conditionals
		$form_data.weapon.conditionals = Object.fromEntries(
			Object.entries(weapon.conditionals).map(([key, cond]) => [key, cond.value])
		);
		toggle_conditionals.weapon = Object.fromEntries(
			Object.entries(weapon.conditionals).filter(c => c[1].kind === 'switch').map(([key, cond]) => [key, cond.value > 0])
		);
		slider_conditionals.weapon = Object.fromEntries(
			Object.entries(weapon.conditionals).filter(is_slider).map(([key, cond]) => [key, [cond.value]])
		);
	}

	function on_buff_toggle(entity: 'character' | 'weapon', key: string, value: boolean) {
		$form_data[entity].conditionals[key] = +value;
	}

	function on_buff_input_change(entity: 'character' | 'weapon', key: string) {
		$form_data[entity].conditionals[key] = slider_conditionals[entity][key][0];
	}

	function on_buff_slide(entity: 'character' | 'weapon', key: string, value: number[]) {
		$form_data[entity].conditionals[key] = value[0];
	}
</script>

<form method="post" use:enhance>
	<Tabs.Root value="character">
		<Tabs.List>
			<Tabs.Trigger value="character">Character</Tabs.Trigger>
			<Tabs.Trigger value="equipment">Equipment</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="character">
			<Card.Root>
				<Card.Header>
					<Card.Title>Character setup</Card.Title>
					<Card.Description>Choose a character, weapon and associated buffs</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-row justify-around gap-4">
						<div class="w-72 border rounded-lg overflow-hidden relative">
							{#if selected_character}
								<img src="{selected_character.image.portrait}" alt="{selected_character.name}" class="scale-125"/>
							{/if}
						</div>

						<Card.Root class="w-72">
							<Card.Content>
								<Form.Fieldset {form} name="character" class="flex flex-row items-center">
									<Form.Legend>Character</Form.Legend>
									<Form.Field {form} name="character.name" class="flex-1">
										<Form.Control>
											{#snippet children({ props })}
												<Select.Root type="single" bind:value={$form_data.character.name} onValueChange={on_character_change}>
													<Select.Trigger {...props}>
														{#if selected_character}
															{selected_character.name}
														{:else}
															Select a character
														{/if}
													</Select.Trigger>
													<Select.Content>
														{#each Object.entries(data.characters) as [key, character] (key)}
															<Select.Item label={character.name} value={key}/>
														{/each}
													</Select.Content>
												</Select.Root>
											{/snippet}
										</Form.Control>
									</Form.Field>
									<Form.Field {form} name="character.sequence">
										<Form.Control>
											{#snippet children({ props })}
												<Select.Root type="single" bind:value={$sequence_proxy} onValueChange={on_sequence_change}>
													<Select.Trigger {...props}>
														{#if $form_data.character.sequence}
															S{$form_data.character.sequence}
														{:else}
															S0
														{/if}
													</Select.Trigger>
													<Select.Content>
														{#each Sequence as seq}
															<Select.Item label="S{seq}" value={seq.toString()}/>
														{/each}
													</Select.Content>
												</Select.Root>
											{/snippet}
										</Form.Control>
									</Form.Field>
								</Form.Fieldset>
								<Form.Fieldset {form} name="weapon" class="flex flex-row items-center mt-4">
									<Form.Legend>Weapon</Form.Legend>
									<Form.Field {form} name="weapon.name" class="flex-1">
										<Form.Control>
											{#snippet children({ props })}
												<Select.Root type="single" bind:value={$form_data.weapon.name} onValueChange={on_weapon_change}>
													<Select.Trigger {...props}>
														{#if selected_weapon}
															{selected_weapon.name}
														{:else}
															Select a weapon
														{/if}
													</Select.Trigger>
													<Select.Content>
														{#each Object.entries(data.weapons).filter(w => selected_character && w[1].weapon_type === selected_character.weapon_type) as [key, weapon] (key)}
															<Select.Item label={weapon.name} value={key}/>
														{/each}
													</Select.Content>
												</Select.Root>
											{/snippet}
										</Form.Control>
									</Form.Field>
									<Form.Field {form} name="weapon.rank">
										<Form.Control>
											{#snippet children({ props })}
												<Select.Root type="single" bind:value={$rank_proxy}>
													<Select.Trigger {...props}>
														{#if $form_data.weapon.rank}
															R{$form_data.weapon.rank}
														{:else}
															R1
														{/if}
													</Select.Trigger>
													<Select.Content>
														{#each Rank as rk}
															<Select.Item label="R{rk}" value={rk.toString()}/>
														{/each}
													</Select.Content>
												</Select.Root>
											{/snippet}
										</Form.Control>
									</Form.Field>
								</Form.Fieldset>
							</Card.Content>
						</Card.Root>

						<Card.Root class="w-72">
							<Card.Content>
								<Form.Fieldset {form} name="character.conditionals">
									<Form.Legend>Character conditionals</Form.Legend>
									{#if selected_character}
										<div class="flex flex-col gap-4 pt-2">
											{#each Object.entries(selected_character.conditionals) as [key, conditional] (key)}
												<Form.ElementField {form} name="character.conditionals.{key}">
													<Form.Control>
														{#snippet children({ props })}
															{#if conditional.kind === 'switch'}
																<div class="flex flex-row items-center justify-between">
																	<Form.Label>{conditional.name}</Form.Label>
																	<Switch {...props} bind:checked={toggle_conditionals.character[key]} onCheckedChange={(value) => on_buff_toggle('character', key, value)} disabled={conditional.sequence > $form_data.character.sequence}/>
																</div>
															{/if}
															{#if conditional.kind === 'slider'}
																<div class="flex flex-row items-center justify-between">
																	<Form.Label>{conditional.name}</Form.Label>
																	<Input {...props} bind:value={slider_conditionals.character[key][0]} onchange={() => on_buff_input_change('character', key)} disabled={conditional.sequence > $form_data.character.sequence} class="w-16"/>
																</div>
																<Slider min={conditional.min_value} max={conditional.max_value} step={1} bind:value={slider_conditionals.character[key]} onValueCommit={(value) => on_buff_slide('character', key, value)} disabled={conditional.sequence > $form_data.character.sequence}/>
															{/if}
														{/snippet}
													</Form.Control>
												</Form.ElementField>
											{/each}
										</div>
									{/if}
								</Form.Fieldset>
							</Card.Content>
						</Card.Root>

						<Card.Root class="w-72">
							<Card.Content>
								<Form.Fieldset {form} name="weapon.conditionals">
									<Form.Legend>Weapons conditionals</Form.Legend>
									{#if selected_weapon}
										<div class="flex flex-col gap-4 pt-2">
											{#each Object.entries(selected_weapon.conditionals) as [key, conditional] (key)}
												<Form.ElementField {form} name="weapon.conditionals.{key}">
													<Form.Control>
														{#snippet children({ props })}
															{#if conditional.kind === 'switch'}
																<div class="flex flex-row items-center justify-between">
																	<Form.Label>{conditional.name}</Form.Label>
																	<Switch {...props} bind:checked={toggle_conditionals.weapon[key]} onCheckedChange={(value) => on_buff_toggle('weapon', key, value)}/>
																</div>
															{/if}
															{#if conditional.kind === 'slider'}
																<div class="flex flex-row items-center justify-between">
																	<Form.Label>{conditional.name}</Form.Label>
																	<Input {...props} bind:value={slider_conditionals.weapon[key][0]} onchange={() => on_buff_input_change('weapon', key)} class="w-16"/>
																</div>
																<Slider min={conditional.min_value} max={conditional.max_value} step={1} bind:value={slider_conditionals.weapon[key]} onValueCommit={(value) => on_buff_slide('weapon', key, value)}/>
															{/if}
														{/snippet}
													</Form.Control>
												</Form.ElementField>
											{/each}
										</div>
									{/if}
								</Form.Fieldset>
							</Card.Content>
						</Card.Root>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>

		<Tabs.Content value="equipment">
			<Card.Root>
				<Card.Header>
					<Card.Title>Equipment</Card.Title>
					<Card.Description>Choose the allowed Echo sets</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-row justify-around gap-4">
					<Card.Root>
						<Card.Content>
							<Form.Fieldset {form} name="selected_sonatas">
								<Form.Legend>Select allowed sets</Form.Legend>
								<div class="grid grid-cols-3 gap-4">
									{#each Object.values(Sonata) as sonata}
										<Form.Control>
											{#snippet children({ props })}
												<div class="space-y-2">
													<Form.Label>{sonata}</Form.Label>
													<div class="flex flex-row gap-4">
														<div class="flex flex-row items-center gap-2">
															<input type="checkbox" {...props} id="allow-2p-{sonata}" name="selected_sonatas.allow_2p" bind:group={$form_data.selected_sonatas.allow_2p} value={sonata}/>
															<Label for="allow-2p-{sonata}">2-pc</Label>
														</div>
														<div class="flex flex-row items-center gap-2">
															<input type="checkbox" {...props} id="allow-5p-{sonata}" name="selected_sonatas.allow_5p" bind:group={$form_data.selected_sonatas.allow_5p} value={sonata}/>
															<Label for="allow-5p-{sonata}">5-pc</Label>
														</div>
													</div>
												</div>
											{/snippet}
										</Form.Control>
									{/each}
								</div>
							</Form.Fieldset>
						</Card.Content>
					</Card.Root>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>

	<Form.Button disabled={$allErrors.length > 0}>Optimize</Form.Button>
</form>

<div class="flex flex-col gap-4">
	<div>
		<!-- result options -->
		<ToggleGroup.Root type="single" bind:value={crit_option}>
			<ToggleGroup.Item value="non_crit">Non-Crit.</ToggleGroup.Item>
			<ToggleGroup.Item value="average">Average</ToggleGroup.Item>
			<ToggleGroup.Item value="crit">Crit. only</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
	{#each results as result, i (i)}
		<div class="flex flex-col gap-2">
			<div>Build {i + 1}/{results.length}</div>
			<div class="grid grid-cols-5 gap-1 justify-around">
				<!-- build -->
				{#each result.build as echo}
					<DisplayEcho {echo} />
				{/each}
			</div>
			<div class="h-80 flex flex-col flex-wrap">
				<!-- damage + stats -->
				<div class="flex flex-col gap-1 px-2">
					<div class="text-xl">Stats</div>
					{#each Object.entries(result.display_stats) as [key, value] (key)}
						{#if value !== 0}
							<DisplayStat attribute={key} {value}/>
						{/if}
					{/each}
				</div>
				{#each Object.values(result.skills) as skill (skill.type)}
					<div class="flex flex-col pt-2 px-2">
						<div class="text-xl">{skill.name}</div>
						<div>
							{#each skill.motions as motion (motion.name)}
								<DisplayDamage {motion} {crit_option} />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>