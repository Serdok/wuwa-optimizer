<script lang="ts">
	import { page } from '$app/state';

	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { ModeWatcher } from 'mode-watcher';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Toaster } from '$lib/components/ui/sonner';

	import AppSidebar from './app-sidebar.svelte';

	// import { Moon, Settings, Skull, SquareKanban, Sun } from 'lucide-svelte';

	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />
<Toaster position="bottom-right" closeButton={true} richColors={true} />

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Trigger />
	<main class="w-full px-4 py-2">
		{@render children()}
	</main>
</Sidebar.Provider>

<div class="hidden">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>