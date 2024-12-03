import { type Handle, redirect } from '@sveltejs/kit';
import { createTokens, getUser, invalidateToken, verifyToken } from '$lib/server/auth';

const logonRequiredRoutes = [""];
const redirectOnLogged = ["/login", "/register"];

export const handle: Handle = async ({ event, resolve }) => {
	let token = event.cookies.get("access_token");

	if (token !== undefined) {
		if (!await verifyToken(token)) {
			const refreshT = event.cookies.get("refresh_token");
			if (refreshT != undefined && !await verifyToken(refreshT)) {
				const user = await getUser(token);
				if (user !== null) {
					const { access, refresh } = await createTokens(user);

					event.cookies.set("access_token", access, { path: '/' });
					event.cookies.set("refresh_token", refresh, { path: '/' });
					await invalidateToken(token);
					await invalidateToken(refreshT);
					token = access;
				}
			}
		}
		event.locals.user = await getUser(token);
		if (redirectOnLogged.includes(event.url.pathname)) return redirect(302, "/");
	}
	if (logonRequiredRoutes.includes(event.url.pathname)) return redirect(302, "/login");

	return resolve(event);
};