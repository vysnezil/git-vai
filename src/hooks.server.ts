import { type Handle, redirect } from '@sveltejs/kit';
import { createTokens, getUser, invalidateToken, verifyToken } from '$lib/server/auth';

const logonRequiredRoutes = ["/create"];
const redirectOnLogged = ["/login", "/register"];

export const handle: Handle = async ({ event, resolve }) => {
	let token = event.cookies.get("access_token");

	if (token !== undefined) {
		if (!await verifyToken(token)) {
			const refreshT = event.cookies.get("refresh_token");
			if (refreshT != undefined) {
				if (await verifyToken(refreshT)) {
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
		if (token !== undefined) {
			event.locals.user = await getUser(token);
			if (redirectOnLogged.includes(event.url.pathname)) return redirect(302, "/");
		}
	}

	if (token === undefined && logonRequiredRoutes.includes(event.url.pathname)) return redirect(302, "/login");

	return resolve(event);
};