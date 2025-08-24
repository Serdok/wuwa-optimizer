<script lang="ts">
	import type { StatResult, StatType } from '$lib/data/stats/types';
	import { type CharacterDef, MOTIONS } from '$lib/data/characters/types';
	import type { BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { get_message } from '$lib/messages';

	interface Props {
		character: CharacterDef<BuffSchema<RankedBuffDef>>;
		stats: StatResult<StatType>;
	}

	let { character, stats = $bindable() }: Props = $props();
</script>

<div class="grid grid-cols-3 auto-cols-fr gap-2">
	<div class="p-2 border rounded-lg flex flex-col gap-2">
		<div class="px-2">{get_message('main_stats')}</div>
		<div class="px-4 grid grid-cols-2 gap-1">
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-hp_p" value={stats.hp_p} oninput={e => stats.hp_p = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-hp_p">{get_message('hp_p')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-hp" value={stats.hp} oninput={e => stats.hp = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-hp">{get_message('hp')}</Label>
			</div>

			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-atk_p" value={stats.atk_p} oninput={e => stats.atk_p = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-atk_p">{get_message('atk_p')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-atk" value={stats.atk} oninput={e => stats.atk = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-atk">{get_message('atk')}</Label>
			</div>

			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-def_p" value={stats.def_p} oninput={e => stats.def_p = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-def_p">{get_message('def_p')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-def" value={stats.def} oninput={e => stats.def = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-def">{get_message('def')}</Label>
			</div>

			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-crit_rate" value={stats.crit_rate} oninput={e => stats.crit_rate = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-crit_rate">{get_message('crit_rate')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-crit_dmg" value={stats.crit_dmg} oninput={e => stats.crit_dmg = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-crit_dmg">{get_message('crit_dmg')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-energy_regen" value={stats.energy_regen} oninput={e => stats.energy_regen = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-energy_regen">{get_message('energy_regen')}</Label>
			</div>
		</div>
	</div>
	<div class="p-2 border rounded-lg flex flex-col gap-2">
		<div class="px-2">{get_message('combat_stats')}</div>
		<div class="px-4 grid grid-cols-2 gap-1">
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-general_bonus" value={stats.general_bonus} oninput={e => stats.general_bonus = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-general_bonus">{get_message('general_bonus')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-general_amplify" value={stats.general_amplify} oninput={e => stats.general_amplify = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-general_amplify">{get_message('general_amplify')}</Label>
			</div>

			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-{character.base_element}_bonus"
							 value={stats[`${character.base_element}_bonus`]} oninput={e => stats[`${character.base_element}_bonus`] = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-{character.base_element}_bonus">{get_message(`${character.base_element}_bonus`)}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-{character.base_element}_amplify"
							 value={stats[`${character.base_element}_amplify`]} oninput={e => stats[`${character.base_element}_amplify`] = +e.currentTarget.value} class="basis-20" />
				<Label for="extra-stat-{character.base_element}_amplify">{get_message(`${character.base_element}_amplify`)}</Label>
			</div>

			{#each MOTIONS as a (a)}
				<div class="flex flex-row items-center gap-2">
					<Input id="extra-stat-{a}_bonus" value={stats[`${a}_bonus`]} oninput={e => stats[`${a}_bonus`] = +e.currentTarget.value}
								 class="basis-20" />
					<Label for="extra-stat-{a}_bonus">{get_message(`${a}_bonus`)}</Label>
				</div>
				<div class="flex flex-row items-center gap-2">
					<Input id="extra-stat-{a}_amplify" value={stats[`${a}_amplify`]} oninput={e => stats[`${a}_amplify`] = +e.currentTarget.value}
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
				<Input id="extra-stat-healing_bonus" value={stats.healing_bonus} oninput={e => stats.healing_bonus = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-healing_bonus">{get_message('healing_bonus')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-skill_multiplier" value={stats.skill_multiplier} oninput={e => stats.skill_multiplier = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-skill_multiplier">{get_message('skill_multiplier')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-enemy_resistance" value={stats.enemy_resistance} oninput={e => stats.enemy_resistance = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-enemy_resistance">{get_message('enemy_resistance')}</Label>
			</div>
			<div class="flex flex-row items-center gap-2">
				<Input id="extra-stat-enemy_def_ignore" value={stats.enemy_def_ignore} oninput={e => stats.enemy_def_ignore = +e.currentTarget.value}
							 class="basis-20" />
				<Label for="extra-stat-enemy_def_ignore">{get_message('enemy_def_ignore')}</Label>
			</div>
		</div>
	</div>
</div>