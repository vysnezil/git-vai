<script lang="ts">
	import '../app.css';
	import Navbar from '../navbar.svelte';

	import { config } from '@fortawesome/fontawesome-svg-core';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	config.autoAddCss = false;

  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
</script>

<Navbar username={data.username} />
<div class="con flex justify-center items-start h-full px-2 pt-8">
    <slot />
</div>

<style lang="postcss">
    .con {
        margin-top: 0;
    }
</style>