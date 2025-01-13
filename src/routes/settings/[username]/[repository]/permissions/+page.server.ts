import { error } from '@sveltejs/kit';


import { getRepoByName } from '$lib/server/repository';
import { User } from '$lib/models/User';
import { getAccessUsers } from '$lib/server/permissions';

export const load = async ({params, locals}) => {
	const user = await User.findOne({
		where: {
			username: params.username
		}
	});
	if (user === null) throw error(404, "Not found");
	if (user.id !== locals.user?.id) return error(401, `Unauthorized`);
	const repo = await getRepoByName(params.repository, params.username);
	if (repo === null) return error(404, "Not found");

	return {
		repo: repo,
		users: await getAccessUsers(repo),
	};
}