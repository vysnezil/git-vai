import { redirect } from '@sveltejs/kit';
import { invalidateToken } from '$lib/server/auth';

export const load = async ({cookies}) => {
	const access = cookies.get("access_token");
	const refresh = cookies.get("refresh_token");

	await invalidateToken(access);
	await invalidateToken(refresh);

	cookies.delete("access_token", { path: '/' });
	cookies.delete("refresh_token", { path: '/' });
	return redirect(302, "/");
}