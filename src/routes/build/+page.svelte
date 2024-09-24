<script lang="ts">
	import changli from '$lib/data/character/changli';
	import { Sonata } from '$lib/types/echo';
	import { get_sonata_image } from '$lib/data/sonata';
	import StackInput from './StackInput.svelte';
	import { create_character_config, create_weapon_config } from '$lib/optimizer/optimizer_config';
	import { CharacterResonanceChain } from '$lib/types/character';
	import { generate_builds } from '$lib/optimizer/generate_build';
	import { get_echoes_snapshot } from '$lib/db/echo';
	import blazing_brilliance from '$lib/data/weapon/blazing_brilliance';
	import { WeaponSyntonize } from '$lib/types/weapon';
	import { compute_damage } from '$lib/optimizer/damage_pipeline';

	let character_id = $state(changli.game_id);
	let resonance_chain = $state(CharacterResonanceChain[0]);
	const character = $derived(create_character_config(character_id, resonance_chain));

	let weapon_id = $state(blazing_brilliance.game_id);
	let syntonize = $state(WeaponSyntonize[0]);
	const weapon = $derived(create_weapon_config(weapon_id, syntonize));

	let optimizer_settings = $state({ keep_count: 5, });

	const sonata_filter = $state(Object.values(Sonata).map(s => ({ sonata: s, allow_2p: false, allow_5p: false, })));

	const build_count = $derived(generate_builds(get_echoes_snapshot(), sonata_filter).length);

	function launch_optimizer() {
		const builds = generate_builds(get_echoes_snapshot(), sonata_filter);
		builds.map(build => compute_damage(character, weapon, build));
	}

	// const quality_class = {
	// 	2: 'flex flex-row gap-2 bg-rarity-2',
	// 	3: 'flex flex-row gap-2 bg-rarity-3',
	// 	4: 'flex flex-row gap-2 bg-rarity-4',
	// 	5: 'flex flex-row gap-2 bg-rarity-5',
	// }

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
								<option value="{changli.game_id}">{changli.name}</option>
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
								<option value="{blazing_brilliance.game_id}">{blazing_brilliance.name}</option>
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
							<StackInput {stack} on_update={(name, value) => stack.value = value} ></StackInput>
						{/each}
					</div>
				</div>
				<div class="h-72 w-64 flex flex-col border-2 rounded-xl p-2">
					<div class="text-sm">Weapon Effects</div>
					<div class="flex flex-col">
						{#each Object.values(weapon.stacks) as stack (stack.name)}
							<StackInput {stack} on_update={(name, value) => stack.value = value} ></StackInput>
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

<!--{#if results.length > 0}-->
<!--	<div class="mt-6 py-2 border-2 rounded-xl flex flex-col gap-3 divide-y-2">-->
<!--		{#each results as data, i (i)}-->
<!--			<div class="p-1">-->
<!--				<div class="flex flex-row gap-4 items-center">-->
<!--					<div class="font-bold text-lg">Build #{i + 1}</div>-->
<!--					<div class="font-semibold">{data.build_cost}</div>-->
<!--					<div>-->
<!--						{#each data.build_sets as set, j (j)}-->
<!--							<div class="flex flex-row items-center gap-1">-->
<!--								<img src="{get_sonata_image(set.sonata)}" alt="{set.sonata}" class="{sonata_class[set.sonata]}"/>-->
<!--								<div>{set.text}</div>-->
<!--							</div>-->
<!--						{/each}-->
<!--					</div>-->
<!--				</div>-->
<!--				<div class="mt-1 grid grid-cols-5 gap-1">-->
<!--					{#each data.build as echo (echo.id)}-->
<!--						<div class="h-64 flex flex-col bg-indigo-800 gap-1 rounded-b-2xl">-->
<!--							<div>-->
<!--								<div class="{quality_class[echo.quality]}">-->
<!--									<img src="{get_echo_icon(echo.name)?.head}" alt="{echo.name}" class="w-24 bg-indigo-800 rounded-tr-2xl"/>-->
<!--									<div class="flex-1 pl-2 flex flex-col bg-indigo-800 rounded-bl-2xl">-->
<!--										<p class="pt-1 text-xs font-light">{get_echo_class(echo.name)}</p>-->
<!--										<div class="flex flex-row items-center gap-1">-->
<!--											<p class="text-sm font-bold">{echo.name}</p>-->
<!--											<p class="pr-1 text-sm font-semibold">+{echo.level}</p>-->
<!--										</div>-->
<!--										<div class="mt-1 flex flex-row items-center gap-1">-->
<!--											<img src="{STATS_ICONS[echo.main_stat.primary.attribute]}" alt="{echo.main_stat.primary.attribute}" class="w-6" />-->
<!--											<p class="text-xs font-semibold">{echo.main_stat.primary.attribute}</p>-->
<!--											{#if is_flat_stat(echo.main_stat.primary.attribute)}-->
<!--												<p class="text-xs pr-1">{echo.main_stat.primary.value.toFixed(0)}</p>-->
<!--											{:else}-->
<!--												<p class="text-xs pr-1">{echo.main_stat.primary.value.toFixed(1)}%</p>-->
<!--											{/if}-->
<!--										</div>-->
<!--									</div>-->
<!--								</div>-->
<!--							</div>-->
<!--							<div class="pl-2 flex-1 flex flex-col">-->
<!--								{#each echo.sub_stats as sub_stat (sub_stat.attribute)}-->
<!--									<div class="flex flex-row items-center">-->
<!--										<div class="flex-1 flex flex-row items-center">-->
<!--											<img src="{STATS_ICONS[sub_stat.attribute]}" alt="{sub_stat.attribute}" class="w-6"/>-->
<!--											<p class="text-sm">{sub_stat.attribute}</p>-->
<!--											{#if is_flat_stat(sub_stat.attribute)}-->
<!--												<p class="pr-1 flex-1 text-right">+{sub_stat.value.toFixed(0)}</p>-->
<!--											{:else}-->
<!--												<p class="pr-1 flex-1 text-right">+{sub_stat.value.toFixed(1)}%</p>-->
<!--											{/if}-->
<!--										</div>-->
<!--									</div>-->
<!--								{/each}-->
<!--							</div>-->
<!--							<div class="pb-1 px-2 flex flex-row gap-2">-->
<!--								{#if echo.equipped_by}-->
<!--									<p class="flex-1 font-light">Equipped by {echo.equipped_by}</p>-->
<!--								{:else}-->
<!--									<p class="flex-1 font-light">Not equipped</p>-->
<!--								{/if}-->
<!--							</div>-->
<!--						</div>-->
<!--					{/each}-->
<!--				</div>-->
<!--				<div class="mt-1 flex flex-row flex-wrap gap-3 divide-x">-->
<!--					<div class="flex flex-col px-1">-->
<!--						<div class="text-lg font-semibold">Stats</div>-->
<!--						<div class="flex flex-col">-->
<!--							<FinalStat attribute={Attribute.HP} value={data.final_stats[Attribute.HP]} is_percentage={false}></FinalStat>-->
<!--							<FinalStat attribute={Attribute.ATK} value={data.final_stats[Attribute.ATK]} is_percentage={false}></FinalStat>-->
<!--							<FinalStat attribute={Attribute.DEF} value={data.final_stats[Attribute.DEF]} is_percentage={false}></FinalStat>-->
<!--							<FinalStat attribute={Attribute.CritRate} value={data.final_stats[Attribute.CritRate]}></FinalStat>-->
<!--							<FinalStat attribute={Attribute.CritDamage} value={data.final_stats[Attribute.CritDamage]}></FinalStat>-->
<!--							<FinalStat attribute={Attribute.EnergyRegen} value={data.final_stats[Attribute.EnergyRegen]}></FinalStat>-->
<!--							<FinalStat attribute={Attribute.HealingBonus} value={data.final_stats[Attribute.HealingBonus]}></FinalStat>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="flex flex-col gap-1 divide-y">-->
<!--						<div class="flex flex-col px-1">-->
<!--							<div class="font-semibold">Attack Bonus</div>-->
<!--							<div class="flex flex-col">-->
<!--								<FinalStat attribute={Attribute.BasicAttackBonus} value={data.final_stats[Attribute.BasicAttackBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.HeavyAttackBonus} value={data.final_stats[Attribute.HeavyAttackBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.ResonanceSkillBonus} value={data.final_stats[Attribute.ResonanceSkillBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.ResonanceLiberationBonus} value={data.final_stats[Attribute.ResonanceLiberationBonus]}></FinalStat>-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="flex flex-col px-1">-->
<!--							<div class="font-semibold">Element Bonus</div>-->
<!--							<div class="flex flex-col">-->
<!--								<FinalStat attribute={Attribute.GlacioBonus} value={data.final_stats[Attribute.GlacioBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.FusionBonus} value={data.final_stats[Attribute.FusionBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.ElectroBonus} value={data.final_stats[Attribute.ElectroBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.AeroBonus} value={data.final_stats[Attribute.AeroBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.SpectroBonus} value={data.final_stats[Attribute.SpectroBonus]}></FinalStat>-->
<!--								<FinalStat attribute={Attribute.HavocBonus} value={data.final_stats[Attribute.HavocBonus]}></FinalStat>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="flex-1 flex flex-col px-1">-->
<!--						<div class="text-lg font-semibold">Skills (average damage)</div>-->
<!--						<div class="flex flex-row divide-x gap-1">-->
<!--							{#each Object.entries(data.final_damages).filter(d => d[1].some(v => v.values.length > 0)) as [type, skill_data], i (i)}-->
<!--								<div class="flex-1 flex flex-col px-1">-->
<!--									<div class="font-semibold">{type}</div>-->
<!--									<div class="flex flex-col">-->
<!--										{#each skill_data as skill (skill.name)}-->
<!--											<div class="flex flex-row justify-between gap-2">-->
<!--												<div class="text-sm">{skill.name}</div>-->
<!--												<div class="text-sm">{skill.values.reduce((acc, n) => acc + n, 0).toFixed(0)}</div>-->
<!--											</div>-->
<!--										{/each}-->
<!--									</div>-->
<!--								</div>-->
<!--							{/each}-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		{/each}-->
<!--	</div>-->
<!--{/if}-->