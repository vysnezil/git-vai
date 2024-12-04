<script lang="ts">
	import RepositorySettings from '../../../../repositorySettings.svelte';

	let { form, data } = $props();
	if (form === null) { form = data.form; }
	let showWarning = $state(false);

	const toggleW = (e) => {
		showWarning = !showWarning;
		e.preventDefault();
	};
</script>

{#if showWarning}
<div class="flex items-left justify-left rounded-lg shadow bg-slate-50 absolute top-1/3 max-w-l">
	<form class="p-5 w-full" action="?/delete" method="post">
		<div class="my-4 text-center">
			Are you sure want to delete this repository?
		</div>
		<div class="flex flex-wrap gap-2">
			<button onclick={toggleW} class="grow shadow-sm rounded-lg border border-gray-300 text-gray-700 bg-sky-50 hover:text-white hover:bg-gray-400 px-5 py-2 text-sm font-medium">
				No, go back
			</button>
			<input type="submit" value="Yes, delete repository" class="grow cursor-pointer shadow-sm rounded-lg border border-gray-300 text-gray-700 bg-red-100 hover:text-white hover:bg-red-400 px-5 py-2 text-sm font-medium">
		</div>
	</form>
</div>

{/if}
<RepositorySettings form={form} title="Edit repository">
	<div class="flex gap-2 items-center flex-wrap">
		<button onclick={toggleW} class="cursor-pointer shadow-sm rounded-lg border border-gray-300 text-gray-700
	   bg-red-100 hover:text-white hover:bg-red-400 px-5 py-2 text-sm font-medium">Delete</button>
		<div class="flex-grow text-red-500 text-md italic">
			{#if form?.error}
				{form.error}
			{/if}
			{#if form?.success}
				{form.success}
			{/if}
		</div>
		<a href="/{data.username}/{form.repo_name}" class="cursor-pointer shadow-sm rounded-lg border border-gray-300 text-gray-700
	   bg-sky-50 hover:text-white hover:bg-gray-400 px-5 py-2 text-sm font-medium">Cancel</a>
		<input type="submit" value="Save changes"
		       class="cursor-pointer shadow-sm rounded-lg border border-gray-300 text-gray-700
       bg-sky-100 hover:text-white hover:bg-sky-500 px-5 py-2 text-sm font-medium">
	</div>
</RepositorySettings>