import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("sqlite:database/gitvai.db", {
	define: {
		timestamps: false,
	},
	logging: false,
});

export { sequelize };