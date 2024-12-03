<script lang="ts">
	let { data } = $props();
</script>

<div class="flex justify-between items-center flex-col">
    {#if data.username?.toLowerCase() === data.owner.toLowerCase()}
        <div>my repos</div>
    {:else}
        <div>{data.owner} repos</div>
    {/if}
</div>