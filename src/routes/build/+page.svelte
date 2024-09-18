<script lang="ts">
	import { CHARACTER_CURVE, CHARACTERS_METADATA } from '$lib/data/character';
	import { WEAPON_CURVE_1, WEAPON_CURVE_2, WEAPONS_METADATA } from '$lib/data/weapon';
	import { CharacterLevel, type CharacterStat, FinalCharacterStat } from '$lib/types/character';
	import { WeaponLevel, WeaponType } from '$lib/types/weapon';
	import { type Echo, Sonata } from '$lib/types/echo';
	import { get_sonata_image } from '$lib/data/sonata';
	import { ECHO_CLASS_COST, ECHOES_METADATA, get_echo_class, get_echo_icon } from '$lib/data/echo';
	import { get_echoes_snapshot } from '$lib/db/echo';
	import { Attribute } from '$lib/types/stat';
	import { is_flat_stat, STATS_ICONS } from '$lib/data/stat';
	import FinalStat from './FinalStat.svelte';

	let character_key = $state('');
	const character = $derived(CHARACTERS_METADATA.find(c => c.name === character_key));
	let character_level = $state(CharacterLevel.toReversed()[0].key);

	const weapons = $derived(WEAPONS_METADATA.filter(w => character && w.type === character.weapon_type));

	let weapon_key = $state('');
	const weapon = $derived(WEAPONS_METADATA.find(w => w.name === weapon_key));
	let weapon_level = $state(WeaponLevel.toReversed()[0].key);

	let allowed_sonata = $state(Object.values(Sonata).map(s => ({ sonata: s, set_2: false, set_5: true })));

	let max_builds = $state(5);
	let sort_result_key: keyof FinalCharacterStat = $state(Attribute.ATK);

	function generate_build(echoes: Echo[], n: number, max_weight: number): Echo[][] {
		if (n === 0) return [[]];

		if (echoes.length < n) {
			// not enough elements to create a 5-pc build
			// todo: handle partial builds
			return [];
		}

		// recursively generate all builds with `echo` as the first element
		return echoes.flatMap((echo, i) => {
			const metadata = ECHOES_METADATA.find(e => e.name === echo.name);
			if (!metadata) {
				console.error(`echo metadata not found for ${echo.name}`);
				return [];
			}

			return generate_build(echoes.slice(i + 1), n - 1, max_weight - ECHO_CLASS_COST[metadata.class])
				.filter(build => !build.find(e => e.name === echo.name))	// filter out duplicates
				.filter(build => build.reduce<number>((total_cost, e) => {
					const meta = ECHOES_METADATA.find(e2 => e2.name === e.name);
					if (!meta) {
						console.error(`echo metadata not found for ${e.name}`);
						return total_cost;
					}

					return total_cost + ECHO_CLASS_COST[meta.class];
				}, ECHO_CLASS_COST[metadata.class]) <= max_weight) // filter out exceeding builds
				.map(comb => [echo, ...comb]);
		});
	};

	function generate_combinations() {
		// todo: handle builds with 2-pc filters
		const filtered_sonata = allowed_sonata.filter(s => s.set_5);

		return filtered_sonata.flatMap(s => {
			const echoes = get_echoes_snapshot().filter(e => e.sonata === s.sonata);
			return generate_build(echoes, 5, 12);
		});
	};

	const build_count = $derived(generate_combinations().length);

	function compute_builds_sets(build: Echo[]) {
		const sets = build.reduce<{[sonata in Sonata]?: number}>((sets, e) => {
			sets[e.sonata] = (sets[e.sonata] ?? 0) + 1;
			return sets;
		}, {});
		return Object.entries(sets).map(([sonata, count]): {sonata: Sonata, text: string} => ({sonata: sonata as Sonata, text: `${sonata} (${count}-pc)`}));
	}

	function compute_builds_cost(build: Echo[]) {
		return build.map(echo => {
			const metadata = ECHOES_METADATA.find(e => e.name === echo.name);
			if (!metadata) {
				console.error(`metadata not found for echo ${echo.name}`);
				return 0;
			}

			return ECHO_CLASS_COST[metadata.class];
		}).join('-')
	}

	let results: { build: Echo[], build_sets: ReturnType<typeof compute_builds_sets>, build_cost: string, final_stats: FinalCharacterStat }[] = $state([]);

	const base_stats = $derived.by(() => {
		if (!character || !weapon) return undefined;

		// todo: handle character conditional stats
		return Object.entries(character.base_stats).reduce<CharacterStat>((stats, [key, value]) => {
			const attribute = key as Attribute;
			// apply character leveling curve
			if (CHARACTER_CURVE[character_level] && CHARACTER_CURVE[character_level][attribute]) {
				value *= CHARACTER_CURVE[character_level][attribute] ?? 1;
			}

			// apply weapon base stats (primary main stat and weapon leveling curve)
			if (weapon.main_stat.primary.attribute === attribute) {
				stats[attribute] = value + weapon.main_stat.primary.value * WEAPON_CURVE_1[weapon_level];
				return stats;
			}
			stats[attribute] = value;
			return stats;
		}, {});
	});

	const weapon_stats = $derived.by(() => {
		if (!weapon) return undefined;

		// todo: handle weapon conditional stats
		return { [weapon.main_stat.secondary.attribute]: weapon.main_stat.secondary.value * WEAPON_CURVE_2[weapon_level], };
	})

	function compute_final_stats(build: Echo[]) {
		if (!base_stats || !weapon_stats) return undefined;

		const echo_stats = build.reduce<CharacterStat>((stats, echo) => {
			[echo.main_stat.primary, echo.main_stat.secondary, ...echo.sub_stats].forEach(stat => {
				stats[stat.attribute] = (stats[stat.attribute] ?? 0) + stat.value;
			});
			return stats;
		}, {});

		const sum_flat_stat = (flat_attribute: Attribute, percentage_attribute: Attribute) => (base_stats[flat_attribute] ?? 0) * (100 + (weapon_stats[percentage_attribute] ?? 0) + (echo_stats[percentage_attribute] ?? 0))/100 + (weapon_stats[flat_attribute] ?? 0) + (echo_stats[flat_attribute] ?? 0);
		const sum_percentage_stat = (attribute: Attribute) => (base_stats[attribute] ?? 0) + (weapon_stats[attribute] ?? 0) + (echo_stats[attribute] ?? 0);

		return {
			// Flat stats
			[Attribute.HP]: sum_flat_stat(Attribute.HP, Attribute.HP_P),
			[Attribute.ATK]: sum_flat_stat(Attribute.ATK, Attribute.ATK_P),
			[Attribute.DEF]: sum_flat_stat(Attribute.DEF, Attribute.DEF_P),

			// Percentage stats
			[Attribute.CritRate]: sum_percentage_stat(Attribute.CritRate),
			[Attribute.CritDamage]: sum_percentage_stat(Attribute.CritDamage),
			[Attribute.EnergyRegen]: sum_percentage_stat(Attribute.EnergyRegen),
			[Attribute.HealingBonus]: sum_percentage_stat(Attribute.HealingBonus),

			// Element damage bonus
			[Attribute.GlacioBonus]: sum_percentage_stat(Attribute.GlacioBonus),
			[Attribute.FusionBonus]: sum_percentage_stat(Attribute.FusionBonus),
			[Attribute.ElectroBonus]: sum_percentage_stat(Attribute.ElectroBonus),
			[Attribute.AeroBonus]: sum_percentage_stat(Attribute.AeroBonus),
			[Attribute.SpectroBonus]: sum_percentage_stat(Attribute.SpectroBonus),
			[Attribute.HavocBonus]: sum_percentage_stat(Attribute.HavocBonus),

			// Attack type bonus
			[Attribute.BasicAttackBonus]: sum_percentage_stat(Attribute.BasicAttackBonus),
			[Attribute.HeavyAttackBonus]: sum_percentage_stat(Attribute.HeavyAttackBonus),
			[Attribute.ResonanceSkillBonus]: sum_percentage_stat(Attribute.ResonanceSkillBonus),
			[Attribute.ResonanceLiberationBonus]: sum_percentage_stat(Attribute.ResonanceLiberationBonus),
		};
	}

	function generate_builds() {
		const builds = generate_combinations();
		results = builds.map(build => (
			{
				build,
				final_stats: compute_final_stats(build),
			}))
			.filter((b) => b.final_stats)
			// Descending order!
			.toSorted((a, b) => (b.final_stats[sort_result_key] ?? 0) - (a.final_stats[sort_result_key] ?? 0))
			.slice(0, max_builds)
			.map(result => ({
				...result,
				build_sets: compute_builds_sets(result.build),
				build_cost: compute_builds_cost(result.build),
			}));

		console.log(`final stats, ordered by ${sort_result_key}: `, $state.snapshot(results));
	}

	const quality_class = {
		2: 'flex flex-row gap-2 bg-rarity-2',
		3: 'flex flex-row gap-2 bg-rarity-3',
		4: 'flex flex-row gap-2 bg-rarity-4',
		5: 'flex flex-row gap-2 bg-rarity-5',
	}

	const sonata_class = {
		[Sonata.FreezingFrost]: 'w-6 border border-blue-600 rounded-full',
		[Sonata.MoltenRift]: 'w-6 border border-orange-400 rounded-full',
		[Sonata.VoidThunder]: 'w-6 border border-purple-600 rounded-full',
		[Sonata.SierraGale]: 'w-6 border border-emerald-400 rounded-full',
		[Sonata.CelestialLight]: 'w-6 border border-yellow-300 rounded-full',
		[Sonata.SunSinkingEclipse]: 'w-6 border border-fuchsia-700 rounded-full',
		[Sonata.RejuvenatingGlow]: 'w-6 border border-lime-300 rounded-full',
		[Sonata.MoonlitClouds]: 'w-6 border border-white rounded-full',
		[Sonata.LingeringTunes]: 'w-6 border border-red-600 rounded-full'
	};
</script>

<div class="flex flex-row gap-3 items-center">
	<div class="flex flex-col gap-1 border-2 rounded-xl p-3">
		<div>{build_count} combinations found</div>
		<button type="button" onclick="{generate_builds}" class="bg-indigo-600 rounded-lg">Generate builds</button>
	</div>

	<div class="flex-1 flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div class="text-xl font-semibold">Character</div>
			<div class="flex flex-rows gap-4">
				<div class="h-72 w-64 border-2 rounded-xl overflow-hidden">
					{#if character}
						<img src="{character.icon.portrait}" alt="{character.name}" class="scale-125"/>
						<!--					<img src="{character.icon.head}" alt="{character.name}" class="scale-125"/>-->
					{/if}
				</div>
				<div class="h-72 w-64 flex flex-col gap-2 border-2 rounded-xl p-2">
					<div class="flex flex-col gap-1">
						<div class="text-sm">Character</div>
						<select bind:value={character_key} class="text-xs rounded-xl bg-indigo-800">
							{#each Object.values(WeaponType) as type}
								<optgroup label="{type}">
									{#each CHARACTERS_METADATA.filter(c => c.weapon_type === type) as ch (ch.name)}
										<option value="{ch.name}">{ch.name}</option>
									{/each}
								</optgroup>
							{/each}
						</select>
					</div>
					<div class="flex flex-col gap-1">
						<div class="text-sm">Weapon</div>
						<select bind:value={weapon_key} class="text-xs rounded-xl bg-indigo-800">
							{#each weapons as we}
								<option value="{we.name}">{we.name}</option>
							{/each}
						</select>
					</div>
					<div class="flex flex-col gap-1">
						<div class="text-sm">Optimization settings</div>
						<select bind:value={max_builds} class="text-xs rounded-xl bg-indigo-800">
							<option value="{1}">Top 1 build</option>
							<option value="{2}">Top 2 builds</option>
							<option value="{3}">Top 3 builds</option>
							<option value="{4}">Top 4 builds</option>
							<option value="{5}">Top 5 builds</option>
							<option value="{8}">Top 8 builds</option>
							<option value="{10}">Top 10 builds</option>
						</select>
					</div>
					<div class="flex flex-col gap-1">
						<div class="text-sm">Sort results by</div>
						<select bind:value={sort_result_key} class="text-xs rounded-xl bg-indigo-800">
							{#each Object.keys(FinalCharacterStat) as key}
								<option value="{key}">{key}</option>
							{/each}
						</select>
					</div>
				</div>
<!--			<div class="h-72 w-64 border-2 rounded-xl p-2">character conditionals</div>-->
<!--			<div class="h-72 w-64 border-2 rounded-xl p-2">weapon conditionals</div>-->
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-xl font-semibold">Echo</div>
			<div class="flex flex-row gap-4">
				<div class="h-64 border-2 rounded-xl p-2 grid grid-cols-3 items-center gap-2">
					{#each allowed_sonata as s, i (i)}
						<div>
							<div class="flex flex-row gap-1 items-center">
								<img src="{get_sonata_image(s.sonata)}" alt="{s.sonata}" class="{sonata_class[s.sonata]}"/>
								<div>{s.sonata}</div>
							</div>
							<label>2-pc
								<input type="checkbox" bind:checked={allowed_sonata[i].set_2} disabled/>
							</label>
							<label>5-pc
								<input type="checkbox" bind:checked={allowed_sonata[i].set_5}/>
							</label>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

{#if results.length > 0}
	<div class="mt-6 py-2 border-2 rounded-xl flex flex-col gap-3 divide-y-2">
		{#each results as data, i (i)}
			<div class="p-1">
				<div class="flex flex-row gap-4 items-center">
					<div class="font-bold text-lg">Build #{i + 1}</div>
					<div class="font-semibold">{data.build_cost}</div>
					<div>
						{#each data.build_sets as set, j (j)}
							<div class="flex flex-row items-center gap-1">
								<img src="{get_sonata_image(set.sonata)}" alt="{set.sonata}" class="{sonata_class[set.sonata]}"/>
								<div>{set.text}</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-1 grid grid-cols-5 gap-1">
					{#each data.build as echo (echo.id)}
						<div class="h-64 flex flex-col bg-indigo-800 gap-1 rounded-b-2xl">
							<div>
								<div class="{quality_class[echo.quality]}">
									<img src="{get_echo_icon(echo.name)?.head}" alt="{echo.name}" class="w-24 bg-indigo-800 rounded-tr-2xl"/>
									<div class="flex-1 pl-2 flex flex-col bg-indigo-800 rounded-bl-2xl">
										<p class="pt-1 text-xs font-light">{get_echo_class(echo.name)}</p>
										<div class="flex flex-row items-center gap-1">
											<p class="text-sm font-bold">{echo.name}</p>
											<p class="pr-1 text-sm font-semibold">+{echo.level}</p>
										</div>
										<div class="mt-1 flex flex-row items-center gap-1">
											<img src="{STATS_ICONS[echo.main_stat.primary.attribute]}" alt="{echo.main_stat.primary.attribute}" class="w-6" />
											<p class="text-xs font-semibold">{echo.main_stat.primary.attribute}</p>
											{#if is_flat_stat(echo.main_stat.primary.attribute)}
												<p class="text-xs pr-1">{echo.main_stat.primary.value.toFixed(0)}</p>
											{:else}
												<p class="text-xs pr-1">{echo.main_stat.primary.value.toFixed(1)}%</p>
											{/if}
										</div>
									</div>
								</div>
							</div>
							<div class="pl-2 flex-1 flex flex-col">
								{#each echo.sub_stats as sub_stat (sub_stat.attribute)}
									<div class="flex flex-row items-center">
										<div class="flex-1 flex flex-row items-center">
											<img src="{STATS_ICONS[sub_stat.attribute]}" alt="{sub_stat.attribute}" class="w-6"/>
											<p class="text-sm font-medium">{sub_stat.attribute}</p>
											{#if is_flat_stat(sub_stat.attribute)}
												<p class="pr-1 flex-1 text-right">+{sub_stat.value.toFixed(0)}</p>
											{:else}
												<p class="pr-1 flex-1 text-right">+{sub_stat.value.toFixed(1)}%</p>
											{/if}
										</div>
									</div>
								{/each}
							</div>
							<div class="pb-1 px-2 flex flex-row gap-2">
								{#if echo.equipped_by}
									<p class="flex-1 font-light">Equipped by {echo.equipped_by}</p>
								{:else}
									<p class="flex-1 font-light">Not equipped</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-1 flex flex-row flex-wrap gap-3 divide-x">
					<div class="flex flex-col px-1">
						<div class="text-lg font-semibold">Stats</div>
						<div class="flex flex-col">
							<FinalStat attribute={Attribute.HP} value={data.final_stats[Attribute.HP]} is_percentage={false}></FinalStat>
							<FinalStat attribute={Attribute.ATK} value={data.final_stats[Attribute.ATK]} is_percentage={false}></FinalStat>
							<FinalStat attribute={Attribute.DEF} value={data.final_stats[Attribute.DEF]} is_percentage={false}></FinalStat>
							<FinalStat attribute={Attribute.CritRate} value={data.final_stats[Attribute.CritRate]}></FinalStat>
							<FinalStat attribute={Attribute.CritDamage} value={data.final_stats[Attribute.CritDamage]}></FinalStat>
							<FinalStat attribute={Attribute.EnergyRegen} value={data.final_stats[Attribute.EnergyRegen]}></FinalStat>
							<FinalStat attribute={Attribute.HealingBonus} value={data.final_stats[Attribute.HealingBonus]}></FinalStat>
						</div>
					</div>
					<div class="flex flex-col px-1">
						<div class="text-lg font-semibold">Attack Bonus</div>
						<div class="flex flex-col">
							<FinalStat attribute={Attribute.BasicAttackBonus} value={data.final_stats[Attribute.BasicAttackBonus]}></FinalStat>
							<FinalStat attribute={Attribute.HeavyAttackBonus} value={data.final_stats[Attribute.HeavyAttackBonus]}></FinalStat>
							<FinalStat attribute={Attribute.ResonanceSkillBonus} value={data.final_stats[Attribute.ResonanceSkillBonus]}></FinalStat>
							<FinalStat attribute={Attribute.ResonanceLiberationBonus} value={data.final_stats[Attribute.ResonanceLiberationBonus]}></FinalStat>
						</div>
					</div>
					<div class="flex flex-col px-1">
						<div class="text-lg font-semibold">Element Bonus</div>
						<div class="flex flex-col">
							<FinalStat attribute={Attribute.GlacioBonus} value={data.final_stats[Attribute.GlacioBonus]}></FinalStat>
							<FinalStat attribute={Attribute.FusionBonus} value={data.final_stats[Attribute.FusionBonus]}></FinalStat>
							<FinalStat attribute={Attribute.ElectroBonus} value={data.final_stats[Attribute.ElectroBonus]}></FinalStat>
							<FinalStat attribute={Attribute.AeroBonus} value={data.final_stats[Attribute.AeroBonus]}></FinalStat>
							<FinalStat attribute={Attribute.SpectroBonus} value={data.final_stats[Attribute.SpectroBonus]}></FinalStat>
							<FinalStat attribute={Attribute.HavocBonus} value={data.final_stats[Attribute.HavocBonus]}></FinalStat>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}