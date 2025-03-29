<script lang="ts">
	import { db } from '$lib/db';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import type { Echo } from '$lib/data/echoes/types';

	let import_file: FileList | undefined = $state();

	async function export_echoes() {
		const echoes = await db.echoes.toArray();
		const blob = new Blob([JSON.stringify(echoes)], { type: 'application/octet-stream' });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'echoes.json';

		link.click();
	}

	async function import_echoes() {
		if (!import_file) {
			toast.error('no file was provided');
			return;
		}

		try {
			const file = import_file[0];
			const contents: Echo[] = JSON.parse(await file.text());
			await db.echoes.bulkAdd(contents);
			toast.message('done');
		} catch (e) {
			const err = e as Error;
			console.error(e);
			toast.error(err.message);
		}
	}

	async function delete_echoes() {
		await db.echoes.clear();
		toast.message('done');
	}
</script>

<div class="flex flex-col space-y-4 max-w-[25%]">
	<Button type="button" variant="default" onclick={() => export_echoes()}>export echoes</Button>
	<div class="flex flex-row space-x-2">
		<Input type="file" accept="application/json" bind:files={import_file} />
		<Button type="button" variant="default" onclick={() => import_echoes()} disabled={import_file === undefined}>import echoes</Button>
	</div>
	<Button type="button" variant="destructive" onclick={() => delete_echoes()}>delete all echoes</Button>
</div>