import { error, redirect } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { getBranches } from '$lib/server/git.js';

export const load = async ({ params }) => {
	const repo = await getRepoByName(params.repository, params.username);
	if (repo === null) return error(404, "Not found");
	const branches = await getBranches(repo);
	if (branches.length === 0) {
		return redirect(301, `/${params.username}/${params.repository}`);
	}
	if (!branches.includes(params.branch)) error(404, "Branch not found");
	return {
		repo: repo,
		user: params.username,
		branches: branches,
	}
}