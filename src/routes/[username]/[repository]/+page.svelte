<script lang="ts">
	import { faGear, faLock } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	const { data } = $props();
	import { page } from '$app/state';
	import { faClipboard } from '@fortawesome/free-regular-svg-icons';

	const copy = async (id: string) => {
		const el = document.getElementById(id);
		if (el === undefined || el === null) return;
		await navigator.clipboard.writeText(el.innerHTML.trim());
	}
</script>

<div class="w-full max-w-3xl flex flex-col justify-center gap-2">
	<div class="flex items-center mt-4 mb-2">
		<div class="text-3xl text-gray-500"><a href="/repositories/{data.repo.owner.username}">{data.repo.owner.username}/</a></div>
		<div class="text-3xl mr-3">{data.repo.name}</div>
		{#if data.repo.private}
			<FontAwesomeIcon icon={faLock} size="2xl" class="w-5 h-5 text-slate-700"/>
		{/if}
		<div class="flex-grow"></div>
		{#if data.repo.owner.username === data.username}
			<a href="/settings/{data.repo.owner.username}/{data.repo.name}" class="settings">
				<FontAwesomeIcon icon={faGear} size="lg" class="text-slate-700"/>
			</a>
		{/if}
	</div>

	<div class="flex items-center justify-center flex-col rounded-lg shadow bg-slate-50 w-full p-1 mt-2 h-60">
		<div class="text-xl mb-6">
			This repository is empty
		</div>
		<div class="flex">
			<code id="command" class="px-4 py-2 text-xl border rounded">
				git clone {page.url}.git
			</code>
			<button class="p-1 w-11 h-11 border" onclick="{() => copy('command')}">
				<FontAwesomeIcon icon={faClipboard} size="lg" />
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
    .settings {
        @apply border border-gray-600 text-gray-700 hover:bg-slate-400 rounded-lg text-sm;
        display: flex;
        align-items: center;
        padding: 0.75rem;
        background-color: transparent;
    }
</style>