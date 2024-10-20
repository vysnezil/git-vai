<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	import { faFolder, faFile } from '@fortawesome/free-regular-svg-icons'
	import { faCodeBranch, faGear, faChevronDown, faLock, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="w-full max-w-3xl flex flex-col justify-center gap-2">
    <div class="flex items-center mb-3">
        <div class="text-3xl text-gray-500"><a href="/repositories">User1/</a></div>
        <div class="text-3xl mr-3">repo</div>
        <FontAwesomeIcon icon={faLock} size="2xl" class="w-5 h-5 text-slate-700"/>
        <div class="flex-grow"></div>
    </div>

    <div class="flex justify-between items-center w-full gap-4">
        <div>
            <a href="javascript:void(0);" class="btn gap-2">
                <FontAwesomeIcon icon={faCodeBranch} size="lg" class="w-5 h-5" />
                <div class="s-hide">master</div>
                <FontAwesomeIcon icon={faChevronDown} />
            </a>
        </div>
        <div class="flex-grow text-sm text-gray-500 hover:text-gray-600">
            <a href="javascript:void(0);">latest commit message</a>
        </div>
        <div class="flex gap-2">
            <a href="javascript:void(0);" class="settings">
                <FontAwesomeIcon icon={faGear} size="lg" class="text-slate-700"/>
            </a>
            <a class="btn gap-2" href="javascript:void(0);">
                <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" class="w-5 h-5 rotate-90" />
                <div class="s-hide">Download</div>
                <FontAwesomeIcon icon={faChevronDown} />
            </a>
        </div>
    </div>

    <div class="rounded-lg shadow bg-slate-50 w-full py-1">
        <table class="w-full text-gray-600 text-sm table-auto">
            <tbody>
                <tr class="border-b h-10 hover:bg-gray-100">
                    <td class="pl-3">
                        <a href="javascript:void(0);" class="flex flex-center items-center gap-1">
                            <FontAwesomeIcon icon={faFolder} size="lg" class="w-5" />
                            <div class="w-200">directory</div>
                        </a>
                    </td>
                    <td class="text-gray-400 hover:text-gray-500">
                        <a href="javascript:void(0);">Add directory</a>
                    </td>
                    <td class="text-gray-400 hover:text-gray-500 text-right pr-3">
                        17.10.2024 15:47
                    </td>
                </tr>
                <tr class="border-b h-10 hover:bg-gray-100">
                    <td class="pl-3">
                        <a href="javascript:void(0);" class="flex flex-center items-center gap-1">
                            <FontAwesomeIcon icon={faFile} size="lg" class="w-5" />
                            <div class="w-200">file</div>
                        </a>
                    </td>
                    <td class="text-gray-400 hover:text-gray-500">
                        <a href="javascript:void(0);">Add file</a>
                    </td>
                    <td class="text-gray-400 hover:text-gray-500 text-right pr-3">
                        16.10.2024 14:07
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<style lang="postcss">
    .settings {
        @apply border border-gray-600 text-gray-700 hover:bg-slate-400 rounded-lg text-sm;
        display: flex;
        align-items: center;
        padding: 0.5rem 0.75rem;
        background-color: transparent;
    }
</style>