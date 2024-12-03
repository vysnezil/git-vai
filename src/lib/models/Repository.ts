import { DataTypes, Model } from 'sequelize';
import { sequelize } from '$lib/server/db';

export class Repository extends Model {
	declare id: number;
	declare name: string;
	declare description: string;
	declare owner: number;
	declare private: boolean;
}

Repository.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING
		},
		owner: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		},
		private: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'Repository',
	},
);