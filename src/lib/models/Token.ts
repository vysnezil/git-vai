import { DataTypes, Model } from 'sequelize';
import { sequelize } from '$lib/server/db';

export class Token extends Model {
	declare id: number;
	declare type: string;
	declare userId: number;
}

Token.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM('access', 'refresh'),
			allowNull: false,
		},
		userId: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		modelName: 'Token',
	},
);