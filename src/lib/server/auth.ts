import { JWT_SECRET } from '$env/static/private';
import { User } from '$lib/models/User';
import { decodeJwt, jwtVerify, SignJWT } from 'jose';
import { Token } from '$lib/models/Token';
import { sequelize } from '$lib/server/db';
import bcrypt from 'bcrypt';

const key = new TextEncoder().encode(JWT_SECRET);

export const createTokens = async (user: User): Promise<{ access: string, refresh: string }> => {
	let access, refresh;
	await sequelize.transaction(async t => {
		const access_db = await Token.create({
			type: 'access',
			userId: user.id,
		},
			{ transaction: t }
		);
		access = await new SignJWT(
			{
				"type": "access",
				"name": user.username,
			}
		)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime("1 h")
		.setIssuedAt(new Date())
		.setJti(String(access_db.id))
		.sign(key);

		const refresh_db = await Token.create({
			type: 'refresh',
			userId: user.id,
		},
			{ transaction: t }
		);
		refresh = await new SignJWT(
			{
				"type": "access",
				"name": user.username,
			}
		)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime("1 w")
		.setIssuedAt(new Date())
		.setJti(String(refresh_db.id))
		.sign(key);
	});
	if (access === undefined || refresh === undefined) return Promise.reject();
	return {access, refresh};
}

export const getUser = async (token: string): Promise<User | null> => {
	if (!token) return null;
	const { payload } = await jwtVerify(token, key);
	const tkn = await Token.findByPk(payload.jti);
	return await User.findByPk(tkn?.userId);
}

export const verifyToken = async (token: string) => {
	try {
		const { payload } = await jwtVerify(token, key);
		const found = await Token.findByPk(payload.jti);
		return found?.userId ?? null;
	} catch {
		return null;
	}
};

export const invalidateToken = async (token: string | undefined) => {
	if (token === undefined || token === '') return;
	const { jti } = decodeJwt(token);
	await Token.destroy({
		where: {
			id: jti
		}
	})
}

export const checkPasswordSimple = async (username: string, password: string): Promise<boolean> => {
	const user = await User.findOne({where: {username: username}});
	if (user === null) return false;
	return bcrypt.compare(password, user.password);
}