<script lang="ts">
	import { ATTACKS, CHARACTERS } from '$lib/data/characters';
	import { WEAPONS } from '$lib/data/weapons';
	import { STAT_ICONS, STATS, type StatValue } from '$lib/data/stats';
	import { PRIMARY_MAIN_STATS } from '$lib/data/echoes/base_stats';
	import { type SonataKey, SONATA_DATA, SONATAS } from '$lib/data/sonatas';

	import * as Accordion from '$lib/components/ui/accordion';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	import { ChartColumnBig, LoaderCircle, Settings } from 'lucide-svelte';

	import type { OptimizerRequest, Target } from '$lib/data/optimizer';
	import { optimize } from '$lib/optimizer/optimize';

	import { db } from '$lib/db';
	import type { DamageResult } from '$lib/optimizer/build';

	import CharacterBuffs from './character-buffs.svelte';
	import WeaponBuffs from './weapon-buffs.svelte';
	import SonataItem from './sonata-item.svelte';
	import Result from './Result.svelte';

	import { m } from '$lib/paraglide/messages';
	import { get_message } from '$lib/messages';

	const first_character = $derived(Object.values(CHARACTERS)[0]);

	let key = $state('changli');
	let sequence = $state(0);
	let character = $derived(CHARACTERS[key]);

	const weapons = $derived(WEAPONS[character.weapon_type]);
	const first_weapon = $derived(Object.values(weapons)[0]);

	let weapon_key = $state('blazing_brilliance');
	let rank = $state(1);
	let weapon = $derived(weapons[weapon_key]);

	let character_buffs: Record<string, number> = $state({});
	let weapon_buffs: Record<string, number> = $state({});

	let stat_bonuses: (StatValue | null)[] = $state(Array(8).fill(null));
	const all_stats_checked = $derived(stat_bonuses.every(s => s !== null));
	const some_stats_checked = $derived(!all_stats_checked && stat_bonuses.some(s => s !== null));

	let keep_count = $state(0);
	let target_key: Target = $state({ kind: 'stat', stat: 'atk' });
	let target_dialog_open = $state(false);

	let world_level = $state(0);
	let extra_stats = $state(Object.fromEntries(STATS.map(s => [s, { stat: s, value: 0 }])) as OptimizerRequest['character']['extra_stats']);

	let allow_rainbow = $state(false);
	let allow_partial = $state(false);

	let echo_primaries: OptimizerRequest['echo']['filter']['allowed_primary_stats'] = $state({ 4: [], 3: [], 1: [] });
	let echo_buffs: OptimizerRequest['echo']['buffs'] = $state({});
	let activated_effects: OptimizerRequest['echo']['filter']['activated_effects'] = $state({});

	let results: DamageResult[] = $state([]);

	let optimizer_controller = $state();
	let optimizer_running = $state(false);
	let start_time = $state(0);
	let total_builds = $state(0);
	let tested_count = $state(0);

	let damage_selection: 'non-crit' | 'average' | 'forced-crit' = $state('average');

	function init_form() {
		key = first_character.key;
		sequence = 0;

		set_character_defaults();

		allow_rainbow = false;
		allow_partial = false;

		world_level = 8;
	}

	function on_character_change() {
		if (!character) return;
		if (!weapon || weapon.weapon_type !== character.weapon_type) {
			weapon_key = first_weapon.key;
		}

		set_character_defaults();

		reset_character_buffs();
		reset_weapon_buffs();
	}

	function set_character_defaults() {
		weapon_key = character.defaults?.weapon?.key || first_weapon.key;
		rank = character.defaults?.weapon?.rank || 1;

		keep_count = 3;
		target_key = character.defaults?.target_key || { kind: 'stat', stat: 'atk' };

		echo_primaries['4'] = character.defaults?.echo?.allowed_primary_stats?.['4'] || Object.values(PRIMARY_MAIN_STATS['4'].stats).map(s => s.stat);
		echo_primaries['3'] = character.defaults?.echo?.allowed_primary_stats?.['3'] || Object.values(PRIMARY_MAIN_STATS['3'].stats).map(s => s.stat);
		echo_primaries['1'] = character.defaults?.echo?.allowed_primary_stats?.['1'] || Object.values(PRIMARY_MAIN_STATS['1'].stats).map(s => s.stat);

		echo_buffs = Object.fromEntries(Object.values(SONATA_DATA).map(d =>
			[d.key, Object.fromEntries(Object.values(d.buffs).map(b =>
				[b.key, character.defaults?.echo?.buffs?.[d.key]?.[b.key] || 0]
			))]
		));
		activated_effects = Object.fromEntries(Object.values(SONATA_DATA).map(s => [s.key, character.defaults?.echo?.activated_effects?.[s.key] || []]));
	}

	function reset_character_buffs() {
		character_buffs = Object.fromEntries(Object.entries(character.buffs).map(([key, _]) => [key, character.defaults?.character?.buffs[key] || 0]));
	}

	function reset_weapon_buffs() {
		weapon_buffs = Object.fromEntries(Object.entries(weapon.buffs).map(([key, _]) => [key, character.defaults?.weapon?.buffs[key] || 0]));
	}

	function add_all_stats() {
		for (let i = 0; i < character.stat_bonuses.length; i += 1) {
			add_stat(i);
		}
	}

	function remove_all_stats() {
		for (let i = 0; i < character.stat_bonuses.length; i += 1) {
			remove_stat(i);
		}
	}

	function add_stat(idx: number) {
		if (idx < 0 || idx >= character.stat_bonuses.length) {
			console.error('setting idx wrong', idx, character.stat_bonuses.length);
			return;
		}

		stat_bonuses[idx] = character.stat_bonuses[idx];
	}

	function remove_stat(idx: number) {
		if (idx < 0 || idx >= character.stat_bonuses.length) {
			console.error('setting idx wrong', idx, character.stat_bonuses.length);
			return;
		}

		stat_bonuses[idx] = null;
	}

	function on_target_change(target: Target) {
		target_key = target;
		target_dialog_open = false;
	}

	async function launch_optimizer() {
		// sanitize
		const bonus_stats = $state.snapshot(stat_bonuses).filter(s => s !== null);
		const buffs = Object.fromEntries(Object.entries(character_buffs).map(([key, value]) => {
			return [key, sequence >= character.buffs[key].sequence ? +value : 0];
		}));

		const extra = $state.snapshot(extra_stats);
		for (const { stat, value } of bonus_stats) {
			extra[stat].value += value;
		}

		const input: OptimizerRequest = {
			character: {
				key,
				sequence: sequence,
				buffs,
				extra_stats: extra
			},
			weapon: {
				key: weapon_key,
				rank: rank,
				buffs: weapon_buffs
			},
			echo: {
				filter: {
					allowed_primary_stats: echo_primaries,
					activated_effects,
				},
				allow_rainbow,
				allow_partial,
				buffs: echo_buffs,
			},
			target_key,
			keep_count,
		};

		optimizer_running = true;
		start_time = performance.now();
		results = [];
		optimizer_controller = optimize(await db.echoes.toArray(), $state.snapshot(input), {
			on_progress: (data) => {
				console.log('progress', data);
				total_builds = data.total;
				tested_count = data.progress.reduce((acc, count) => acc + count, 0);
			},
			on_batch: ({ batch }) => {
				results = batch;
			},
			on_complete: (data) => {
				console.log('complete', data, `${((performance.now() - start_time) / 1000).toFixed(3)} ms`);
				optimizer_running = false;
			},
		})
	}

	$effect(() => {
		if (key === '' || !(key in CHARACTERS)) {
			key = first_character.key;
		}
	});

	init_form();
	reset_character_buffs();
	reset_weapon_buffs();
	add_all_stats();
</script>

<svelte:head>
	<title>{get_message(character.key)} - WuWa Optimizer</title>
</svelte:head>

<Tabs.Root value="character" class="">
	<Tabs.List>
		<Tabs.Trigger value="character">{m.character()}</Tabs.Trigger>
		<Tabs.Trigger value="echoes">{m.echoes()}</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="character">
		<div class="grid grid-cols-3 auto-cols-fr justify-stretch gap-4">
			<div class="border rounded-lg overflow-hidden">
				<img src="{character.image.portrait}" alt="{character.key}" class="scale-125" />
			</div>
			<div class="border rounded-lg flex flex-col gap-4">
				<div class="flex-1 flex-col gap-4">
					<div class="p-2 flex flex-col gap-2">
						<span>{m.character()}</span>
						<div class="px-1 flex flex-row gap-2">
							<Select.Root type="single" bind:value={key} onValueChange={() => on_character_change()}>
								<Select.Trigger class="flex-1">{get_message(character.key)}</Select.Trigger>
								<Select.Content>
									{#each Object.values(CHARACTERS) as chr (chr.key)}
										<Select.Item label={get_message(chr.key)} value={chr.key} />
									{/each}
								</Select.Content>
							</Select.Root>
							<Select.Root type="single" bind:value={() => sequence.toString(), (v) => sequence = +v}>
								<Select.Trigger class="basis-24">S{sequence}</Select.Trigger>
								<Select.Content>
									{#each [0, 1, 2, 3, 4, 5, 6] as s (s)}
										<Select.Item label="S{s}" value={s.toString()} />
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
					</div>
					<div class="p-2 flex flex-col gap-2">
						<span>{m.weapon()}</span>
						<div class="px-1 flex flex-row gap-2">
							<Select.Root type="single" bind:value={weapon_key} onValueChange={() => reset_weapon_buffs()}>
								<Select.Trigger class="flex-1">{get_message(weapon.key)}</Select.Trigger>
								<Select.Content>
									{#each Object.values(weapons) as weap (weap.key)}
										<Select.Item label={get_message(weap.key)} value={weap.key} />
									{/each}
								</Select.Content>
							</Select.Root>
							<Select.Root type="single" bind:value={() => rank.toString(), (v) => rank = +v}>
								<Select.Trigger class="basis-24">R{rank}</Select.Trigger>
								<Select.Content>
									{#each [1, 2, 3, 4, 5] as r (r)}
										<Select.Item label="R{r}" value={r.toString()} />
									{/each}
								</Select.Content>
							</Select.Root>
						</div>

					</div>
					<div class="p-2 flex flex-col gap-2">
						<span>{m.optimizer_options()}</span>
						<div class="px-1 flex flex-col gap-1">
							<Select.Root type="single" bind:value={() => keep_count.toString(), (v) => keep_count = +v}>
								<Select.Trigger>{m.keep_top_builds({ count: keep_count })}</Select.Trigger>
								<Select.Content>
									{#each [1, 2, 3, 5] as k (k)}
										<Select.Item label="keep top {k} build(s)" value={k.toString()}>
											{m.keep_top_builds({ count: k })}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<div>Target</div>
							<Dialog.Root bind:open={target_dialog_open}>
								<Dialog.Trigger class={buttonVariants({ variant: 'secondary', class: 'justify-start px-3' })}>
									{#if target_key.kind === 'stat'}
										{get_message(target_key.stat)}
									{:else}
										{get_message(target_key.skill)} - {get_message(target_key.motion)}
									{/if}
								</Dialog.Trigger>
								<Dialog.Content class="max-w-[70%] h-2/3 flex flex-col flex-wrap gap-2">
									<Dialog.Header>
										<Dialog.Title>{m.optimization_target()}</Dialog.Title>
									</Dialog.Header>
									<div class="columns columns-4 gap-2">
										<div class="break-inside-avoid border rounded-lg p-2 flex flex-col gap-2">
											<div>{m.basic_stats()}</div>
											<div class="flex flex-col gap-1">
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'hp' })}>{m.hp()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'atk' })}>{m.atk()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'def' })}>{m.def()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'crit_rate' })}>{m.crit_rate()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'crit_dmg' })}>{m.crit_dmg()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'energy_regen' })}>{m.energy_regen()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'healing_bonus' })}>{m.healing_bonus()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: `${character.element}_bonus` })}>{get_message(`${character.element}_bonus`)}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'general_bonus' })}>{m.general_bonus()}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: `${character.element}_amplify` })}>{get_message(`${character.element}_amplify`)}</Button>
												<Button type="button" variant="ghost" onclick={() => on_target_change({ kind: 'stat', stat: 'general_amplify' })}>{m.general_amplify()}</Button>
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
						</div>
					</div>
				</div>
				<div class="flex flex-row gap-1">
					<Dialog.Root>
						<Dialog.Trigger class={buttonVariants({ variant: 'outline', class: 'flex-1' })}>
							<ChartColumnBig />
							<span>{m.extra_stats()}</span>
						</Dialog.Trigger>
						<Dialog.Content class="max-w-[80%] flex flex-col gap-2">
							<Dialog.Header>
								<Dialog.Title>{m.extra_stats()}</Dialog.Title>
							</Dialog.Header>
							<div class="grid grid-cols-3 auto-cols-fr gap-2">
								<div class="p-2 border rounded-lg flex flex-col gap-2">
									<div class="px-2">{m.main_stats()}</div>
									<div class="px-4 grid grid-cols-2 gap-1">
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-hp_p" value={extra_stats['hp_p'].value} oninput={e => extra_stats['hp_p'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-hp_p">{m.hp_p()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-hp" value={extra_stats['hp'].value} oninput={e => extra_stats['hp'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-hp">{m.hp()}</Label>
										</div>

										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-atk_p" value={extra_stats['atk_p'].value} oninput={e => extra_stats['atk_p'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-atk_p">{m.atk_p()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-atk" value={extra_stats['atk'].value} oninput={e => extra_stats['atk'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-atk">{m.atk()}</Label>
										</div>

										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-def_p" value={extra_stats['def_p'].value} oninput={e => extra_stats['def_p'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-def_p">{m.def_p()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-def" value={extra_stats['def'].value} oninput={e => extra_stats['def'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-def">{m.def()}</Label>
										</div>

										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-crit_rate" value={extra_stats['crit_rate'].value} oninput={e => extra_stats['crit_rate'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-crit_rate">{m.crit_rate()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-crit_dmg" value={extra_stats['crit_dmg'].value} oninput={e => extra_stats['crit_dmg'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-crit_dmg">{m.crit_dmg()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-energy_regen" value={extra_stats['energy_regen'].value} oninput={e => extra_stats['energy_regen'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-energy_regen">{m.energy_regen()}</Label>
										</div>
									</div>
								</div>
								<div class="p-2 border rounded-lg flex flex-col gap-2">
									<div class="px-2">{m.combat_stats()}</div>
									<div class="px-4 grid grid-cols-2 gap-1">
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-general_bonus" value={extra_stats['general_bonus'].value} oninput={e => extra_stats['general_bonus'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-general_bonus">{m.general_bonus()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-general_amplify" value={extra_stats['general_amplify'].value} oninput={e => extra_stats['general_amplify'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-general_amplify">{m.general_amplify()}</Label>
										</div>

										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-{character.element}_bonus"
														 value={extra_stats[`${character.element}_bonus`].value} oninput={e => extra_stats[`${character.element}_bonus`].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-{character.element}_bonus">{get_message(`${character.element}_bonus`)}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-{character.element}_amplify"
														 value={extra_stats[`${character.element}_amplify`].value} oninput={e => extra_stats[`${character.element}_amplify`].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-{character.element}_amplify">{get_message(`${character.element}_amplify`)}</Label>
										</div>

										{#each ATTACKS as a (a)}
											<div class="flex flex-row items-center gap-2">
												<Input id="extra-stat-{a}_bonus" value={extra_stats[`${a}_bonus`].value} oninput={e => extra_stats[`${a}_bonus`].value = +e.currentTarget.value}
															 class="basis-20" />
												<Label for="extra-stat-{a}_bonus">{get_message(`${a}_bonus`)}</Label>
											</div>
											<div class="flex flex-row items-center gap-2">
												<Input id="extra-stat-{a}_amplify" value={extra_stats[`${a}_amplify`].value} oninput={e => extra_stats[`${a}_amplify`].value = +e.currentTarget.value}
															 class="basis-20" />
												<Label for="extra-stat-{a}_amplify">{get_message(`${a}_amplify`)}</Label>
											</div>
										{/each}
									</div>
								</div>
								<div class="p-2 border rounded-lg flex flex-col gap-2">
									<div class="px-2">misc stats</div>
									<div class="px-4 flex flex-col gap-1">
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-healing_bonus" value={extra_stats['healing_bonus'].value} oninput={e => extra_stats['healing_bonus'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-healing_bonus">{m.healing_bonus()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-skill_multiplier" value={extra_stats['skill_multiplier'].value} oninput={e => extra_stats['skill_multiplier'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-skill_multiplier">{m.skill_multiplier()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-enemy_resistance" value={extra_stats['enemy_resistance'].value} oninput={e => extra_stats['enemy_resistance'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-enemy_resistance">{m.enemy_resistance()}</Label>
										</div>
										<div class="flex flex-row items-center gap-2">
											<Input id="extra-stat-enemy_def_ignore" value={extra_stats['enemy_def_ignore'].value} oninput={e => extra_stats['enemy_def_ignore'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-enemy_def_ignore">{m.enemy_def_ignore()}</Label>
										</div>
									</div>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Root>
					<Sheet.Root>
						<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>
							<Settings />
						</Sheet.Trigger>
						<Sheet.Content>
							<Sheet.Header>
								<Sheet.Title>settings</Sheet.Title>
								<Sheet.Description></Sheet.Description>
							</Sheet.Header>
							<div class="p-2 flex flex-col gap-2">
								<div class="px-2">
									<div>world</div>
									<div class="px-2 flex flex-row items-center gap-2">
										<Input id="world-level" bind:value={world_level} class="basis-16" />
										<Label for="world-level">world level</Label>
									</div>
								</div>
							</div>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</div>
			<div class="border rounded-lg">
				<Accordion.Root type="multiple" value={['character-stats', 'character-buffs', 'weapon-buffs']}>
					<Accordion.Item value="character-buffs">
						<Accordion.Trigger class="px-2">{m.character_buffs()}</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<CharacterBuffs {character} {sequence} bind:buffs={character_buffs} />
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="weapon-buffs">
						<Accordion.Trigger class="px-2">{m.weapon_buffs()}</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<WeaponBuffs {weapon} bind:buffs={weapon_buffs} />
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="character-stats">
						<Accordion.Trigger class="px-2">
							<div class="flex flex-row items-center">
								<Checkbox id="character-stats-chk" checked={all_stats_checked} indeterminate={some_stats_checked}
													disabled
													class="disabled:cursor-default disabled:opacity-100 data-[disabled=true]:cursor-default data-[disabled=true]:opacity-100" />
								<Label for="character-stats-chk" class="pl-2 peer-disabled:cursor-default peer-disabled:opacity-100">{m.character_stat_bonus()}</Label>
							</div>
						</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<div class="flex flex-row justify-center gap-2">
								<Button type="button" variant="outline" onclick={() => add_all_stats()}>add all</Button>
								<Button type="button" variant="outline" onclick={() => remove_all_stats()}>remove all</Button>
							</div>
							<div class="mt-4 grid grid-cols-2 auto-cols-fr gap-2">
								{#each character.stat_bonuses as s, i (i)}
									{@const checked = stat_bonuses[i] !== null}
									<div class="px-4 flex flex-row items-center">
										<Checkbox id="stat-{s.stat}-{i}" {checked} onCheckedChange={(v) => v ? add_stat(i) : remove_stat(i)} />
										<Label for="stat-{s.stat}-{i}" class="pl-2 flex flex-row items-center">
											<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
											<div>+{(s.value * 100).toFixed(1)}%</div>
											<div class="ml-1">{get_message(s.stat)}</div>
										</Label>
									</div>
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</div>
	</Tabs.Content>

	<Tabs.Content value="echoes">
		<div class="grid grid-cols-3 auto-cols-fr gap-2">
			<div class="p-2 border rounded-lg flex flex-col divide-y gap-4">
				<div class="px-2 flex flex-col gap-2">
					<div>4 costs</div>
					<ToggleGroup.Root type="multiple" class="px-2 flex flex-row flex-wrap gap-1" bind:value={echo_primaries['4']}>
						{#each Object.values(PRIMARY_MAIN_STATS['4'].stats) as s (s.stat)}
							<ToggleGroup.Item value={s.stat} class="min-w-max border rounded-lg">
								<div class="flex flex-row items-center gap-x-1">
									<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
									<div>{get_message(s.stat)}</div>
								</div>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
				<div class="px-2 flex flex-col gap-2">
					<div>3 costs</div>
					<ToggleGroup.Root type="multiple" class="px-2 flex flex-row flex-wrap gap-1" bind:value={echo_primaries['3']}>
						{#each Object.values(PRIMARY_MAIN_STATS['3'].stats) as s (s.stat)}
							<ToggleGroup.Item value={s.stat} class="min-w-max border rounded-lg">
								<div class="flex flex-row items-center gap-x-1">
									<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
									<div>{get_message(s.stat)}</div>
								</div>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
				<div class="px-2 flex flex-col gap-2">
					<div>1 costs</div>
					<ToggleGroup.Root type="multiple" class="px-2 flex flex-row flex-wrap gap-1" bind:value={echo_primaries['1']}>
						{#each Object.values(PRIMARY_MAIN_STATS['1'].stats) as s (s.stat)}
							<ToggleGroup.Item value={s.stat} class="min-w-fit border rounded-lg">
								<div class="flex flex-row items-center gap-x-1">
									<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
									<div>{get_message(s.stat)}</div>
								</div>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
			</div>

			<div class="col-span-2 p-2 border rounded-lg flex flex-col gap-2">
				<div class="grid grid-cols-3 gap-2">
					{#each SONATAS as sonata (sonata)}
						<SonataItem {sonata} bind:buffs={echo_buffs[sonata]} bind:allow_list={activated_effects[sonata]} />
					{/each}
				</div>
			</div>
		</div>
	</Tabs.Content>
</Tabs.Root>

{#if !optimizer_running}
	<Button type="button" onclick={() => launch_optimizer()} class="mt-2 min-w-full">optimize</Button>
{:else}
	<Button type="button" onclick={() => optimizer_controller.cancel_all()} class="mt-2 min-w-full">
		<LoaderCircle class="animate-spin" />
		cancel
	</Button>
{/if}

{#if results.length === 0}
	{#if optimizer_running}
		<div class="my-2">
			<div>Tested 0 builds out of <LoaderCircle class="inline-flex animate-spin" /></div>
			<Progress value={tested_count} max={total_builds} />
		</div>

		<div class="my-2">
			<div class="flex items-center gap-4">
				<Skeleton class="size-12 rounded-full" />
				<div class="gap-2">
					<Skeleton class="h-4 w-[250px]" />
					<Skeleton class="h-4 w-[200px]" />
				</div>
			</div>
		</div>
	{/if}
{:else}
	{@const percentage = total_builds > 0 ? (tested_count / total_builds) * 100 : 0}
	<div class="my-2">
		<div>Tested {tested_count} builds out of {total_builds} ({percentage.toFixed(2)} %)</div>
		<Progress value={tested_count} max={total_builds} />
	</div>

	<div class="my-2">
		<RadioGroup.Root orientation="horizontal" bind:value={damage_selection} required class="mx-4 flex flex-row gap-2 justify-end">
			<div>
				<RadioGroup.Item id="non-crit" value="non-crit" />
				<Label for="non-crit">non-crit</Label>
			</div>

			<div>
				<RadioGroup.Item id="average" value="average" />
				<Label for="average">average</Label>
			</div>

			<div>
				<RadioGroup.Item id="forced-crit" value="forced-crit" />
				<Label for="forced-crit">forced crit</Label>
			</div>
		</RadioGroup.Root>
	</div>
	<div class="px-2 flex flex-col gap-4 divide-y-2">
		{#each results as result, i (i)}
			<Result {result} {i} total_results={results.length} {damage_selection} target={target_key} />
		{/each}
	</div>
{/if}

