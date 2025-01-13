import { DataTypes, Model } from 'sequelize';
import { sequelize } from '$lib/server/db';
import type { AccessRight } from '$lib/server/permissions';
import { User } from '$lib/models/User';
import { Repository } from '$lib/models/Repository';

export class RepositoryAccess extends Model {
	declare user_id: number;
	declare repo_id: number;
	declare right: AccessRight;
	declare user: User;
}

RepositoryAccess.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		right: {
			type: DataTypes.ENUM('READ', 'WRITE'),
			allowNull: false,
		},
		user_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		},
		repo_id: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'Repository',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		modelName: 'RepositoryAccess',
	},
);
RepositoryAccess.belongsTo(Repository, {foreignKey: 'repo_id', targetKey: 'id', as: 'repo'});
RepositoryAccess.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', as: 'user'});