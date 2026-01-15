'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add isAdmin column to users table
    const tableDesc = await queryInterface.describeTable('users');
    if (!tableDesc.isAdmin) {
      await queryInterface.addColumn('users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Remove isAdmin column from users table
    await queryInterface.removeColumn('users', 'isAdmin');
  }
};
