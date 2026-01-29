'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add isVerified, verifiedBy, verifiedAt columns to all property tables
    const tables = ['properties', 'sale_properties', 'rent_properties', 'lease_properties', 'pg_properties', 'commercial_properties', 'land_properties'];
    
    for (const table of tables) {
      await queryInterface.addColumn(table, 'isVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      });
      
      await queryInterface.addColumn(table, 'verifiedBy', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
      
      await queryInterface.addColumn(table, 'verifiedAt', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Remove columns from all property tables in reverse order
    const tables = ['properties', 'sale_properties', 'rent_properties', 'lease_properties', 'pg_properties', 'commercial_properties', 'land_properties'];
    
    for (const table of tables) {
      await queryInterface.removeColumn(table, 'isVerified');
      await queryInterface.removeColumn(table, 'verifiedBy');
      await queryInterface.removeColumn(table, 'verifiedAt');
    }
  }
};
