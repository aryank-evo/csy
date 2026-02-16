'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('leads');
    if (!tableInfo.status) {
      await queryInterface.addColumn('leads', 'status', {
        type: Sequelize.STRING,
        defaultValue: 'new',
        allowNull: false
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('leads', 'status');
  }
};
