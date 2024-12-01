<script lang="ts">
	import type { PageData } from './$types';

	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import SuperDebug, { intProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	import { type Cost, type EchoData, Quality } from '$lib/types/echo';
	import { type Attribute, BaseAttribute } from '$lib/types/stat';
	import { attribute_asset } from '$lib/data/attribute';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	import { Star, Trash } from 'lucide-svelte';
	import { sonata_assets } from '$lib/data/sonata';
	import { db } from '$lib/db';
	import { invalidateAll } from '$app/navigation';


	interface Props {
		data: PageData,
	}

	let { data }: Props = $props();
	const form = superForm(data.form, {
		SPA: true,
		dataType: 'json',
		validators: zod(data.schema),
		resetForm: false,
		onUpdate: async ({ form }) => {
			if (!form.valid) return;
			console.log('form ok!')
			db.echoes.put({
				id: data.id,
				...form.data.echo,
				main_stat: {
					primary: { attribute: form.data.echo.main_stat.primary.attribute, value: flat_value!, },
					secondary: { attribute: form.data.echo.main_stat.secondary.attribute, value: main_value!, },
				},
				cost: selected!.cost,
				class: selected!.class,
				image: selected!.image,
			})
		}
	});

	const { form: form_data, allErrors, enhance } = form;

	const quality_proxy = intProxy(form, 'echo.quality');
	const level_proxy = intProxy(form, 'echo.level');

	let selected: EchoData | undefined = $derived(data.echoes.all.find(e => e.name === $form_data.echo.name));

	const max_level = $derived($form_data.echo.quality * 5);
	const max_tuning = $derived(Math.min(max_level, Math.floor($form_data.echo.level / 5)));

	const main_stats = $derived(selected && data.stats.secondary[selected.cost].stats);
	const main_value = $derived.by(() => {
		if (!main_stats) return undefined;
		const value = main_stats[$form_data.echo.main_stat.secondary.attribute].values[$form_data.echo.quality];
		return value.base * (1 + $form_data.echo.level * 0.16);
	});

	const flat_stat = $derived(selected && data.stats.primary[selected.cost].stats);
	const flat_value = $derived.by(() => {
		if (!flat_stat) return undefined;
		const value = Object.values(flat_stat)[0].values[$form_data.echo.quality];
		return value.base * (1 + $form_data.echo.level * 0.16);
	})



	function on_echo_select(echo: string | undefined) {
		if (!echo) return;

		const echo_data = data.echoes.all.find(e => e.name === echo);
		if (!echo_data) return;

		if (!echo_data.sonatas.includes($form_data.echo.sonata)) {
			$form_data.echo.sonata = echo_data.sonatas[0];
		}

		if (!($form_data.echo.main_stat.primary.attribute in data.stats.primary[echo_data.cost].stats)) {
			const first_option = Object.values(data.stats.primary[echo_data.cost].stats)[0];
			$form_data.echo.main_stat.primary.attribute = first_option.attribute;
			$form_data.echo.main_stat.primary.value = first_option.values[$form_data.echo.quality].base * (1 + $form_data.echo.level * 0.16);
		}

		reset_main_stat_to_first_value($form_data.echo.main_stat.secondary.attribute, echo_data.cost, $form_data.echo.quality, $form_data.echo.level);
		// if (!($form_data.echo.main_stat.secondary.attribute in data.stats.secondary[echo_data.cost].stats)) {
		// 	const first_option = Object.values(data.stats.secondary[echo_data.cost].stats)[0];
		// 	$form_data.echo.main_stat.secondary.attribute = first_option.attribute;
		// 	$form_data.echo.main_stat.secondary.value = first_option.values[$form_data.echo.quality].base * (1 + $form_data.echo.level * 0.16);
		// }
	}

	function on_main_stat_select(attr: string | undefined) {
		if (!attr || !selected) return;

		reset_main_stat_to_first_value($form_data.echo.main_stat.secondary.attribute, selected.cost, $form_data.echo.quality, $form_data.echo.level);
	}

	function reset_main_stat_to_first_value(attr: Attribute, cost: Cost, quality: Quality, level: number) {
		if (!(attr in data.stats.secondary[cost].stats)) {
			const first_option = Object.values(data.stats.secondary[cost].stats)[0];
			$form_data.echo.main_stat.secondary.attribute = first_option.attribute;
			$form_data.echo.main_stat.secondary.value = first_option.values[quality].base * (1 + level * 0.16);
		}
	}

	function clear_next_sub_stats(attr: Attribute, idx: number) {
		for (let i = idx + 1; i < $form_data.echo.sub_stats.length; i += 1) {
			if ($form_data.echo.sub_stats[i].attribute === attr) {
				$form_data.echo.sub_stats[i].attribute = undefined;
				$form_data.echo.sub_stats[i].value = 0;
			}
		}
	}

	function is_sub_stat_present(attr: Attribute, idx: number) {
		for (let i = 0; i < idx; i += 1) {
			if ($form_data.echo.sub_stats[i].attribute === attr) return true;
		}

		return false;
	}

	$effect(() => {
		// if (main_value) {
		// 	$form_data.echo.main_stat.secondary.value = main_value;
		// }
		// if (flat_stat && flat_value) {
		// 	$form_data.echo.main_stat.primary.attribute = Object.values(flat_stat)[0].attribute;
		// 	$form_data.echo.main_stat.primary.value = flat_value;
		// }

		if ($form_data.echo.sub_stats.length > max_tuning) {
			$form_data.echo.sub_stats = $form_data.echo.sub_stats.filter((_, idx) => idx < max_tuning)
		}

		for (let i = 0; i < $form_data.echo.sub_stats.length; i += 1) {
			const stat = $form_data.echo.sub_stats[i];
			if (!stat.attribute) continue;
			const ref = data.stats.subs[stat.attribute];
			if (!ref.values.includes(stat.value)) {
				$form_data.echo.sub_stats[i].value = ref.values[0];
			}
		}
	});
</script>


<form method="post" class="flex flex-col gap-2 border-2 p-2" use:enhance>
	<div class="flex flex-row gap-2 p-2">
		<div class="aspect-square">
			{#if selected}
				<img src="{base}/assets/echo/head/{selected.image.head}" alt="{selected.name}" class="size-56"/>
			{:else}
				<img src="{base}/assets/echo/head/T_IconMonsterHead00_UI.png" alt="placeholder" class="size-56"/>
			{/if}
		</div>
		<div class="flex-1 flex flex-col space-y-2">
			<div class="flex flex-row items-center gap-2">
				<Form.Field {form} name="echo.name" class="flex-1">
					<Form.Control>
						{#snippet children({ props })}
							<Select.Root type="single" bind:value={$form_data.echo.name} onValueChange={on_echo_select}>
								<Select.Trigger {...props}>
									{#if selected}
										{selected.name}
									{:else}
										Select an echo
									{/if}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.GroupHeading>Calamity</Select.GroupHeading>
										{#each data.echoes.calamity as echo (echo.label)}
											<Select.Item {...echo}/>
										{/each}
									</Select.Group>
									<Select.Group>
										<Select.GroupHeading>Overlord</Select.GroupHeading>
										{#each data.echoes.overlord as echo (echo.label)}
											<Select.Item {...echo}/>
										{/each}
									</Select.Group>
									<Select.Group>
										<Select.GroupHeading>Elite</Select.GroupHeading>
										{#each data.echoes.elite as echo (echo.label)}
											<Select.Item {...echo}/>
										{/each}
									</Select.Group>
									<Select.Group>
										<Select.GroupHeading>Common</Select.GroupHeading>
										{#each data.echoes.common as echo (echo.label)}
											<Select.Item {...echo}/>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="echo.sonata" class="basis-1/4">
					<Form.Control>
						{#snippet children({ props })}
							<Select.Root type="single" bind:value={$form_data.echo.sonata}>
								<Select.Trigger {...props}>
									<div class="flex flex-row items-center gap-2">
										<img src="{base}/assets/sonata/{sonata_assets[$form_data.echo.sonata]}" alt={$form_data.echo.sonata} class="border-2 border-white rounded-full w-8" />
										<span class="font-semibold">{$form_data.echo.sonata}</span>
									</div>
								</Select.Trigger>
								<Select.Content>
									{#if selected}
										{#each selected.sonatas as sonata}
											<Select.Item value={sonata} label={sonata}>
												<div class="flex flex-row items-center gap-2">
													<img src="{base}/assets/sonata/{sonata_assets[sonata]}" alt={sonata} class="border-2 border-white rounded-full w-6" />
													<span>{sonata}</span>
												</div>
											</Select.Item>
										{/each}
									{/if}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="echo.quality" class="basis-1/4">
					<Form.Control>
						{#snippet children({ props })}
							<RadioGroup.Root {...props} bind:value={$quality_proxy} orientation="horizontal" class="flex flex-row">
								<Star class="fill-white" />
								{#each Quality as q (q)}
									<RadioGroup.Item value={q.toString()} id="quality-{q}" class="sr-only"/>
									<Label for="quality-{q}">
										{#if $form_data.echo.quality >= q}
											<Star class="hover:fill-white fill-white" />
										{:else}
											<Star class="hover:fill-white" />
										{/if}
									</Label>
								{/each}
							</RadioGroup.Root>
						{/snippet}
					</Form.Control>
				</Form.Field>
			</div>
			<Form.Field {form} name="echo.level">
				<Form.Control >
					{#snippet children({ props })}
						<div class="flex flex-row gap-2">
							<Input {...props} bind:value={$level_proxy} class="flex-1"/>
							<div class="flex flex-row divide-x-2">
								<Button class="rounded-l-2xl rounded-r-none" onclick={() => $form_data.echo.level = Math.max($form_data.echo.level - 5, 0)} disabled={$form_data.echo.level === 0}>-5</Button>
								<Button class="rounded-r-2xl rounded-l-none" onclick={() => $form_data.echo.level = Math.min($form_data.echo.level + 5, max_level)} disabled={$form_data.echo.level === max_level}>+5</Button>
							</div>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>
			<fieldset class="flex flex-row gap-2 items-center">
				<Form.Field {form} name="echo.main_stat.secondary.attribute" class="basis-1/3">
					<Form.Control>
						{#snippet children({ props })}
							<Select.Root type="single" bind:value={$form_data.echo.main_stat.secondary.attribute} onValueChange={on_main_stat_select}>
								<Select.Trigger {...props}>
									<div class="flex flex-row items-center gap-2">
										<img src="{base}/assets/attribute/{attribute_asset[$form_data.echo.main_stat.secondary.attribute]}" alt={$form_data.echo.main_stat.secondary.attribute} class="w-8" />
										<span class="font-semibold">{$form_data.echo.main_stat.secondary.attribute}</span>
									</div>
								</Select.Trigger>
								<Select.Content>
									{#if main_stats}
										{#each Object.keys(main_stats) as attribute}
											<Select.Item value={attribute} label={attribute}>
												<div class="flex flex-row items-center gap-2">
													<img src="{base}/assets/attribute/{attribute_asset[attribute]}" alt={attribute} class="w-8" />
													<span class="font-semibold">{attribute}</span>
												</div>
											</Select.Item>
										{/each}
									{/if}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
				</Form.Field>
				{#if main_value}
					<div>
						{#if Object.values(BaseAttribute).includes($form_data.echo.main_stat.secondary.attribute)}
							{main_value.toFixed(0)}
						{:else}
							{(main_value * 100).toFixed(1)}%
						{/if}
					</div>
				{/if}
			</fieldset>
			{#if flat_stat && flat_value}
				<div class="mt-1 flex flex-row items-center gap-1">
					<img src="{base}/assets/attribute/{attribute_asset[Object.values(flat_stat)[0].attribute]}" alt={Object.values(flat_stat)[0].attribute} class="w-6" />
					<span>{flat_value.toFixed(0)}</span>
				</div>
			{/if}
		</div>
		<Form.Fieldset {form} name="echo.sub_stats" class="basis-1/3 border-l-4 pl-2 flex flex-col gap-1">
			{#each $form_data.echo.sub_stats as _, i}
				<Form.ElementField {form} name="echo.sub_stats[{i}]" class="flex flex-row items-center justify-between gap-4">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex-1 flex flex-row justify-between">
								<Select.Root type="single" bind:value={$form_data.echo.sub_stats[i].attribute} onValueChange={() => clear_next_sub_stats($form_data.echo.sub_stats[i].attribute, i)}>
									<Select.Trigger {...props} class="flex-1">
										{#if $form_data.echo.sub_stats[i].attribute}
											<div class="flex flex-row items-center gap-2">
												<img src="{base}/assets/attribute/{attribute_asset[$form_data.echo.sub_stats[i].attribute]}" alt={$form_data.echo.sub_stats[i].attribute} class="w-8" />
												<span class="font-semibold">{$form_data.echo.sub_stats[i].attribute}</span>
											</div>
										{:else}
											<span>Tune +{(i + 1) * 5}</span>
										{/if}
									</Select.Trigger>
									<Select.Content>
										{#each Object.entries(data.stats.subs) as [key, stat]}
											<Select.Item value={key} label={key} disabled={is_sub_stat_present(stat.attribute, i)}>
												<div class="flex flex-row items-center gap-2">
													<img src="{base}/assets/attribute/{attribute_asset[stat.attribute]}" alt={key} class="w-8" />
													<span class="font-semibold">{key}</span>
												</div>
											</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
								<Select.Root type="single" bind:value={$form_data.echo.sub_stats[i].value} disabled={!$form_data.echo.sub_stats[i].attribute}>
									<Select.Trigger {...props} class="basis-1/4">
										<div>
											{#if Object.values(BaseAttribute).includes($form_data.echo.sub_stats[i].attribute)}
												{$form_data.echo.sub_stats[i].value.toFixed(0)}
											{:else}
												{($form_data.echo.sub_stats[i].value * 100).toFixed(1)}%
											{/if}
										</div>
									</Select.Trigger>
									<Select.Content>
										{#each data.stats.subs[$form_data.echo.sub_stats[i].attribute].values as value}
											<Select.Item {value} label={value}>
												<div>
													{#if Object.values(BaseAttribute).includes($form_data.echo.sub_stats[i].attribute)}
														{value.toFixed(0)}
													{:else}
														{(value * 100).toFixed(1)}%
													{/if}
												</div>
											</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							</div>
							<Button variant="ghost" onclick={() => $form_data.echo.sub_stats = $form_data.echo.sub_stats.filter((_, idx) => idx !== i)}><Trash/></Button>
						{/snippet}
					</Form.Control>
				</Form.ElementField>
			{/each}
			{#if $form_data.echo.sub_stats.length < max_tuning}
				<Button onclick={() => $form_data.echo.sub_stats = [...$form_data.echo.sub_stats, { attribute: undefined, value: 0, }]}>Add a tuning level</Button>
			{/if}
		</Form.Fieldset>
	</div>
	<Form.Button disabled={$allErrors.length > 0}>Save</Form.Button>
</form>

{#if dev}
	<SuperDebug data={form_data}/>
{/if}