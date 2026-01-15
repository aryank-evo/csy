'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add maintenanceCharge column to sale_properties table
    const saleColumns = await queryInterface.describeTable('sale_properties');
    
    if (!saleColumns.maintenanceCharge) {
      await queryInterface.addColumn('sale_properties', 'maintenanceCharge', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Remove maintenanceCharge column from sale_properties table
    await queryInterface.removeColumn('sale_properties', 'maintenanceCharge');
  }
};
