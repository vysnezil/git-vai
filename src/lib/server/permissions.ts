import { Repository } from '$lib/models/Repository';
import { User } from '$lib/models/User';
import { RepositoryAccess } from '$lib/models/RepositoryAccess';

export enum AccessRight {
	NONE = 'NONE',
	READ = 'READ',
	WRITE = 'WRITE',
	OWNER = 'OWNER'
}

export const getAccessRights = async (repo: Repository, userArg: User | string | null) => {
	const user = (typeof userArg === 'string') ? await User.findOne({where: {username: userArg}}) : userArg;
	if (user === null) return AccessRight.NONE;

	if (user.id == repo.owner_id) return AccessRight.OWNER;

	const access = await RepositoryAccess.findOne({
		where: {
			repo_id: repo.id,
			user_id: user.id
		}
	});

	if (!access) return AccessRight.NONE;
	return access.right;
}

export const getAccessUsers = async (repo: Repository) => {
	const access = await RepositoryAccess.findAll({
		where: {
			repo_id: repo.id,
		},
		include: [
			{
				association: 'user',
				attributes: ['username']
			}
		],
		raw: true,
		nest: true
	});

	return (access??[]).map(usr => {
		return {
			userId: usr.user_id,
			username: usr.user.username,
			right: usr.right
		}
	});
}

export const addAccessRight = async (repo: Repository, user: User, accessRight: AccessRight) => {
	const access = await getAccessRights(repo, user);
	if (access !== AccessRight.NONE) return Promise.reject("User already have rights");
	return RepositoryAccess.create({
		repo_id: repo.id,
		user_id: user.id,
		right: accessRight
	});
}

export const revokeAccessRight = async (repo: Repository, user: User) => {
	const access = await getAccessRights(repo, user);
	if (access === null) return Promise.reject("User doesnt have any right");
	return RepositoryAccess.destroy({
		where: {
			repo_id: repo.id,
			user_id: user.id
		}
	});
}