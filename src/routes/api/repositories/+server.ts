import { json } from '@sveltejs/kit';
import { Repository } from '$lib/models/Repository';
import { Op } from 'sequelize';
import { User } from '$lib/models/User';

export const GET = async ({url, locals}) => {
	const searchString = url.searchParams.get('search');

	const users = await User.findAll({
		where: {
			username: {
				[Op.substring]: searchString
			}
		},
		attributes: ['username']
	});
	const names = users.map(user => user.id);
	const repos = await Repository.findAll({
		where: {
			[Op.and]: [
				{ [Op.or]: [{ private: false }, { owner_id: locals.user?.id ?? "" }] },
				{ [Op.or]: [{ name: { [Op.substring]: searchString } }, { owner_id: {[Op.in]: names} }] },
			]
		},
		include: [
			{
				association: 'owner',
				attributes: ['username']
			},
		],
		attributes: ['name'],
		raw: true,
		nest: true
	});
	const flatRepos = repos.map(repo => ({name: repo.name, user: repo.owner.username}));
	return json([...flatRepos, ...users.map(user => ({name: user.username}))]);
}