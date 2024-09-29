<script lang="ts">
	import { type Echo, Sonata } from '$lib/types/echo';
	import { get_sonata_image } from '$lib/data/sonata';
	import StackInput from './StackInput.svelte';
	import { create_character_config, create_weapon_config } from '$lib/optimizer/optimizer_config';
	import { CharacterResonanceChain, type CharacterStat } from '$lib/types/character';
	import { generate_builds } from '$lib/optimizer/generate_build';
	import { get_echoes_snapshot } from '$lib/db/echo';
	import { WeaponSyntonize } from '$lib/types/weapon';
	import { compute_damage } from '$lib/optimizer/damage_pipeline';
	import FinalStat from './FinalStat.svelte';
	import { Attribute } from '$lib/types/stat';
	import { is_flat_stat, STATS_ICONS } from '$lib/data/stat';
	import { get_echo_icon } from '$lib/data/echo';
	import {
		compute_effective_stats,
		compute_combat_stats,
		get_common_conditionals
	} from '$lib/optimizer/compute_stats';
	import Damage from './Damage.svelte';

	let character_id = $state(1205);
	let resonance_chain = $state(CharacterResonanceChain[0]);
	const character = $derived(create_character_config(character_id, resonance_chain));

	let weapon_id = $state(21020016);
	let syntonize = $state(WeaponSyntonize[0]);
	const weapon = $derived(create_weapon_config(weapon_id, syntonize));

	let optimizer_settings = $state({ keep_count: 3, });

	const sonata_filter = $state(Object.values(Sonata).map(s => ({ sonata: s, allow_2p: false, allow_5p: false, })));

	const build_count = $derived(generate_builds(get_echoes_snapshot(), sonata_filter).length);

	let results: {build: Echo[], build_effects: { sonata: Sonata, text: string }[], configuration: string, damages: object, stats: CharacterStat}[] = $state([]);
	function launch_optimizer() {
		const builds = generate_builds(get_echoes_snapshot(), sonata_filter);
		results = builds
			.map(build => {
				const combat_buffs = get_common_conditionals(character)
					.filter(b => b.condition(character))
					.reduce((stats, b) => b.pre_compute(character, stats), compute_combat_stats(character, weapon, build));

				const build_effects = Object.entries(build.reduce<{ [s in Sonata]?: number }>((sets, e) => {
					sets[e.sonata] = (sets[e.sonata] || 0) + 1;
					return sets;
				}, {}))
					.filter(([, count]) => count >= 2)
					.map(([set, count]) => {
						if (count === 5) {
							return { sonata: set as Sonata, text: `${set} (5-pc)` };
						}
						return { sonata: set as Sonata, text: `${set} (2-pc)` };
					});


				return {
					build,
					build_effects,
					configuration: build.map(e => e.cost).join('-'),
					damages: compute_damage(character, weapon, build),
					stats: compute_effective_stats(character, weapon, combat_buffs),
				}
			})
			.sort((a, b) => b.build.reduce((cost, e) => e.cost + cost, 0) - a.build.reduce((cost, e) => cost + e.cost, 0)) // sort by total cost, descending
			.slice(0, optimizer_settings.keep_count);
	}

	let skill_damage: 0 | 1 | 2 = $state(1);

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
	<div class="basis-1/6 flex flex-col gap-1 border-2 rounded-xl p-3">
		<div>{build_count} combinations found</div>
		<button type="button" onclick="{launch_optimizer}" disabled="{build_count === 0}" class="bg-indigo-600 disabled:bg-indigo-800 rounded-lg">Optimize</button>
	</div>

	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div class="text-xl font-semibold">Character Configuration</div>
			<div class="flex flex-rows gap-4">
				<div class="h-72 w-64 border-2 rounded-xl overflow-hidden">
					{#if character}
						<img src="{character.image.portrait}" alt="{character.name}" class="scale-125"/>
<!--						<img src="{character.image.head}" alt="{character.name}" class="scale-125"/>-->
					{/if}
				</div>
				<div class="h-72 w-64 flex flex-col gap-2 border-2 rounded-xl p-2">
					<div class="flex flex-col gap-1">
						<div class="text-sm">Character</div>
						<div class="flex flex-row gap-1">
							<select bind:value={character_id} class="text-xs rounded-xl bg-indigo-800 flex-1">
								<option value="{1205}">Changli</option>
							</select>
							<select bind:value={resonance_chain} class="text-xs rounded-xl bg-indigo-800">
								{#each CharacterResonanceChain as rc}
									<option value="{rc}">RC{rc}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="flex flex-col gap-1">
						<div class="text-sm">Weapon</div>
						<div class="flex flex-row gap-1">
							<select bind:value={weapon_id} class="text-xs rounded-xl bg-indigo-800 flex-1">
								<option value="{21020016}">{'Blazing Brilliance'}</option>
							</select>
							<select bind:value={syntonize} class="text-xs rounded-xl bg-indigo-800">
								{#each WeaponSyntonize as s}
									<option value="{s}">S{s}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="flex flex-col gap-1">
						<div class="text-sm">Optimization settings</div>
						<select bind:value={optimizer_settings.keep_count} class="text-xs rounded-xl bg-indigo-800">
							<option value="{1}">Top 1 build</option>
							<option value="{2}">Top 2 builds</option>
							<option value="{3}">Top 3 builds</option>
							<option value="{4}">Top 4 builds</option>
							<option value="{5}">Top 5 builds</option>
							<option value="{8}">Top 8 builds</option>
							<option value="{10}">Top 10 builds</option>
						</select>
					</div>
<!--					<div class="flex flex-col gap-1">-->
<!--						<div class="text-sm">Sort results by</div>-->
<!--					</div>-->
				</div>
				<div class="h-72 w-64 flex flex-col border-2 rounded-xl p-2">
					<div class="text-sm">Character Effects</div>
					<div class="flex flex-col">
						{#each Object.values(character.stacks) as stack (stack.name)}
							<StackInput {stack} on_update={(name, value) => stack.value = value}></StackInput>
						{/each}
					</div>
				</div>
				<div class="h-72 w-64 flex flex-col border-2 rounded-xl p-2">
					<div class="text-sm">Weapon Effects</div>
					<div class="flex flex-col">
						{#each Object.values(weapon.stacks) as stack (stack.name)}
							<StackInput {stack} on_update={(name, value) => stack.value = value}></StackInput>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-xl font-semibold">Build Configuration</div>
			<div class="flex flex-row gap-4">
				<div class="h-64 border-2 rounded-xl p-2 grid grid-cols-3 items-center gap-2">
					{#each sonata_filter as filter, i (i)}
						<div>
							<div class="flex flex-row gap-1 items-center">
								<img src="{get_sonata_image(filter.sonata)}" alt="{filter.sonata}" class="{sonata_class[filter.sonata]}"/>
								<div>{filter.sonata}</div>
							</div>
							<label>2-pc
								<input type="checkbox" bind:checked={sonata_filter[i].allow_2p}/>
							</label>
							<label>5-pc
								<input type="checkbox" bind:checked={sonata_filter[i].allow_5p}/>
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
					<div class="font-semibold">{data.configuration}</div>
					<div>
						{#each data.build_effects as set, j (j)}
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
										<p class="pt-1 text-xs font-light">{echo.class}</p>
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
												<p class="text-xs pr-1">{(echo.main_stat.primary.value * 100).toFixed(1)}%</p>
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
											<p class="text-sm">{sub_stat.attribute}</p>
											{#if is_flat_stat(sub_stat.attribute)}
												<p class="pr-1 flex-1 text-right">+{sub_stat.value.toFixed(0)}</p>
											{:else}
												<p class="pr-1 flex-1 text-right">+{(sub_stat.value * 100).toFixed(1)}%</p>
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
				<div class="mt-1 flex flex-row flex-wrap gap-3 divide-x max-h-80">
					<div class="flex flex-col px-1">
						<div class="text-lg font-semibold">Stats</div>
						<div class="flex flex-col">
							<FinalStat attribute={Attribute.HP} value={data.stats[Attribute.HP]} is_percentage={false}></FinalStat>
							<FinalStat attribute={Attribute.ATK} value={data.stats[Attribute.ATK]} is_percentage={false}></FinalStat>
							<FinalStat attribute={Attribute.DEF} value={data.stats[Attribute.DEF]} is_percentage={false}></FinalStat>
							<FinalStat attribute={Attribute.CritRate} value={data.stats[Attribute.CritRate]}></FinalStat>
							<FinalStat attribute={Attribute.CritDamage} value={data.stats[Attribute.CritDamage]}></FinalStat>
							<FinalStat attribute={Attribute.EnergyRegen} value={data.stats[Attribute.EnergyRegen]}></FinalStat>
							<FinalStat attribute={Attribute.HealingBonus} value={data.stats[Attribute.HealingBonus]}></FinalStat>
						</div>
					</div>
					<div class="flex flex-col gap-1 divide-y">
						<div class="flex flex-col px-1">
							<div class="font-semibold">Attack Bonus</div>
							<div class="flex flex-col">
								<FinalStat attribute={Attribute.BasicAttackBonus} value={data.stats[Attribute.BasicAttackBonus]}></FinalStat>
								<FinalStat attribute={Attribute.HeavyAttackBonus} value={data.stats[Attribute.HeavyAttackBonus]}></FinalStat>
								<FinalStat attribute={Attribute.ResonanceSkillBonus} value={data.stats[Attribute.ResonanceSkillBonus]}></FinalStat>
								<FinalStat attribute={Attribute.ResonanceLiberationBonus} value={data.stats[Attribute.ResonanceLiberationBonus]}></FinalStat>
							</div>
						</div>
						<div class="flex flex-col px-1">
							<div class="font-semibold">Element Bonus</div>
							<div class="flex flex-col">
								<FinalStat attribute={Attribute.GlacioBonus} value={data.stats[Attribute.GlacioBonus]}></FinalStat>
								<FinalStat attribute={Attribute.FusionBonus} value={data.stats[Attribute.FusionBonus]}></FinalStat>
								<FinalStat attribute={Attribute.ElectroBonus} value={data.stats[Attribute.ElectroBonus]}></FinalStat>
								<FinalStat attribute={Attribute.AeroBonus} value={data.stats[Attribute.AeroBonus]}></FinalStat>
								<FinalStat attribute={Attribute.SpectroBonus} value={data.stats[Attribute.SpectroBonus]}></FinalStat>
								<FinalStat attribute={Attribute.HavocBonus} value={data.stats[Attribute.HavocBonus]}></FinalStat>
							</div>
						</div>
					</div>
					<div class="flex-1 flex flex-col px-1 max-h-80">
						<div class="flex flex-row items-center gap-2">
							<div class="text-lg font-semibold">Skills</div>
							<div>
								<button type="button" onclick="{() => skill_damage = 0}">Non-crit</button>
								<button type="button" onclick="{() => skill_damage = 1}">Average</button>
								<button type="button" onclick="{() => skill_damage = 2}">Crit</button>
							</div>
						</div>
						<div class="columns-3 gap-2 space-y-2">
							{#each Object.entries(data.damages).filter(d => d[1].motions.length > 0) as [type, skill], i (i)}
								<Damage {skill_damage} {type} {skill}></Damage>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}