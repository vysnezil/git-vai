/** @type {import("sequelize-cli").Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
       },
       username: {
         type: Sequelize.STRING,
         unique: true,
       },
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
