<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	import { faFolder } from '@fortawesome/free-regular-svg-icons'
	import { faLock } from '@fortawesome/free-solid-svg-icons';

	const { children, repos, title } = $props();
</script>

<div class="con">
	<div class="flex justify-between items-center flex-wrap px-4">
		<div class="my-4 text-3xl text-gray-500 flex items-center">
			{ title }
		</div>
		{@render children()}
	</div>
	<ul class="pb-2 text-sm text-gray-700">
		{#each repos as repo}
			<li class="border-b hover:bg-gray-100 text-base px-4">
				<a href="/{repo.owner.username}/{repo.name}" class="flex justify-between flex-center py-3 gap-3">
					<div class="flex flex-center items-center gap-2">
						<FontAwesomeIcon icon={faFolder} size="lg" />
						<div class="flex items-center">
							<div class="text-gray-500">{repo.owner.username}/</div>
							<div class="font-medium">{repo.name}</div>
							{#if repo.private}
								<FontAwesomeIcon icon={faLock} size="lg" class="ml-2 w-5 h-5 text-slate-700"/>
							{/if}
						</div>
					</div>
					<div class="text-gray-500">{repo.description}</div>
					<div class="text-gray-500">{repo.created}</div>
				</a>
			</li>
		{/each}
		{#if repos.length === 0}
			<div class="text-center text-lg mt-4">
				There are no repositories
			</div>
		{/if}
	</ul>
</div>

<style lang="postcss">
    .con {
        @apply bg-white divide-y divide-gray-100 rounded-lg shadow p-1;
        max-height: max-content;
        width: 100%;
        max-width: 48rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
    }
</style>