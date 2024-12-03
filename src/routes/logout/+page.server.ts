import { redirect } from '@sveltejs/kit';
import { Token } from '$lib/models/Token.ts';

export const load = async ({request, cookies}) => {
	const access = cookies.get("access_token");
	const refresh = cookies.get("refresh_token");

		await Token.destroy({
			where: {
				value: [access, refresh],
			}
		});

	cookies.delete("access_token", { path: '/' });
	cookies.delete("refresh_token", { path: '/' });
	return redirect(302, "/");
}