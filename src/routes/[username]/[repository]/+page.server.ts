import { Repository } from '$lib/models/Repository';
import { User } from '$lib/models/User';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const user = await User.findOne({
		where: {
			username: params.username
		}
	});
	if (user === null) return error(404, "Not found");
	const repo = await Repository.findOne({
		where: {
			owner_id: user.id,
			name: params.repository
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
	if (repo === null) return error(404, "Not found");
	return {
		repo: repo,
		user: params.username
	}
}