<script lang="ts">
	import FileList from './fileList.svelte';
	import File from './file.svelte';
	const { data } = $props();
</script>

{#if data.page === 'list'}
	<FileList data={data}/>
{:else }
	<File data={data}/>
{/if}