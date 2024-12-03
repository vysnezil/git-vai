export const load = async ({ params }) => {
	return {
		owner: params.username,
	};
}