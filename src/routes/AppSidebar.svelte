<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import { SquareKanban, Skull, Settings, Sun, Moon } from '@lucide/svelte';

	import { toggleMode } from 'mode-watcher';
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Optimizer</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={page.route.id === '/optimize'}>
							{#snippet child({ props })}
								<a {...props} href="{base}/optimize">
									<SquareKanban />
									<span>Optimize</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={page.route.id === '/echoes'}>
							{#snippet child({ props })}
								<a {...props} href="{base}/echoes">
									<Skull />
									<span>Echoes</span>
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
						<a {...props} href="{base}/settings">
							<Settings />
							<span>Settings</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<button {...props} onclick={toggleMode}>
							<Sun
								class="size-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								class="absolute size-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
							/>
							<span>Toggle theme</span>
						</button>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
		<Sidebar.Rail />
	</Sidebar.Footer>
</Sidebar.Root>
