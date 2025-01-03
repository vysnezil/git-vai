import { error } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { getBranches } from '$lib/server/git.js';

export const load = async ({ params }) => {
	const repo = await getRepoByName(params.repository, params.username);
	if (repo === null) return error(404, "Not found");
	return {
		repo: repo,
		user: params.username,
		branches: await getBranches(repo),
	}
}