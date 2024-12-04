import { error, fail, redirect } from '@sveltejs/kit';

import { Repository } from '$lib/models/Repository';
import { User } from '$lib/models/User';

export const load = async ({params, locals}) => {
	const user = await User.findOne({
		where: {
			username: params.username
		}
	});
	if (user === null) throw error(404, "Not found");
	if (user.id !== locals.user?.id) return error(401, `Unauthorized`);
	const repo = await Repository.findOne({
		where: {
			name: params.repository,
			owner_id: user.id
		}
	});
	if (repo === null) throw error(404, "Not found");
	return {
		form: {
			repo_name: repo.name,
			description: repo.description,
			private: repo.private ? "yes" : "",
			error: ""
		}
	}
}

export const actions = {
	save: async ({ request, locals, params }) => {
		const data = await request.formData();

		const name = data.get('repo_name')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const pr = data.get('private')?.toString().trim();

		if (name === undefined || name === "") return fail(400, {
			error: "Repository name field cannot be empty",
			repo_name: params.repository,
			private: pr,
			description: description
		});

		const user = await User.findOne({
			where: {
				username: params.username
			}
		});
		if (user === null) throw error(404, "Not found");
		if (user.id !== locals.user?.id) return error(401, `Unauthorized`);
		const repo = await Repository.findOne({
			where: {
				name: params.repository,
				owner_id: user.id
			}
		});
		if (repo === null) throw error(404, "Not found");

		repo.name = name;
		repo.description = description;
		repo.private = pr !== undefined;

		await repo.save();
		return redirect(302, `/settings/${user.username}/${repo.name}`);
	},

	delete: async ({ locals, params }) => {
		const user = await User.findOne({
			where: {
				username: params.username
			}
		});
		if (user === null) throw error(404, "Not found");
		if (user.id !== locals.user?.id) return error(401, `Unauthorized`);
		const repo = await Repository.findOne({
			where: {
				name: params.repository,
				owner_id: user.id
			}
		});
		if (repo === null) throw error(404, "Not found");
		await repo.destroy();
		return redirect(302, `/repositories/${user.username}`);
	}
}