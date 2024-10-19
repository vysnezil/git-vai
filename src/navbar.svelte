<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	import { faEgg } from '@fortawesome/free-solid-svg-icons'
</script>

<style lang="postcss">
    .nav-entry {
        @apply text-sky-200 hover:text-white;
    }
</style>

<nav class="flex justify-between bg-sky-600 p-4 px-6">
    <div class="flex flex-wrap items-center gap-8">
        <a href="/" class="flex items-center text-white gap-2">
            <FontAwesomeIcon icon={faEgg} size="2xl" />
            <div class="font-semibold text-xl">
				GITvai
			</div>
        </a>
        <div class="flex flex-wrap gap-4">
            <a href="/repositories" class="nav-entry">Explore</a>
            <a href="/repositories" class="nav-entry">My repositories</a>
            <a href="/repositories" class="nav-entry">Shared repositories</a>
        </div>
    </div>
    <div class="flex items-center">
        <a href="/" class="font-medium text-white hover:text-sky-100">User1</a>
    </div>
</nav>