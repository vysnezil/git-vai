<script lang="ts">
	import '../app.css';
  let { children, data } = $props();
	import Navbar from '../navbar.svelte';

	import { config } from '@fortawesome/fontawesome-svg-core';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	config.autoAddCss = false;
</script>

<Navbar username={data.username} />
<div class="con flex justify-center items-start h-full px-2 pt-8">
    {@render children()}
</div>

<style lang="postcss">
    .con {
        margin-top: 0;
    }
</style>