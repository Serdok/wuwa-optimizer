<script lang="ts">
	import { base } from '$app/paths';

	import { ATTACKS, CHARACTERS } from '$lib/data/characters';
	import { WEAPONS } from '$lib/data/weapons';
	import { BASE_STATS, STAT_ICONS, type StatKey, STATS, type StatValue } from '$lib/data/stats';
	import { PRIMARY_MAIN_STATS } from '$lib/data/echoes/base_stats';
	import { type SonataKey, SONATA_DATA, SONATAS } from '$lib/data/sonatas';

	import * as Accordion from '$lib/components/ui/accordion';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	import { ChartColumnBig, LoaderCircle, Settings } from 'lucide-svelte';

	import type { OptimizerInput } from '$lib/optimizer';
	import { WorkerPool, type WorkerResult } from '$lib/optimizer/worker_pool';
	import { optimize } from '$lib/optimizer/optimize';
	import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

	import { m } from '$lib/paraglide/messages';
	import { get_echo_image } from '$lib/data/echoes/images';

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
	$inspect(weapon_buffs);

	let stat_bonuses: (StatValue | null)[] = $state(Array(8).fill(null));
	const all_stats_checked = $derived(stat_bonuses.every(s => s !== null));
	const some_stats_checked = $derived(!all_stats_checked && stat_bonuses.some(s => s !== null));

	let keep_count = $state(0);
	let target_key = $state('');
	let target_dialog_open = $state(false);

	let world_level = $state(0);
	let extra_stats = $state(Object.fromEntries(STATS.map(s => [s, {
		stat: s,
		value: 0
	}])) as Record<StatKey, StatValue>);

	let allowed_sonatas: { '2-p': SonataKey[], '5-p': SonataKey[] } = $state({ '2-p': [], '5-p': [] });
	let allow_rainbow = $state(false);
	let allow_partial = $state(false);

	let echo_primaries: { 4: StatKey[], 3: StatKey[], 1: StatKey[] } = $state({ 4: [], 3: [], 1: [] });

	let results = $state([] as WorkerResult[]);
	let is_running = $state(false);

	let damage_selection = $state('average');

	// initialize workers
	const threads = Math.min(24, navigator.hardwareConcurrency - 1); // leave 1 core available!
	const pool = new WorkerPool(threads);

	function init_form() {
		key = first_character.key;
		sequence = 0;
		weapon_key = first_weapon.key;
		rank = 1;

		keep_count = 3;
		target_key = 'atk';

		allowed_sonatas['2-p'] = [];
		allowed_sonatas['5-p'] = Object.values(SONATA_DATA).map(s => s.key);
		allow_rainbow = false;
		allow_partial = false;

		echo_primaries['4'] = Object.values(PRIMARY_MAIN_STATS['4'].stats).map(s => s.stat);
		echo_primaries['3'] = Object.values(PRIMARY_MAIN_STATS['3'].stats).map(s => s.stat);
		echo_primaries['1'] = Object.values(PRIMARY_MAIN_STATS['1'].stats).map(s => s.stat);

		world_level = 8;
	}

	function on_character_change() {
		if (!character) return;
		if (!weapon || weapon.weapon_type !== character.weapon_type) {
			weapon_key = first_weapon.key;
		}

		reset_character_buffs();
		reset_weapon_buffs();
	}

	function reset_character_buffs() {
		character_buffs = Object.fromEntries(Object.entries(character.buffs).map(([key, buff]) => [key, sequence <= buff.sequence ? buff.value : 0]));
	}

	function reset_weapon_buffs() {
		weapon_buffs = Object.fromEntries(Object.entries(weapon.buffs).map(([key, buff]) => [key, buff.value]));
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

	function add_sonata(pc: '2-p' | '5-p', key: SonataKey) {
		allowed_sonatas[pc].push(key);
	}

	function remove_sonata(pc: '2-p' | '5-p', key: SonataKey) {
		allowed_sonatas[pc] = allowed_sonatas[pc].filter((s) => s !== key);
	}

	function format_motion_values(values: string[]) {
		return values.reduce<{ [v: string]: number }>((obj, val) => {
			obj[val] = (obj[val] || 0) + 1;
			return obj;
		}, {});
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

		const input: OptimizerInput = {
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
			filter: {
				allowed_primary_stats: echo_primaries,
				allowed_2p: allowed_sonatas['2-p'],
				allowed_5p: allowed_sonatas['5-p'],
				allow_rainbow,
				allow_partial
			}
		};

		results = [];
		is_running = true;
		const queue = new MaxPriorityQueue<WorkerResult>(r => r.target_value);
		await optimize(
			$state.snapshot(input),
			{ pool, sort_key: $state.snapshot(target_key) },
			(result, done) => {
				if (result) {
					console.log(result);
					queue.enqueue(result);
					results = queue.toArray().slice(0, keep_count);
				}

				if (done) {
					cancel_optimizer();
				}
		});
	}

	function cancel_optimizer() {
		is_running = false;
		pool.terminate();
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

<Tabs.Root value="character" class="">
	<Tabs.List>
		<Tabs.Trigger value="character">{m.character()}</Tabs.Trigger>
		<Tabs.Trigger value="echoes">echoes</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="character">
		<div class="grid grid-cols-3 auto-cols-fr justify-stretch space-x-4">
			<div class="border rounded-lg overflow-hidden">
				<img src="{character.image.portrait}" alt="{character.key}" class="scale-125" />
			</div>
			<div class="border rounded-lg flex flex-col space-y-4">
				<div class="flex-1 flex-col space-y-4">
					<div class="p-2 flex flex-col space-y-2">
						<span>{m.character()}</span>
						<div class="px-1 flex flex-row space-x-2">
							<Select.Root type="single" bind:value={key} onValueChange={() => on_character_change()}>
								<Select.Trigger class="flex-1">{m[character.key]?.() || character.key}</Select.Trigger>
								<Select.Content>
									{#each Object.values(CHARACTERS) as chr (chr.key)}
										<Select.Item label={m[chr.key]?.() || chr.key} value={chr.key} />
									{/each}
								</Select.Content>
							</Select.Root>
							<Select.Root type="single" bind:value={sequence}>
								<Select.Trigger class="basis-24">S{sequence}</Select.Trigger>
								<Select.Content>
									{#each [0, 1, 2, 3, 4, 5, 6] as s (s)}
										<Select.Item label="S{s}" value={s} />
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
					</div>
					<div class="p-2 flex flex-col space-y-2">
						<span>{m.weapon()}</span>
						<div class="px-1 flex flex-row space-x-2">
							<Select.Root type="single" bind:value={weapon_key} onValueChange={() => reset_weapon_buffs()}>
								<Select.Trigger class="flex-1">{m[weapon.key]?.() || weapon.key}</Select.Trigger>
								<Select.Content>
									{#each Object.values(weapons) as weap (weap.key)}
										<Select.Item label={m[weap.key]?.() || weap.key} value={weap.key} />
									{/each}
								</Select.Content>
							</Select.Root>
							<Select.Root type="single" bind:value={rank}>
								<Select.Trigger class="basis-24">R{rank}</Select.Trigger>
								<Select.Content>
									{#each [1, 2, 3, 4, 5] as r (r)}
										<Select.Item label="R{r}" value={r} />
									{/each}
								</Select.Content>
							</Select.Root>
						</div>

					</div>
					<div class="p-2 flex flex-col space-y-2">
						<span>optimizer options</span>
						<div class="px-1 flex flex-col space-y-1">
							<Select.Root type="single" bind:value={keep_count}>
								<Select.Trigger>keep top {keep_count} build(s)</Select.Trigger>
								<Select.Content>
									{#each [1, 2, 3, 5] as k (k)}
										<Select.Item label="keep top {k} build(s)" value={k} />
									{/each}
								</Select.Content>
							</Select.Root>
							<Dialog.Root bind:open={target_dialog_open}>
								<Dialog.Trigger class={buttonVariants({ variant: 'secondary', class: 'justify-start px-3' })}>
									target: {m[target_key]?.() || target_key}</Dialog.Trigger>
								<Dialog.Content class="max-w-[70%] h-2/3 flex flex-col flex-wrap gap-2">
									<Dialog.Header>
										<Dialog.Title>optimization target</Dialog.Title>
									</Dialog.Header>
									<div class="columns columns-4 gap-2 space-y-2">
										<div class="break-inside-avoid border rounded-lg p-2 flex flex-col space-y-2">
											<div>basic stats</div>
											<div class="flex flex-col space-y-1">
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'hp'; target_dialog_open = false; }}>{m.hp()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'atk'; target_dialog_open = false; }}>{m.atk()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'def'; target_dialog_open = false; }}>{m.def()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'crit_rate'; target_dialog_open = false; }}>{m.crit_rate()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'crit_dmg'; target_dialog_open = false; }}>{m.crit_dmg()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'energy_regen'; target_dialog_open = false; }}>
													{m.energy_regen()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'healing_bonus'; target_dialog_open = false; }}>
													{m.healing_bonus()}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = `${character.element}_bonus`; target_dialog_open = false; }}>
													{m[`${character.element}_bonus`]?.() || `${character.element}_bonus`}
												</Button>
												<Button type="button" variant="ghost"
																onclick={() => { target_key = 'general_bonus'; target_dialog_open = false; }}>
													{m.general_bonus()}
												</Button>
											</div>
										</div>
										{#each Object.values(character.skills).filter(s => s.motions.length > 0) as skill (skill.key)}
											<div class="break-inside-avoid border rounded-lg p-2 flex flex-col space-y-2">
												<div class="flex flex-row items-center">
													<span class="flex-1">{m[skill.key]?.() || skill.key}</span>
													<Badge variant="secondary">{m[skill.type]?.() || skill.type}</Badge>
												</div>
												<div class="flex flex-col space-y-1">
													{#each skill.motions as motion (motion.key)}
														<Button type="button" variant="ghost"
																		onclick={() => { target_key = `${skill.key}-${motion.key}`; target_dialog_open = false; }}>{m[motion.key]?.() || motion.key}</Button>
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
				<div class="flex flex-row space-x-1">
					<Dialog.Root>
						<Dialog.Trigger class={buttonVariants({ variant: 'outline', class: 'flex-1' })}>
							<ChartColumnBig />
							<span>extra stats</span>
						</Dialog.Trigger>
						<Dialog.Content class="max-w-[80%] flex flex-col gap-2">
							<Dialog.Header>
								<Dialog.Title>extra stats</Dialog.Title>
							</Dialog.Header>
							<div class="grid grid-cols-3 auto-cols-fr gap-2">
								<div class="p-2 border rounded-lg flex flex-col space-y-2">
									<div class="px-2">main stats</div>
									<div class="px-4 grid grid-cols-2 gap-1">
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-hp_p" value={extra_stats['hp_p'].value} oninput={e => extra_stats['hp_p'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-hp_p">{m.hp_p()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-hp" value={extra_stats['hp'].value} oninput={e => extra_stats['hp'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-hp">{m.hp()}</Label>
										</div>

										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-atk_p" value={extra_stats['atk_p'].value} oninput={e => extra_stats['atk_p'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-atk_p">{m.atk_p()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-atk" value={extra_stats['atk'].value} oninput={e => extra_stats['atk'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-atk">{m.atk()}</Label>
										</div>

										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-def_p" value={extra_stats['def_p'].value} oninput={e => extra_stats['def_p'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-def_p">{m.def_p()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-def" value={extra_stats['def'].value} oninput={e => extra_stats['def'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-def">{m.def()}</Label>
										</div>

										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-crit_rate" value={extra_stats['crit_rate'].value} oninput={e => extra_stats['crit_rate'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-crit_rate">{m.crit_rate()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-crit_dmg" value={extra_stats['crit_dmg'].value} oninput={e => extra_stats['crit_dmg'].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-crit_dmg">{m.crit_dmg()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-energy_regen" value={extra_stats['energy_regen'].value} oninput={e => extra_stats['energy_regen'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-energy_regen">{m.energy_regen()}</Label>
										</div>
									</div>
								</div>
								<div class="p-2 border rounded-lg flex flex-col space-y-2">
									<div class="px-2">combat stats</div>
									<div class="px-4 grid grid-cols-2 gap-1">
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-general_bonus" value={extra_stats['general_bonus'].value} oninput={e => extra_stats['general_bonus'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-general_bonus">{m.general_bonus()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-general_amplify" value={extra_stats['general_amplify'].value} oninput={e => extra_stats['general_amplify'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-general_amplify">{m.general_amplify()}</Label>
										</div>

										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-{character.element}_bonus"
														 value={extra_stats[`${character.element}_bonus`].value} oninput={e => extra_stats[`${character.element}_bonus`].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-{character.element}_bonus">{m[`${character.element}_bonus`]?.() || `${character.element}_bonus`}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-{character.element}_amplify"
														 value={extra_stats[`${character.element}_amplify`].value} oninput={e => extra_stats[`${character.element}_amplify`].value = +e.currentTarget.value} class="basis-20" />
											<Label for="extra-stat-{character.element}_amplify">{m[`${character.element}_amplify`]?.() || `${character.element}_amplify`}</Label>
										</div>

										{#each ATTACKS as a (a)}
											<div class="flex flex-row items-center space-x-2">
												<Input id="extra-stat-{a}_bonus" value={extra_stats[`${a}_bonus`].value} oninput={e => extra_stats[`${a}_bonus`].value = +e.currentTarget.value}
															 class="basis-20" />
												<Label for="extra-stat-{a}_bonus">{m[`${a}_bonus`]?.() || `${a}_bonus`}</Label>
											</div>
											<div class="flex flex-row items-center space-x-2">
												<Input id="extra-stat-{a}_amplify" value={extra_stats[`${a}_amplify`].value} oninput={e => extra_stats[`${a}_amplify`].value = +e.currentTarget.value}
															 class="basis-20" />
												<Label for="extra-stat-{a}_amplify">{m[`${a}_amplify`]?.() || `${a}_amplify`}</Label>
											</div>
										{/each}
									</div>
								</div>
								<div class="p-2 border rounded-lg flex flex-col space-y-2">
									<div class="px-2">misc stats</div>
									<div class="px-4 flex flex-col space-y-1">
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-healing_bonus" value={extra_stats['healing_bonus'].value} oninput={e => extra_stats['healing_bonus'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-healing_bonus">{m.healing_bonus()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-skill_multiplier" value={extra_stats['skill_multiplier'].value} oninput={e => extra_stats['skill_multiplier'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-skill_multiplier">{m.skill_multiplier()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
											<Input id="extra-stat-enemy_resistance" value={extra_stats['enemy_resistance'].value} oninput={e => extra_stats['enemy_resistance'].value = +e.currentTarget.value}
														 class="basis-20" />
											<Label for="extra-stat-enemy_resistance">{m.enemy_resistance()}</Label>
										</div>
										<div class="flex flex-row items-center space-x-2">
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
							<div class="p-2 flex flex-col space-y-2">
								<div class="px-2">
									<div>world</div>
									<div class="px-2 flex flex-row items-center space-x-2">
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
							<div class="px-2 flex flex-col space-y-4">
								{#each Object.entries(character.buffs) as [key, buff]}
									{#if buff.kind === 'slider'}
										<div>
											<div class="flex flex-row items-center space-x-2">
												<Input id={key} bind:value={character_buffs[key]} disabled={sequence < buff.sequence}
															 class="basis-16" />
												<Label for={key}>{m[key]?.() || key}</Label>
											</div>
											<Slider type="single" bind:value={character_buffs[key]} min={buff.min_value} max={buff.max_value}
															step={1} disabled={sequence < buff.sequence} class="mt-2" />
										</div>
									{:else}
										{@const checked = character_buffs[key] > 0}
										<div class="flex flex-row items-center space-x-2">
											<Switch id={key} {checked} onCheckedChange={chk => character_buffs[key] = +chk}
															disabled={sequence < buff.sequence} class="" />
											<Label for={key}>{m[key]?.() || key}</Label>
										</div>
									{/if}
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="weapon-buffs">
						<Accordion.Trigger class="px-2">{m.weapon_buffs()}</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<div class="px-2 flex flex-col space-y-4">
								{#each Object.entries(weapon.buffs) as [key, buff]}
									{#if buff.kind === 'slider'}
										<div>
											<div class="flex flex-row items-center space-x-2">
												<Input id={key} bind:value={weapon_buffs[key]} class="basis-16" />
												<Label for={key}>{m[key]?.() || key}</Label>
											</div>
											<Slider type="single" bind:value={weapon_buffs[key]} min={buff.min_value} max={buff.max_value}
															step={1} class="mt-2" />
										</div>
									{:else}
										{@const checked = weapon_buffs[key] > 0}
										<div class="flex flex-row items-center space-x-2">
											<Switch id={key} {checked} onCheckedChange={chk => weapon_buffs[key] = +chk} />
											<Label for={key}>{m[key]?.() || key}</Label>
										</div>
									{/if}
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="character-stats">
						<Accordion.Trigger class="px-2">
							<div class="flex flex-row items-center">
								<Checkbox id="character-stats-chk" checked={all_stats_checked} indeterminate={some_stats_checked}
													disabled
													class="disabled:cursor-default disabled:opacity-100 data-[disabled=true]:cursor-default data-[disabled=true]:opacity-100" />
								<Label for="character-stats-chk" class="pl-2 peer-disabled:cursor-default peer-disabled:opacity-100">character
									stat bonuses</Label>
							</div>
						</Accordion.Trigger>
						<Accordion.Content class="px-2">
							<div class="flex flex-row justify-center space-x-2">
								<Button type="button" variant="outline" onclick={() => add_all_stats()}>add all</Button>
								<Button type="button" variant="outline" onclick={() => remove_all_stats()}>remove all</Button>
							</div>
							<div class="mt-4 grid grid-cols-2 auto-cols-fr gap-2">
								{#each character.stat_bonuses as s, i (i)}
									{@const checked = stat_bonuses[i] !== null}
									<div class="px-4 flex flex-row items-center">
										<Checkbox id="stat-{s.stat}-{i}" {checked}
															onCheckedChange={(v) => v ? add_stat(i) : remove_stat(i)} />
										<Label for="stat-{s.stat}-{i}" class="pl-2 flex flex-row items-center">
											<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
											<div>+{(s.value * 100).toFixed(1)}%</div>
											<div class="ml-1">{m[s.stat]?.() || s.stat}</div>
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
		<div class="grid grid-cols-2 auto-cols-fr gap-2">
			<div class="p-2 border rounded-lg flex flex-col divide-y space-y-4">
				<div class="p-2 flex flex-row items-center">
					<div class="px-2 flex-1 grid grid-cols-2 gap-2 items-start">
						<div>allowed 2-p: {allowed_sonatas['2-p'].length}/{SONATAS.length}</div>
						<div>allowed 5-p: {allowed_sonatas['5-p'].length}/{SONATAS.length}</div>
						<div>allow rainbow builds: {allow_rainbow}</div>
						<div>allow partial builds: {allow_partial}</div>
					</div>
					<Dialog.Root>
						<Dialog.Trigger class={buttonVariants({ variant: 'secondary', class: 'self-stretch h-auto' })}>
							<Settings />
						</Dialog.Trigger>
						<Dialog.Content class="min-w-[40%]">
							<Dialog.Header>
								<Dialog.Title>sonata selection</Dialog.Title>
							</Dialog.Header>
							<div class="flex flex-col space-y-8">
								<div class="flex flex-row justify-stretch space-x-4">
									<div class="w-full flex flex-col space-y-2">
										<div class="px-2">2-p</div>
										<div>
											<Button type="button" variant="secondary"
															onclick={() => { allowed_sonatas['2-p'] = Object.values(SONATA_DATA).map(s => s.key); }}>
												include all
											</Button>
											<Button type="button" variant="secondary" onclick={() => { allowed_sonatas['2-p'] = [] }}>exclude
												all
											</Button>
										</div>
									</div>
									<div class="w-full flex flex-col space-y-2">
										<div class="px-2">5-p</div>
										<div>
											<Button type="button" variant="secondary"
															onclick={() => { allowed_sonatas['5-p'] = Object.values(SONATA_DATA).map(s => s.key); }}>
												include all
											</Button>
											<Button type="button" variant="secondary" onclick={() => { allowed_sonatas['5-p'] = [] }}>exclude
												all
											</Button>
										</div>
									</div>
									<div class="w-full flex flex-col space-y-2">
										<div class="flex flex-row items-center space-x-1">
											<Checkbox id="allow-rainbow" bind:checked={allow_rainbow} />
											<Label for="allow-rainbow">allow rainbow builds</Label>
										</div>
										<div>
											<Checkbox id="allow-partial" bind:checked={allow_partial} />
											<Label for="allow-partial">allow partial builds</Label>
										</div>
									</div>
								</div>
								<div class="flex flex-row flex-wrap gap-2">
									{#each SONATAS as s (s)}
										{@const checked_2 = allowed_sonatas['2-p'].includes(s)}
										{@const checked_5 = allowed_sonatas['5-p'].includes(s)}
										<div class="min-w-60 border rounded-lg p-2 flex flex-col space-y-4">
											<div class="flex flex-row items-center space-x-1">
												<img src={SONATA_DATA[s].image} alt={s} class="w-8" />
												<span>{s}</span>
											</div>
											<div class="px-2 flex flex-row items-center justify-stretch space-x-2">
												<div class="w-full flex flex-row items-center space-x-2">
													<Checkbox id="sonata-{s}-2pc" checked={checked_2}
																		onCheckedChange={v => v ? add_sonata('2-p', s) : remove_sonata('2-p', s)} />
													<Label for="sonata-{s}-2pc">2-p</Label>
												</div>
												<div class="w-full flex flex-row items-center space-x-2">
													<Checkbox id="sonata-{s}-5pc" checked={checked_5}
																		onCheckedChange={v => v ? add_sonata('5-p', s) : remove_sonata('5-p', s)} />
													<Label for="sonata-{s}-5pc">5-p</Label>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Root>
				</div>

				<div class="px-2 flex flex-col space-y-2">
					<div>4 costs</div>
					<ToggleGroup.Root type="multiple" class="flex flex-row flex-wrap" bind:value={echo_primaries['4']}>
						{#each Object.values(PRIMARY_MAIN_STATS['4'].stats) as s (s.stat)}
							<ToggleGroup.Item value={s.stat} class="min-w-36 border rounded-lg">
								<div class="flex flex-row items-center space-x-1">
									<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
									<div>{m[s.stat]?.() || s.stat}</div>
								</div>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
				<div class="px-2 flex flex-col space-y-2">
					<div>3 costs</div>
					<ToggleGroup.Root type="multiple" class="px-2 flex flex-row flex-wrap" bind:value={echo_primaries['3']}>
						{#each Object.values(PRIMARY_MAIN_STATS['3'].stats) as s (s.stat)}
							<ToggleGroup.Item value={s.stat} class="min-w-36 border rounded-lg">
								<div class="flex flex-row items-center space-x-1">
									<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
									<div>{m[s.stat]?.() || s.stat}</div>
								</div>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
				<div class="px-2 flex flex-col space-y-2">
					<div>1 costs</div>
					<ToggleGroup.Root type="multiple" class="px-2 flex flex-row flex-wrap" bind:value={echo_primaries['1']}>
						{#each Object.values(PRIMARY_MAIN_STATS['1'].stats) as s (s.stat)}
							<ToggleGroup.Item value={s.stat} class="min-w-36 border rounded-lg">
								<div class="flex flex-row items-center space-x-1">
									<img src={STAT_ICONS[s.stat]} alt={s.stat} class="w-6" />
									<div>{m[s.stat]?.() || s.stat}</div>
								</div>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
			</div>

			<div class="p-2 border rounded-lg flex flex-col space-y-2">
				more coming soon
			</div>
		</div>
	</Tabs.Content>
</Tabs.Root>

{#if !is_running}
	<Button type="button" onclick={() => launch_optimizer()} class="mt-2 min-w-full">optimize</Button>
{:else}
	<Button type="button" onclick={() => cancel_optimizer()} class="mt-2 min-w-full">
		<LoaderCircle class="animate-spin" />
		cancel
	</Button>
{/if}

{#if results.length > 0}
	<div class="my-2">
		<RadioGroup.Root orientation="horizontal" bind:value={damage_selection} required class="flex flex-row space-x-2">
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
	<div class="px-2 flex flex-col space-y-4 divide-y-2">
		{#each results as result, i (i)}
			{@const total_cost = result.build.reduce((acc, echo) => acc + echo.cost, 0)}
			<div class="flex flex-col space-y-2">
				<div>build {i + 1}/{results.length} - total cost: {total_cost}/12</div>
				<div class="grid grid-cols-5 gap-1 justify-around">
					{#each result.build as echo (echo.id)}
						<!-- build -->
						<div class="border rounded-lg flex flex-col gap-3">
							<div class="flex flex-row">
								<img src={get_echo_image(echo.key)} alt={echo.key} class="size-36" />
								<div class="flex flex-col gap-2 ml-2">
									<div>
										<span class="font-bold">{echo.key}</span>
										<span>(+{echo.level})</span>
									</div>
									<div class="flex flex-row gap-2 items-center">
										<img src={SONATA_DATA[echo.sonata].image} alt="{echo.sonata}" class="w-8" />
										<span>{echo.sonata}</span>
									</div>
									<div class="flex flex-col">
										<div class="flex flex-row items-center gap-2">
											<img src={STAT_ICONS[echo.primary_stat.stat]} alt={echo.primary_stat.stat} class="size-6" />
											{#if BASE_STATS.includes(echo.primary_stat.stat)}
												<div>{echo.primary_stat.value.toFixed(0)}</div>
											{:else}
												<div>{(echo.primary_stat.value * 100).toFixed(1)}%</div>
											{/if}
										</div>
										<div class="flex flex-row items-center gap-2">
											<img src={STAT_ICONS[echo.secondary_stat.stat]} alt={echo.secondary_stat.stat} class="size-6" />
											{#if BASE_STATS.includes(echo.secondary_stat.stat)}
												<div>{echo.secondary_stat.value.toFixed(0)}</div>
											{:else}
												<div>{(echo.secondary_stat.value * 100).toFixed(1)}%</div>
											{/if}
										</div>
									</div>
								</div>
							</div>
							<div class="flex flex-row flex-wrap space-x-2 justify-evenly my-2">
								{#each echo.sub_stats as sub_stat}
									<div class="flex flex-row items-center gap-2">
										<img src={STAT_ICONS[sub_stat.stat]} alt={sub_stat.stat} class="size-6" />
										{#if BASE_STATS.includes(sub_stat.stat)}
											<div>{sub_stat.value.toFixed(0)}</div>
										{:else}
											<div>{(sub_stat.value * 100).toFixed(1)}%</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
				<div class="columns-3">
					<!-- damage + stats -->
					<div class="break-inside-avoid flex flex-col gap-1 px-2">
						<div class="text-xl">Stats</div>
						{#each Object.entries(result.display_stats) as [key, value] (key)}
							{#if value !== 0}
								<div class="flex flex-row items-center gap-2">
									<img src={STAT_ICONS[key]} alt={key} class="size-6" />
									{#if BASE_STATS.includes(key)}
										<div>{value.toFixed(0)}</div>
									{:else}
										<div>{(value * 100).toFixed(1)}%</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
					{#each Object.values(result.skills) as skill (skill.type)}
						<div class="w-full break-inside-avoid flex flex-col pt-2 px-2">
							<div class="text-xl">{m[skill.key]?.() || skill.key}</div>
							<div>
								{#each skill.motions as motion (motion.key)}
									<div class="px-2 flex flex-row justify-between gap-2">
										<div>{m[motion.key]?.() || motion.key}</div>
										<div>
											{#if damage_selection === 'non-crit'}
												{@const non_crit = format_motion_values(motion.non_crit.map(v => v.toFixed(0)))}
												{#each Object.entries(non_crit) as [value, count], i}
													{#if count > 1}<span class="text-xs px-0.5">{count}x</span>{/if}
													{value}
													{#if i < Object.keys(non_crit).length - 1} +{/if}
												{/each}
											{:else if damage_selection === 'forced-crit'}
												{@const forced_crit = format_motion_values(motion.forced_crit.map(v => v.toFixed(0)))}
												{#each Object.entries(forced_crit) as [value, count], i}
													{#if count > 1}<span class="text-xs px-0.5">{count}x</span>{/if}
													{value}
													{#if i < Object.keys(forced_crit).length - 1} +{/if}
												{/each}
											{:else}
												{@const average = format_motion_values(motion.average.map(v => v.toFixed(0)))}
												{#each Object.entries(average) as [value, count], i}
													{#if count > 1}<span class="text-xs px-0.5">{count}x</span>{/if}
													{value}
													{#if i < Object.keys(average).length - 1} +{/if}
												{/each}
											{/if}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}