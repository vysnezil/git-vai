<style lang="postcss">
	.nav-entry {
		@apply text-sky-200 hover:text-white;
	}
</style>

<nav class="flex justify-between bg-sky-600 p-4 px-6">
	<div class="flex flex-wrap items-center gap-8">
		<div class="flex items-center text-white">
			<svg width="54" height="54" class="fill-current h-8 w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 496C86 496 0 394 0 288C0 176 64 16 192 16s192 160 192 272c0 106-86 208-192 208zM154.8 134c6.5-6 7-16.1 1-22.6s-16.1-7-22.6-1c-23.9 21.8-41.1 52.7-52.3 84.2C69.7 226.1 64 259.7 64 288c0 8.8 7.2 16 16 16s16-7.2 16-16c0-24.5 5-54.4 15.1-82.8c10.1-28.5 25-54.1 43.7-71.2z"/></svg>
			<span class="font-semibold text-xl">
				<a href="/">GITvai</a>
			</span>
		</div>
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