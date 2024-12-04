import { Repository } from '$lib/models/Repository';
import { User } from '$lib/models/User';
import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';

export const load = async ({ params, locals }) => {
	const user = await User.findOne({
		where: {
			username: params.username
		}
	});
	if (user === null) return error(404, "Not found");
	const repos = await Repository.findAll({
		where: {
			[Op.or]: [{ private: false }, { private: user.id === locals.user?.id }],
			owner_id: user.id
		},
		include: [
			{
				association: 'owner',
				attributes: ['username']
			},
		],
		raw: true,
		nest: true
	});
	return {
		repos: repos,
		user: params.username
	}
}