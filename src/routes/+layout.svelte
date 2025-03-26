<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import { Button } from '$lib/components/ui/button';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Toaster } from '$lib/components/ui/sonner';

	import { Moon, Settings, Skull, SquareKanban, Sun } from 'lucide-svelte';

	import '../app.css';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<ModeWatcher defaultMode="dark" />
	<Toaster position="bottom-right" closeButton={true} richColors={true} />

	<Sidebar.Provider>
		<Sidebar.Root variant="sidebar" collapsible="icon">
			<Sidebar.Header />
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>optimizer</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={page.route.id === '/optimize'}>
									{#snippet child({ props })}
										<a href="{base}/optimize" {...props}>
											<SquareKanban />
											<span>optimize</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={page.route.id === '/echoes'}>
									{#snippet child({ props })}
										<a href="{base}/echoes" {...props}>
											<Skull />
											<span>echoes</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Footer>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<div class="flex flex-row items-center space-x-1">
									<Button onclick={toggleMode} variant="outline" size="icon" {...props}>
										<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
										<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
										<span class="sr-only">Toggle theme</span>
									</Button>
									<Button href="{base}/settings" variant="outline" size="icon" {...props}><Settings /></Button>
								</div>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Footer>
			<Sidebar.Rail />
		</Sidebar.Root>
		<Sidebar.Trigger />
		<main class="w-full px-4 py-2">
			{@render children()}
		</main>
	</Sidebar.Provider>
</ParaglideJS>
