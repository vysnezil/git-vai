import { fail, redirect } from '@sveltejs/kit';

import { Repository } from '$lib/models/Repository';

export const actions = {
	save: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('repo_name')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const pr = data.get('private')?.toString().trim();

		if (name === undefined || name === "") return fail(400, {
			error: "Repository name field cannot be empty",
			private: pr,
			description: description
		});

		const regexp = new RegExp('^\\S[a-zA-Z-_\\d]+$')
		if (!regexp.test(name)) return fail(400, {
			error: "Repository name can only contains letters, numbers, hyphen, underscore"
		});

		const foundRepo = await Repository.findOne({
			where: { name: name.toString() }
		});

		if (foundRepo != null && foundRepo.owner_id === locals.user!.id ) return fail(409, {
			error: "This repository already exists",
			repo_name: name,
			private: pr,
			description: description
		});

		await Repository.create({
			name: name,
			description: description,
			owner_id: locals.user!.id,
			private: pr !== undefined,
			created: new Date(),
		})

		return redirect(302, `${locals.user!.username}/${name}`);
	}
}