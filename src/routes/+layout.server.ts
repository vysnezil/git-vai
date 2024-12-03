import { getUser } from '$lib/server/auth.ts';


export const load = async ({request, cookies}) => {
	return {
		username: (await getUser(cookies.get("access_token") ?? ""))?.username
	}
}