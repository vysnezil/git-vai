import { error, redirect } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { getBranches, getFiles, getLatestMessage, getTree, getType, readFile } from '$lib/server/git.js';
import { AccessRight, getAccessRights } from '$lib/server/permissions';

export const trailingSlash = 'always';

export const load = async ({ params, locals }) => {
	const repo = await getRepoByName(params.repository, params.username);
	if (repo === null) return error(404, "Not found");
	const access = await getAccessRights(repo, locals.user);
	if (repo.private && access === AccessRight.NONE) return error(404, "Not found");
	if (params.file.endsWith('/')) params.file = params.file.substring(0, params.file.lastIndexOf('/'));
	const found_hash = (params.file === '') ? params.branch : await getTree(repo, params.branch,  params.file);
	if (found_hash !== '') {
		const type = await getType(repo, found_hash);
		if (type === 'tree' || type === 'commit') {
			const branches = await getBranches(repo);
			if (branches.length === 0) {
				return redirect(301, `/${params.username}/${params.repository}`);
			}
			if (!branches.includes(params.branch)) return error(404, "Branch not found");

			const files = (await getFiles(repo, found_hash, params.branch, params.file)).sort((a, b) => {
				if (a.type === b.type) return a.name.localeCompare(b.name);
				return (a.type === 'tree') ? -1 : 1
			})

			return {
				message: await getLatestMessage(repo, params.branch),
				page: 'list',
				dirUp: params.file !== '',
				repo: repo,
				user: params.username,
				branch: params.branch,
				branches: branches,
				files: files
			}
		}

		if (type === 'blob') {
			const raw = (await readFile(repo, found_hash));
			const content = Buffer.from(raw).subarray(6).toString('utf-16le');
			return {
				page: 'file',
				filename: params.file,
				content: content
			}
		}

		return error(400, "Bad request");
	}
	return error(404, "File not found");
}