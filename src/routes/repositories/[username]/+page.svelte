<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex justify-between items-center flex-col">
    {#if data.username.toLowerCase() === "user1"}
        <div>my repos</div>
    {:else}
        <div>{data.username} repos</div>
    {/if}
</div>