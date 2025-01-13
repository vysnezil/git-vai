import { error, redirect } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { getBranches } from '$lib/server/git.js';
import { AccessRight, getAccessRights } from '$lib/server/permissions';

export const load = async ({ params, locals }) => {
	const repo = await getRepoByName(params.repository, params.username);
	if (repo === null) return error(404, "Not found");
	const access = await getAccessRights(repo, locals.user);
	if (repo.private && access === AccessRight.NONE) return error(404, "Not found");
	const branches = await getBranches(repo);
	if (branches.length === 0) {
		return {
			repo: repo,
			user: repo.owner.username,
		};
	}
	return redirect(302, `/${params.username}/${params.repository}/${branches[0]}`);
}