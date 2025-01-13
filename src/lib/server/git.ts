import simpleGit from 'simple-git';
import type { Repository } from '$lib/models/Repository';

const getGit = (repository: Repository) => {
	const path = `database/git/${repository.owner_id}/${repository.name}.git`;
	return simpleGit(path);
};

export const getBranches = async (repo: Repository): Promise<Array<string>> => {
	const git = getGit(repo);
	return (await git.branch()).all;
};

export const getFiles = async (repo: Repository, tree: string, branch: string, path: string): Promise<Array<any>> => {
	const git = getGit(repo);
	const res = await git.raw('ls-tree', tree);
	return await Promise.all(res
		.substring(0, res.length - 1)
		.split('\n')
		.map(async (line) => {
			const arr = line.substring(7).replace('\t', ' ').split(' ');
			const dateCommit = (await git.raw('log', '--oneline', "-n", "1", branch, "--pretty=%B%at", "--", `${path}${path === '' ? '' : '/'}${arr[2]}`)).split('\n');
			const date = new Date(+dateCommit[1] * 1000);
			return {
				type: arr[0],
				hash: arr[1],
				name: arr[2],
				message: dateCommit[0],
				date: `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
			};
		}));
};

export const getLatestMessage = async (repo: Repository, branch: string): Promise<string> => {
	const git = getGit(repo);
	return git.raw('log', '-1', '--pretty=%B', branch).then(r => r.replace('\n', ''));
}

export const getTree = async (repo: Repository, branch:string, tree: string)=> {
	const git = getGit(repo);
	return git.raw('rev-parse', "-q", "--verify", `${branch}:${tree}`).then(l => { return l.replace("\n", "") });
}

export const getType = async (repo: Repository, hash: string)=> {
	const git = getGit(repo);
	return git.raw('cat-file', "-t", hash).then(l => { return l.replace("\n", "") });
}

export const readFile = async (repo: Repository, hash: string)=> {
	const git = getGit(repo);
	return git.raw('cat-file', "blob", hash);
}