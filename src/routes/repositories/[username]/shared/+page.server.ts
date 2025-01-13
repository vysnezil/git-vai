import { redirect } from '@sveltejs/kit';
import { getSharedRepos } from '$lib/server/repository';

export const load = async ({ locals }) => {
	if (!locals.user) return redirect(302, "/login");
	const repos = await getSharedRepos(locals.user);
	console.log(repos);
	return {
		repos: repos
	}
}