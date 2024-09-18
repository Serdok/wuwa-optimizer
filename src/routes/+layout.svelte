<script>
	import "../app.css";
	import { base } from '$app/paths';

	const { children } = $props();
</script>

<div class="flex flex-row pt-2 pl-2">
	<nav class="basis-1/12 flex flex-col gap-2 bg-indigo-800">
		<a href="{base}/" class="pl-2 hover:bg-indigo-950">Home</a>
		<a href="{base}/build" class="pl-2 hover:bg-indigo-950">Build</a>
		<a href="{base}/echoes" class="pl-2 hover:bg-indigo-950">Echoes</a>
	</nav>

	<main class="container mx-auto">
		{@render children()}
	</main>
</div>