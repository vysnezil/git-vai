<script lang="ts">
    const { form } = $props();
</script>

<div class="w-full max-w-xs">
    <form method="post" class="bg-white shadow-md rounded-lg px-8 py-6 mb-4" autocomplete="off">
        <div class="mb-4 text-gray-700 text-2xl font-bold">
            Login
        </div>
        <div class="mb-4 shadow-sm">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input class="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" required
                   name="username" id="username" type="text" placeholder="username" value="{form?.username}">
        </div>
        <div class="mb-4 shadow-sm">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input class="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                   name="password" id="password" type="password" placeholder="***********" required>
        </div>
        {#if form?.error}
            <div class="text-red-500 my-2">{form.error}</div>
        {/if}
        <div class="flex items-center justify-between">
            <input class="btn" type="submit" value="Login">
        </div>
    </form>
</div>

<style lang="postcss">

</style>