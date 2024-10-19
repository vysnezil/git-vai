<script>
	import '../app.css';
	import Navbar from '../navbar.svelte';

	import { config } from '@fortawesome/fontawesome-svg-core';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	config.autoAddCss = false;
</script>

<style lang="postcss">
    .con {
        margin-top: 0;
    }
</style>

<Navbar />
<div class="con flex justify-center items-start h-full px-2 pt-8">
    <slot />
</div>


