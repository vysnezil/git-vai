<script>
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
    import { faPlus } from '@fortawesome/free-solid-svg-icons'
    import { faFolder } from '@fortawesome/free-regular-svg-icons'
</script>

<div class="con">
    <div class="flex justify-between items-center flex-wrap px-4">
        <div class="my-4 text-3xl text-gray-500 flex items-center">
            Public repositories
        </div>
        <a href="/create" class="btn add-btn">
            <FontAwesomeIcon icon={faPlus} />
            <div class="s-hide">New repository</div>
        </a>
    </div>
    <ul class="pb-2 text-sm text-gray-700">
        <li class="border-b hover:bg-gray-100 text-base px-4">
            <a href="/repository" class="flex justify-between flex-center py-3 gap-3">
                <div class="flex flex-center items-center gap-2">
                    <FontAwesomeIcon icon={faFolder} size="lg" />
                    <div class="flex">
                        <div class="text-gray-500">User1/</div>
                        <div class="font-medium">repo</div>
                    </div>
                </div>
                <div class="text-gray-500">repo desc</div>
                <div class="text-gray-500">4.2.2018 14:04</div>
            </a>
        </li>
        <li class="border-b hover:bg-gray-100 text-base px-4">
            <a href="/repository" class="flex justify-between flex-center py-3 gap-3">
                <div class="flex flex-center items-center gap-2">
                    <FontAwesomeIcon icon={faFolder} size="lg" />
                    <div class="flex">
                        <div class="text-gray-500">User1/</div>
                        <div class="font-medium">another-repo</div>
                    </div>
                </div>
                <div class="text-gray-500">another repo desc</div>
                <div class="text-gray-500">2.2.2021 04:04</div>
            </a>
        </li>
    </ul>
</div>

<style lang="postcss">
    .add-btn {
        @apply bg-emerald-500 hover:bg-emerald-700;
        @apply gap-2;
    }

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