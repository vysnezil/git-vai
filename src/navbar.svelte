<style lang="postcss">
	nav {
		max-height: 20%;
	}
	.nav-entry {
		@apply text-sky-200 hover:text-white;
	}
</style>

<nav class="flex justify-between flex-wrap bg-sky-600 p-4 px-6">
	<div class="flex flex-wrap items-center gap-8">
		<div class="flex items-center text-white">
			<img class="fill-current h-8 w-8 mr-2" width="54" height="54" src="https://upload.wikimedia.org/wikipedia/en/b/b2/Hu_Tao_%28Genshin_Impact%29.png" alt="">
			<span class="font-semibold text-xl">
                <a href="/">GITvai</a>
            </span>
		</div>
		<div class="flex flex-wrap gap-3">
			<a href="/page" class="nav-entry">
				Page1
			</a>
			<a href="/repository" class="nav-entry">
				Page2
			</a>
		</div>
	</div>
	<div class="flex items-center">
		<a href="/" class="font-medium text-white hover:text-sky-100">User1</a>
	</div>
</nav>