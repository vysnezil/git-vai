/** @type {import("sequelize-cli").Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('repositories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      created: {
        type: Sequelize.DATE,
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('repositories');
  }
};
