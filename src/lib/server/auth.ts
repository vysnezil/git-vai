import { JWT_SECRET } from '$env/static/private';
import { User } from '$lib/models/User.ts';
import { SignJWT } from 'jose';
import { Token } from '$lib/models/Token.ts';
import { sequelize } from '$lib/server/db.ts';

const key = new TextEncoder().encode(JWT_SECRET);

export const createTokens = async (user: User): Promise<{ access: string, refresh: string }> => {
		const access = await new SignJWT(
			{
				"type": "access",
				"name": user.username,
			}
		)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(60)
		.setIssuedAt(new Date())
		.sign(key);

	const refresh = await new SignJWT(
		{
			"type": "access",
			"name": user.username,
		}
	)
	.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
	.setExpirationTime(10080)
	.setIssuedAt(new Date())
	.sign(key);

	await sequelize.transaction(async t => {
		await Token.create({
			value: access,
			type: 'access',
			userId: user.id,
		},
			{ transaction: t }
		);
		await Token.create({
			value: refresh,
			type: 'refresh',
			userId: user.id,
		},
			{ transaction: t }
		);
	});

	return {access, refresh};
}

export const getUser = async (token: string): Promise<User | null> => {
	const tkn = await Token.findOne({
		where: {
			value: token
		}
	});
	if (!token) return null;
	return await User.findByPk(tkn?.userId);
}