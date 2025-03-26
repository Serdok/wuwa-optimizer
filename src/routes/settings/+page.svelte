<script lang="ts">
	import { db } from '$lib/db';

	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	async function export_echoes() {
		const echoes = await db.echoes.toArray();
		const blob = new Blob([JSON.stringify(echoes)], { type: 'application/octet-stream' });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'echoes.json';

		link.click();
	}

	async function delete_echoes() {
		await db.echoes.clear();
		toast.message('done');
	}
</script>

<Button type="button" variant="default" onclick={() => export_echoes()}>export echoes</Button>
<Button type="button" variant="destructive" onclick={() => delete_echoes()}>delete all echoes</Button>