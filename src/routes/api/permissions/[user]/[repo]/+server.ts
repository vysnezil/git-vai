import { error, json } from '@sveltejs/kit';
import { AccessRight, addAccessRight, getAccessRights, revokeAccessRight } from '$lib/server/permissions';
import { getRepoByName } from '$lib/server/repository';
import { User } from '$lib/models/User';

export const POST = async ({ url, locals, params }) => {
	const action = url.searchParams.get('action')?.trim();
	if (action != 'add' && action != 'revoke') return error(400, "Invalid action");
	if (locals.user === null) return error(401);

	const repo = await getRepoByName(params.repo, params.user);
	if (!repo) return error(404, "Repo not found");
	const right = await getAccessRights(repo, locals.user);
	if (right !== AccessRight.OWNER) return error(401, "Unauthorized");

	const paramUser = url.searchParams.get('user')?.trim();
	if (paramUser === '') return error(403, "User not provided");
	const user = await User.findOne({where: {username: paramUser}});
	if (user == null) return error(404, "User not found");
	if (user.id === repo.owner_id) return error(400, "Owner cannot have rights");

	if (action === 'add') {
		const paramRight = url.searchParams.get('right')?.trim();
		if (paramRight === null || paramUser === null) return error(400);

		return await addAccessRight(repo, user, (paramRight as AccessRight)).then(() => {
			return json(201);
		}).catch(() => {
			return error(409, "User already have rights");
		});
	}
	return await revokeAccessRight(repo, user).then(() => {
		return json(201);
	}).catch(() => {
		return error(404, "User didn't had any rights");
	});
};