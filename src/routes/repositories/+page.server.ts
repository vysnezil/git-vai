import { Repository } from '$lib/models/Repository';

export const load = async () => {
	const repos = await Repository.findAll({
		where: {
			private: false
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
		repos: repos
	}
}