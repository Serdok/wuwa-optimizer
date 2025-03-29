<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { setLocale } from '$lib/paraglide/runtime';
</script>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>
<div>
	<button onclick={() => setLocale('en')}>en</button>
	<button onclick={() => setLocale('fr-fr')}>fr-fr</button>
</div>
