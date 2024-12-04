import { fail, redirect } from '@sveltejs/kit';
import { User } from '$lib/models/User';

import bcrypt from "bcrypt";
import { createTokens } from '$lib/server/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString()?.trim();
		const password = data.get('password')?.toString()?.trim();
		const repeat = data.get('repeat')?.toString()?.trim();

		if (username === undefined || username === "") return fail(401, {
			error: "Username field cannot be empty",
			username: ""
		});

		if (password === undefined || password === "") return fail(401, {
			error: "Password field cannot be empty",
			username: username
		});

		if (repeat === undefined || repeat === "") return fail(401, {
			error: "Repeat field cannot be empty",
			username: username
		});

		if (password !== repeat) return fail(401, {
			error: "Passwords must match",
			username: username
		});

		const foundUser = await User.findOne({
			where: { username: username }
		});

		if (foundUser != null) return fail(401, {
			error: "User with this name already exists",
			username: username
		});

		const hash = await bcrypt.hash(password, 10);
		const newUser = await User.create({ username: username, password: hash });

		const {access, refresh} = await createTokens(newUser);

		cookies.set("access_token", access, { path: '/' });
		cookies.set("refresh_token", refresh, { path: '/' });

		return redirect(302, '/');
	}
};