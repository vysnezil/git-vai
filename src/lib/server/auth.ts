import { JWT_SECRET } from '$env/static/private';
import { User } from '$lib/models/User';
import { jwtVerify, SignJWT } from 'jose';
import { Token } from '$lib/models/Token';
import { sequelize } from '$lib/server/db';
import bcrypt from 'bcrypt';

const key = new TextEncoder().encode(JWT_SECRET);

export const createTokens = async (user: User): Promise<{ access: string, refresh: string }> => {
		const access = await new SignJWT(
			{
				"type": "access",
				"name": user.username,
			}
		)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime("1 h")
		.setIssuedAt(new Date())
		.sign(key);

	const refresh = await new SignJWT(
		{
			"type": "access",
			"name": user.username,
		}
	)
	.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
	.setExpirationTime("1 w")
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

export const verifyToken = async (token: string) => {
	try {
		await jwtVerify(token, key);
		const found = await Token.findOne({
			where: {
				value: token
			}
		})
		return !!found;
	} catch {
		return false;
	}
};

export const invalidateToken = async (token: string) => {
	await Token.destroy({
		where: {
			value: token
		}
	})
}

export const checkPasswordSimple = async (username: string, password: string): Promise<boolean> => {
	const user = await User.findOne({where: {username: username}});
	if (user === null) return false;
	return bcrypt.compare(password, user.password);
}