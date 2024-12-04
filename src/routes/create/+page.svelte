<script lang="ts">
	import RepositorySettings from '../../repositorySettings.svelte';

	const { form } = $props();
</script>

<RepositorySettings form={form} title="Create new repository">
	<div class="flex gap-2">
		<div class="flex-grow text-red-500 text-md italic">
			{#if form?.error}
				{form.error}
			{/if}
		</div>
		<button onclick={() => history.back()} class="cursor-pointer shadow-sm rounded-lg border border-gray-300 text-gray-700
	   bg-sky-50 hover:text-white hover:bg-gray-400 px-5 py-2 text-sm font-medium">Back</button>
		<input type="submit" value="Create repository"
	       class="cursor-pointer shadow-sm rounded-lg border border-gray-300 text-gray-700
	       bg-sky-100 hover:text-white hover:bg-sky-500 px-5 py-2 text-sm font-medium">
	</div>
</RepositorySettings>