import { DataTypes, Model } from 'sequelize';
import { sequelize } from '$lib/server/db';

export class Token extends Model {
	declare value: string;
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
		value: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
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