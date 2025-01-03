import { error, redirect } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { getBranches } from '$lib/server/git.js';

export const load = async ({ params }) => {
	const repo = await getRepoByName(params.repository, params.username);
	if (repo === null) return error(404, "Not found");
	const branches = await getBranches(repo);
	if (branches.length === 0) {
		return {
			repo: repo,
			user: repo.owner.username,
		};
	}
	return redirect(302, `/${params.username}/${params.repository}/${branches[0]}`);
}