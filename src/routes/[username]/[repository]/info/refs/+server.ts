import { error } from '@sveltejs/kit';
import { getRepoByName } from '$lib/server/repository';
import { checkPasswordSimple } from '$lib/server/auth';
import { spawnSync } from 'node:child_process';

export const GET = async ({request, params, url }) => {
	let repoName = params.repository;
	if (repoName.endsWith('.git')) repoName = repoName.replace('.git', '');
	const repo = await getRepoByName(repoName, params.username);
	if (repo === null) return error(404, "Repository not found");
	if (repo.private) {
		const auth = request.headers.get("Authorization");
		if (!auth?.startsWith("Basic ")) return new Response('Unauthorized', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic'}
		});
		const [username, password] = Buffer.from(auth.replace("Basic ", ""), 'base64').toString().split(':');
		if (!await checkPasswordSimple(username, password)) return new Response('Unauthorized', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic'}
		});
		if (username !== repo.owner.username) return new Response('Unauthorized', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic'}
		});
	}
	const service = url.searchParams.get('service');
	if (service === null) return error(404, "No service specified");
	const serviceNum = service === "git-upload-pack" ? "001e" : "001f";
	const path = `database/git/${repo.owner_id}/${repo.name}.git`;
	const process = spawnSync('git', [service.substring(4), path, '--http-backend-info-refs']);
	if (process.error) return error(500, "Git error");
	const res = Buffer.from(`${serviceNum}# service=${service}\n0000` + process.stdout, 'utf8').toString();
	return new Response(res,
		{ status: 200, headers: { 'Content-Type': `application/x-${service}-advertisement` } });
}