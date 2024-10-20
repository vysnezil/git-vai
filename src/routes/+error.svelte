<script>
	import { page } from '$app/stores';
</script>

<div class="flex justify-between items-center flex-col">
    <div class="text-9xl">
        {$page.status}
    </div>
    <div class="text-3xl  text-gray-500">
        {$page.error?.message}
    </div>
</div>