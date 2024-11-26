<script lang="ts">
	import { base } from '$app/paths';
	import * as Sidebar from '$lib/components/ui/sidebar';

	import { House, SquareFunction, Sun, Moon, BoxesIcon } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';

	const items = [
		{
			title: 'Build',
			url: 'build',
			icon: SquareFunction,
		},
		{
			title: 'Echoes',
			url: 'echo',
			icon: BoxesIcon
		}
	]
</script>

<Sidebar.Root>
	<Sidebar.Header />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href="{base}/build" {...props}>
							<House />
							<span>Home</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.Menu>
		</Sidebar.Group>
		<Sidebar.Separator />
		<Sidebar.Group>
			<Sidebar.GroupLabel>Optimizer</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{#each items as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href="{base}/{item.url}" {...props}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton onclick={toggleMode} size="icon">
					<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span class="sr-only">Toggle theme</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>

