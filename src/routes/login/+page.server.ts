import { fail, redirect } from '@sveltejs/kit';
import { User } from '$lib/models/User';

import bcrypt from "bcrypt";
import { createTokens } from '$lib/server/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString().trim();
		const password = data.get('password')?.toString().trim();

		if (username === undefined || username === "") return fail(401, {
			error: "Username field cannot be empty",
			username: ""
		});

		if (password === undefined || password === "") return fail(401, {
			error: "Password field cannot be empty",
			username: username
		});

		const foundUser = await User.findOne({
			where: { username: username }
		});

		if (foundUser == null) return fail(401, {
			error: "Incorrect username or password",
			username: username
		});

		if (!await bcrypt.compare(password, foundUser.password)) return fail(401, {
			error: "Incorrect username or password",
			username: username
		});

		const {access, refresh} = await createTokens(foundUser);

		cookies.set("access_token", access, { path: '/' });
		cookies.set("refresh_token", refresh, { path: '/' });

		return redirect(302, '/');
	}
}