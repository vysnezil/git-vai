import simpleGit from 'simple-git';
import type { Repository } from '$lib/models/Repository';


export const getBranches = async (repo: Repository): Promise<Array<string>> => {
	const git = getGit(repo);
	return (await git.branch()).all;
}

const getGit = (repository: Repository) => {
	const path = `database/git/${repository.owner_id}/${repository.name}.git`;
	return simpleGit(path);
}