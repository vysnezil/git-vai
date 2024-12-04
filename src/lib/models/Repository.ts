import { DataTypes, Model } from 'sequelize';
import { sequelize } from '$lib/server/db';
import { User } from '$lib/models/User';

export class Repository extends Model {
	declare id: number;
	declare name: string;
	declare description?: string;
	declare owner_id: number;
	declare created: Date;
	declare private: boolean;
	declare owner: User;
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
		owner_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		},
		created: {
			type: DataTypes.DATE,
			allowNull: false
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
Repository.belongsTo(User, {foreignKey: 'owner_id', targetKey: 'id', as: 'owner'});