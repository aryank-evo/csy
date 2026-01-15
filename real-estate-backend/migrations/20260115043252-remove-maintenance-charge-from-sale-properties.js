'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove maintenanceCharge column from sale_properties table
    await queryInterface.removeColumn('sale_properties', 'maintenanceCharge');
  },

  async down (queryInterface, Sequelize) {
    // Add maintenanceCharge column back to sale_properties table
    await queryInterface.addColumn('sale_properties', 'maintenanceCharge', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
