/** @type {import("sequelize-cli").Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: Sequelize.STRING,
      type: Sequelize.ENUM('access', 'refresh'),
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      }
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  }
};
