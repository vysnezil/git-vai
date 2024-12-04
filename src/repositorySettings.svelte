<script lang="ts">
	const { form, title, children } = $props();
</script>

<div class="w-full flex flex-col flex-wrap max-w-3xl">
	<div class="my-4 text-3xl text-gray-500 flex items-center">
		{ title }
	</div>
	<div class="p-5 items-left justify-left flex rounded-lg shadow bg-slate-50">
		<form action="?/save" method="post" class="w-full flex gap-2 flex-col" autocomplete="off">
			<label class="block text-gray-700 text-sm font-bold" for="repo_name">
				Repository name
			</label>
			<div class="flex items-center flex-wrap gap-3">
				<input class="grow shadow border rounded py-2 px-3 text-gray-700 focus:outline-none" required value={form?.repo_name}
				       name="repo_name" id="repo_name" type="text" placeholder="repository name">
				<div class="flex items-center justify-between gap-1">
					<label for="private" class="">Private repository</label>
					<input type="checkbox" id="private" name="private" checked={form?.private}
					       class="w-5 h-5 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
				</div>
			</div>
			<div class="mb-1 shadow-sm">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="description">
					Description
				</label>
				<textarea class="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
				          name="description" id="description" placeholder="repository description">{form?.description}</textarea>
			</div>
			{@render children()}
		</form>
	</div>
</div>
