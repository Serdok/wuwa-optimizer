<script lang="ts">
	import { base } from '$app/paths';
	import { EchoClass, EchoQuality, Sonata } from '$lib/types/echo';
	import { ECHO_CLASS_COST, ECHOES_METADATA } from '$lib/data/echo';
	import type { Stat, Attribute } from '$lib/types/stat';
	import { get_main_stat_value, PRIMARY_MAIN_STATS, SUB_STATS } from '$lib/data/echo_stats';
	import { is_flat_stat } from '$lib/data/stat';
	import { SECONDARY_MAIN_STATS } from '$lib/data/echo_stats.js';
	import { clamp } from '$lib/utils';
	import { unshift_echo } from '$lib/db/echo';

	let name = $state('');
	let quality: EchoQuality = $state(5);

	const metadata = $derived(ECHOES_METADATA.find(e => e.name === name));

	let sonata = $state('');

	const max_level = $derived(quality * 5);
	let level = $state(0);

	const update_main_stat_value = (input: readonly {attribute: Attribute, values: readonly { quality: EchoQuality, base: number, }[]}[] | undefined, attribute: Attribute | '', quality: EchoQuality, level: number) => {
		if (!input) return 0;

		const values = input.find(s => s.attribute === attribute)?.values;
		if (!values) return 0;

		const base_stat = values.find(v => v.quality === quality);
		if (!base_stat) return 0;

		return get_main_stat_value(level, base_stat.base);
	}

	const primary_stats = $derived(PRIMARY_MAIN_STATS.find(s => metadata && s.cost === ECHO_CLASS_COST[metadata.class])?.stats);
	let primary_stat: Attribute | '' = $state('');
	let primary_value = $derived((() => (update_main_stat_value(primary_stats, primary_stat, quality, level)))());

	const secondary_stats = $derived(SECONDARY_MAIN_STATS.find(s => metadata && s.cost === ECHO_CLASS_COST[metadata.class])?.stats);
	let secondary_stat: Attribute | '' = $state('');
	let secondary_value = $derived((() => (update_main_stat_value(secondary_stats, secondary_stat, quality, level)))());

	const max_sub_stats = $derived(Math.floor(Math.min(max_level / 5, level / 5)));
	let stats_keys: (Attribute | '')[] = $state(Array(5).fill(''));
	let stats_values = $state(Array(5).fill(0));
	const sub_stats = $derived(stats_keys.map(attr => SUB_STATS.find(s => s.attribute === attr)));

	const on_name_change = () => {
		if (metadata) {
			sonata = metadata.sonata[0];
		}

		if (primary_stats && !primary_stats.find(s => s.attribute === primary_stat)) {
			primary_stat = primary_stats[0].attribute;
		}

		if (secondary_stats && !secondary_stats.find(s => s.attribute === secondary_stat)) {
			secondary_stat = secondary_stats[0].attribute;
		}
	}

	const on_quality_change = () => {
		level = clamp(level, 0, max_level);
		on_level_change();
	}

	const on_level_change = () => {
		level = clamp(level ?? 0, 0, max_level);

		// on_primary_stat_change();
		// on_secondary_stat_change();
		for (let i = Math.floor(level / 5); i < 5; i += 1 ) {
			stats_keys[i] = '';
			stats_values[i] = 0;
		}
	}

	// const on_main_stat_change = (stat: StatType | '', stats: readonly {attribute: StatType, values: readonly {quality: EchoQuality, base: number}[]}[]) => {
	// 	if (stat !== '' && stats) {
	// 		return update_main_stat_value(stats, stat, quality, level);
	// 	}
	// }

	const on_key_update = (n: number, stat: '' | Attribute) => {
		// Set default value
		stats_values[n] = sub_stats[n]?.values[0] ?? 0;

		// Reset next keys that have the same value
		for (let i = n + 1; i < stats_keys.length; i += 1) {
			if (stats_keys[i] === stat) {
				stats_keys[i] = '';
			}
		}
	}

	const rarity_colors = {
		2: 'bg-gradient-to-b from-rarity-2 via-rarity-2 via-5% to-50%',
		3: 'bg-gradient-to-b from-rarity-3 via-rarity-3 via-5% to-50%',
		4: 'bg-gradient-to-b from-rarity-4 via-rarity-4 via-5% to-50%',
		5: 'bg-gradient-to-b from-rarity-5 via-rarity-5 via-5% to-50%',
	}

	const finalize_echo = () => {
		if (!metadata) {
			console.error('echo metadata not set')
			return;
		}

		if (sonata === '') {
			console.error('sonata not set');
			return;
		}
		if (primary_stat === '') {
			console.error('primary stat not set');
			return;
		}
		if (secondary_stat === '') {
			console.error('secondary stat not set');
			return;
		}

		const stats: Stat[] = [];
		for (let i = 0; i < max_sub_stats; i += 1) {
			if (stats_keys[i] === '') {
				// todo: push `null` instead to mark a *possible* roll?
				continue;
			}

			stats.push({ attribute: stats_keys[i] as Attribute, value: stats_values[i] });
		}

		unshift_echo({
			id: crypto.randomUUID(),
			name,
			quality,
			class: metadata.class,
			cost: ECHO_CLASS_COST[metadata.class],
			sonata: sonata as Sonata,
			level,
			main_stat: {
				primary: { attribute: primary_stat, value: primary_value ?? 0 },
				secondary: { attribute: secondary_stat, value: secondary_value ?? 0 },
			},
			sub_stats: stats,
			equipped_by: null,
		});
	}
</script>

<div>
	<div class="flex flex-row gap-4">
		<div class="flex flex-col items-center">
			{#if metadata}
				<img src="{metadata.icon.head}" alt="{name}" class="{rarity_colors[quality]}" />
			{:else}
				<img src="{base}/assets/monster/head/T_IconMonsterHead00_UI.png" alt="blank echo"/>
				<div>Select an echo from the right!</div>
			{/if}
		</div>
		<div class="basis-1/3 flex flex-col gap-1">
			<div>
				<select bind:value={name} onchange="{on_name_change}" class="bg-indigo-800">
					<option value="" disabled>Select an echo</option>
					{#each Object.values(EchoClass) as c}
						<optgroup label="{c}">
							{#each ECHOES_METADATA.filter(e => e.class === c) as echo (echo.name)}
								<option value="{echo.name}">{echo.name}</option>
							{/each}
						</optgroup>
					{/each}
				</select>
				<select bind:value={quality} onchange="{on_quality_change}" class="bg-indigo-800">
					<option value="" disabled>Quality</option>
					{#each EchoQuality.toReversed() as q}
						<option value="{q}">{q}</option>
					{/each}
				</select>
			</div>

			<div>
				<select bind:value={sonata} class="bg-indigo-800">
					<option value="" disabled>Sonata</option>
					{#each metadata?.sonata ?? [] as s}
						<option value="{s}">{s}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-row gap-2">
				<input bind:value={level} type="number" min="0" max="{max_level}" onchange="{on_level_change}" class="flex-1 bg-indigo-800"/>
				<div class="flex flex-row items-stretch">
					<button type="button" onclick="{() => { level -= 1; on_level_change(); }}" disabled="{level === 0}" class="font-bold w-6 border-y border-l rounded-l-2xl">-</button>
					{#each [...Array(quality + 1).keys()].map(l => l * 5) as step}
						<button type="button" onclick="{() => { level = step; on_level_change(); }}" class="font-bold w-10 border-y border-l">{step}</button>
					{/each}
					<button type="button" onclick="{() => { level += 1; on_level_change(); }}" disabled="{level === max_level}" class="font-bold w-6 border rounded-r-2xl">+</button>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				{#if primary_stats}
					<select bind:value={primary_stat} disabled="{primary_stats.length === 1}" class="basis-1/3 bg-indigo-800">
							{#each primary_stats as stat (stat.attribute)}
								<option value="{stat.attribute}">{stat.attribute}</option>
							{/each}
					</select>
					<div class="flex items-center">
						{#if primary_stat !== ''}
							{#if is_flat_stat(primary_stat)}
								<div class="pl-2">{primary_value.toFixed(0)}</div>
							{:else}
								<div class="pl-2">{primary_value.toFixed(1)}%</div>
							{/if}
						{/if}
					</div>
				{/if}
			</div>

			<div class="flex flex-row gap-2">
				{#if secondary_stats}
					<select bind:value={secondary_stat} disabled="{secondary_stats.length === 1}" class="basis-1/3 bg-indigo-800">
						{#each secondary_stats as stat (stat.attribute)}
							<option value="{stat.attribute}">{stat.attribute}</option>
						{/each}
					</select>
					<div class="flex items-center">
						{#if secondary_stat !== ''}
							{#if is_flat_stat(secondary_stat)}
								<div class="pl-2">{secondary_value.toFixed(0)}</div>
							{:else}
								<div class="pl-2">{secondary_value.toFixed(1)}%</div>
							{/if}
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<div class="flex flex-col gap-1">
			{#each stats_keys as stat, i}
				<div class="flex flex-row gap-1">
					<select bind:value={stats_keys[i]} disabled={i >= max_sub_stats} onchange="{() => on_key_update(i, stat)}" class="basis-2/3 bg-indigo-800">
						<option value="">Tune at level +{(i + 1) * 5}</option>
						{#each SUB_STATS as s}
							<option value="{s.attribute}" disabled="{stats_keys.slice(0, i).includes(s.attribute)}">{s.attribute}</option>
						{/each}
					</select>
					<select bind:value={stats_values[i]} disabled="{!stats_values[i]}" class="flex-1 bg-indigo-800">
						{#each sub_stats[i]?.values ?? [] as value}
							{#if stat !== ''}
								{#if is_flat_stat(stat)}
									<option value="{value}">{value}</option>
								{:else}
									<option value="{value}">{value}%</option>
								{/if}
							{/if}
						{/each}
					</select>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-2">
		<button type="button" onclick="{finalize_echo}" disabled="{!metadata}" class="rounded-md bg-indigo-800 p-2">Add Echo</button>
	</div>
</div>