/** @type {import("sequelize-cli").Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', {
       id: Sequelize.INTEGER,
       username: Sequelize.STRING,
       password: Sequelize.STRING,
     });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};
