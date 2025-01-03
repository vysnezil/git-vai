import { Repository } from '$lib/models/Repository';
import { User } from '$lib/models/User';
import simpleGit from 'simple-git';
import * as fs from 'node:fs';
import { sequelize } from '$lib/server/db';

const gitReposDir = 'database/git';

export const getRepoByName = async (name: string, username: string) => {
	const user = await User.findOne({ where: { username: username } });
	if (!user) return null;
	return await Repository.findOne({
		where: {
			owner_id: user.id,
			name: name
		},
		include: [
			{
				association: 'owner',
				attributes: ['username']
			}
		],
		raw: true,
		nest: true
	});
};

export const createRepo = async (
	name: string,
	ownerId: number,
	desc: string | null,
	pr: boolean
): Promise<Repository | null> => {
	let repo = null;
	await sequelize.transaction(async (t) => {
		repo = await Repository.create(
			{
				name: name,
				description: desc,
				owner_id: ownerId,
				private: pr,
				created: new Date()
			},
			{ transaction: t, raw: true, nest: true }
		);
		const dir = `${gitReposDir}/${ownerId}/${name}.git`;
		fs.mkdirSync(dir, { recursive: true });
		simpleGit(dir).init(true);
	});
	return repo;
};