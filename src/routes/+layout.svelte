<script lang="ts">
	import '../app.css';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from './AppSidebar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<ModeWatcher/>

<ParaglideJS {i18n}>
	<Sidebar.Provider>
		<AppSidebar/>
		<main class="w-full p-4">
			<Sidebar.Trigger />
			{@render children()}
		</main>
		<Toaster position="bottom-right" richColors closeButton />
	</Sidebar.Provider>
</ParaglideJS>
