<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	import { faEgg } from '@fortawesome/free-solid-svg-icons'

  let { username } = $props();
</script>

<nav class="flex justify-between bg-sky-600 p-4 px-6 flex-wrap gap-5">
    <div class="flex flex-wrap items-center gap-8">
        <a href="/" class="flex items-center text-white gap-2">
            <FontAwesomeIcon icon={faEgg} size="2xl" />
            <div class="font-semibold text-xl">
				GITvai
			</div>
        </a>
        <div class="flex flex-wrap gap-4">
            <a href="/repositories" class="nav-entry">Explore</a>
            {#if username}
                <a href="/repositories/{username}" class="nav-entry">My repositories</a>
                <a href="/repositories/{username}/shared" class="nav-entry">Shared repositories</a>
            {/if}
        </div>
    </div>
    <div class="flex grow justify-center">
        <input class="bg-transparent search" placeholder="Search">
    </div>
    <div class="flex items-center">
        {#if !username}
            <div class="flex gap-3 flex-wrap">
                <a class="btn" href="/login">
                    Login
                </a>
                <a class="btn" href="/register">
                    Register
                </a>
            </div>
        {:else}
            <a href="/logout" class="font-medium text-white hover:text-sky-100"
            onclick={() => username = ''}>{username}</a>
        {/if}

    </div>
</nav>

<style lang="postcss">
    .nav-entry {
        @apply text-sky-200 hover:text-white;
    }
    .btn {
        border: solid 1px whitesmoke;
        height: 2rem;
        flex-grow:1;
        max-width: 5.5rem;
        justify-content: center;
    }
    .search {
        @apply rounded-lg;
        border: solid 1px #bae6fd;
        flex-grow:1;
        justify-content: center;
        height: 2.5rem;
        padding: 0 1rem;
        max-width: 23.5rem;
    }
    nav {
        row-gap: 0.5rem;
    }
</style>