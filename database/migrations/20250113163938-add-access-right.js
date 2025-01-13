'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('repositoryaccesses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      right: {
        type: Sequelize.ENUM('READ', 'WRITE'),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      repo_id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: {
          model: 'repositories',
          key: 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('repositoryaccesses');
  }
};
