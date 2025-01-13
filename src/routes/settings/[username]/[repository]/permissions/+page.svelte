<script lang="ts">
	import { faLock } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	const { data } = $props();
	let userIn = $state("");
	let error = $state("");

	const add = async (right: string) => {
		error = "";
		await fetch(`/api/permissions/${data.repo.owner.username}/${data.repo.name}?action=add&user=${userIn.trim()}&right=${right}`,
			{ method: "POST"})
			.then(() => userIn = "").catch(err => { error = err });
	};
	const revoke = async (user: string) => {
		error = "";
		await fetch(`/api/permissions/${data.repo.owner.username}/${data.repo.name}?action=revoke&user=${user}`,
			{ method: "POST"})
			.then(() => user = "").catch(err => { error = err });
	};
</script>

<div class="w-full max-w-3xl flex flex-col justify-center items-left">
	<div class="flex items-center mt-4 mb-2">
		<div class="text-3xl text-gray-500"><a href="/repositories/{data.repo.owner.username}">{data.repo.owner.username}/</a></div>
		<div class="text-3xl mr-3">{data.repo.name}</div>
		{#if data.repo.private}
			<FontAwesomeIcon icon={faLock} size="2xl" class="w-5 h-5 text-slate-700"/>
		{/if}
		<div class="flex-grow"></div>
	</div>
	<div class="flex items-left justify-left rounded-lg shadow bg-slate-50 w-full mt-2">
		<div class="p-5 w-full">
			<div class="flex items-center">
				<div class="mb-4 shadow-sm w-1/2">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="user_name">
						Username
					</label>
					<input autocomplete="off" class="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name="user_name" id="user_name" type="text" placeholder="user to add into list" bind:value={userIn}>
				</div>
				<button onclick="{() => add('READ')}" class="button">Add readonly</button>
				<button onclick="{() => add('WRITE')}" class="button">Add write</button>
			</div>
			<div class="w-1/2 rounded border">
				<table class="w-full text-center">
					<tbody>
						<tr>
							<th>Username</th>
							<th>Access</th>
							<th>Revoke</th>
						</tr>

						{#await data.users}
							<tr>
								<td colspan="3">loading....</td>
							</tr>
						{:then users}
							{#if users.length === 0}
								<tr>
									<td colspan="3">list is empty</td>
								</tr>
							{/if}
							{#each users as user}
							<tr>
								<td>
									<a href="/repositories/{user.username}">{user.username}</a>
								</td>
								<td>{user.right}</td>
								<td>
									<button onclick="{() => revoke(user.username)}" class="underline text-sky">revoke</button>
								</td>
							</tr>
							{/each}
						{:catch}
							<tr>
								<td colspan="3">error loading users</td>
							</tr>
						{/await}
					</tbody>
				</table>
			</div>
			<div class="flex mt-4 items-center">
				<a href="." class="mr-2 shadow-sm rounded-lg border border-gray-300 text-gray-700 bg-sky-100 hover:text-white hover:bg-sky-500 px-5 py-2 text-sm font-medium">
					Back
				</a>
					<div class="text-red-400">
						{ error.trim() }
					</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.button {
	    @apply cursor-pointer mt-3 ml-4 shadow-sm rounded-lg border border-gray-300 text-gray-700 bg-sky-100 hover:text-white hover:bg-sky-500 px-5 py-2 text-sm font-medium
	}
</style>