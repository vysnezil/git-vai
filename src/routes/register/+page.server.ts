import { fail, redirect } from '@sveltejs/kit';
import { User } from '$lib/models/User';

export function load({ cookies }) {
	if (cookies.get("token") !== undefined) redirect(302, '/');
}

export const actions = {
	default: async ({ request }) => {
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

		const user = await User.findOne({
			where: { username: username }
		});

		if (user != null) return fail(401, {
			error: "User with this name already exists"
		});

		return redirect(302, '/');
	}
};