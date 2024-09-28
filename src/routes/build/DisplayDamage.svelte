<script lang="ts">
	const { skill_damage, hits }: { skill_damage: 0 | 1 | 2, hits: { non_crit: number, average: number, crit: number }[] } = $props();

	const formatted_hits = $derived.by(() => {
		const hit_map = hits.reduce<{ [hit: string]: number }>((freq, hit) => {
			let formatted_hit = '';
			if (skill_damage === 0) formatted_hit = hit.non_crit.toFixed(0);
			if (skill_damage === 1) formatted_hit = hit.average.toFixed(0);
			if (skill_damage === 2) formatted_hit = hit.crit.toFixed(0);

			freq[formatted_hit] = (freq[formatted_hit] || 0) + 1
			return freq;
		}, {});

		return Object.entries(hit_map).map(([value, count]) => {
			if (count === 1) {
				return `${value}`;
			}

			return `${count}x${value}`
		}).join('+')
	})
</script>

<div>{formatted_hits}</div>