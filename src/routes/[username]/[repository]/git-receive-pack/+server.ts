import { error } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { checkPasswordSimple } from '$lib/server/auth';
import { spawnSync } from 'node:child_process';

export const POST = async ({ request, params }) => {
	let repoName = params.repository;
	if (repoName.endsWith('.git')) repoName = repoName.replace('.git', '');
	const repo = await getRepoByName(repoName, params.username);
	if (repo === null) return error(404, 'Repository not found');
	if (repo.private) {
		const auth = request.headers.get('Authorization');
		if (!auth?.startsWith('Basic ')) return errRes();
		const [username, password] = Buffer.from(auth.replace('Basic ', ''), 'base64').toString().split(':');
		if (!(await checkPasswordSimple(username, password))) return errRes();
		if (username !== repo.owner.username) return errRes();
	}
	const path = `database/git/${repo.owner_id}/${repo.name}.git`;
	const body = await request.bytes();
	const process = spawnSync('git', ['receive-pack', path, '--stateless-rpc'], {
		input: Buffer.from(body)
	});
	return new Response(process.stdout, {
		status: 200,
		headers: { 'Content-Type': 'x-git-receive-pack-result' }
	});
};

const errRes = () => new Response('Unauthorized', {
	status: 401,
	headers: { 'WWW-Authenticate': 'Basic' }
});