import { type Handle, redirect } from '@sveltejs/kit';
import { createTokens, getUser, invalidateToken, verifyToken } from '$lib/server/auth';
import { User } from '$lib/models/User';

const logonRequiredRoutes = ["/create"];
const redirectOnLogged = ["/login", "/register"];

export const handle: Handle = async ({ event, resolve }) => {
	let token = event.cookies.get("access_token");

	if (token !== undefined) {
		const accessRes = await verifyToken(token);
		if (accessRes === null) {
			const refreshT = event.cookies.get("refresh_token");
			if (refreshT != undefined) {
				const refreshRes = await verifyToken(refreshT);
				if (refreshRes !== null) {
					const user = await User.findByPk(refreshRes);
					if (user !== null) {
						const { access, refresh } = await createTokens(user);

						event.cookies.set("access_token", access, { path: '/' });
						event.cookies.set("refresh_token", refresh, { path: '/' });
						await invalidateToken(token);
						await invalidateToken(refreshT);
						token = access;
					}
				}
				else {
					event.cookies.delete("access_token", { path: '/' });
					event.cookies.delete("refresh_token", { path: '/' });
					await invalidateToken(token);
					await invalidateToken(refreshT);
					token = undefined;
				}
			}
			else {
				event.cookies.delete("access_token", { path: '/' });
				await invalidateToken(token);
				token = undefined;
			}
		}
		if (accessRes !== null) {
			event.locals.user = await User.findByPk(accessRes);
			if (redirectOnLogged.includes(event.url.pathname)) return redirect(302, "/");
		}
	}

	if (token === undefined && logonRequiredRoutes.includes(event.url.pathname)) return redirect(302, "/login");

	return resolve(event);
};