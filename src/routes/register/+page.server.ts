import { fail, redirect } from '@sveltejs/kit';
import { User } from '$lib/models/User';

import bcrypt from "bcrypt";
import { createTokens } from '$lib/server/auth.ts';

export const load = ({ cookies }) => {
	if (cookies.get("token") !== undefined) redirect(302, '/');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');
		const repeat = data.get('repeat');

		if (username === null || username === "") return fail(401, {
			error: "Username field cannot be empty"
		});

		if (password === null || password === "") return fail(401, {
			error: "Password field cannot be empty"
		});

		if (repeat === null || repeat === "") return fail(401, {
			error: "Username field cannot be empty"
		});

		if (password !== repeat) return fail(401, {
			error: "Passwords must match"
		});

		const foundUser = await User.findOne({
			where: { username: username.toString() }
		});

		if (foundUser != null) return fail(401, {
			error: "User with this name already exists"
		});

		const hash = await bcrypt.hash(password.toString(), 10);
		const newUser = await User.create({ username: username, password: hash });

		const {access, refresh} = await createTokens(newUser);

		cookies.set("access_token", access, { path: '/' });
		cookies.set("refresh_token", refresh, { path: '/' });

		return redirect(302, '/');
	}
};