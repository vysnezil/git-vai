import { getUser } from '$lib/server/auth';

export const load = async ({cookies}) => {
	return {
		username: (await (getUser(cookies.get("access_token") ?? "")))?.username,
	}
}