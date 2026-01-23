'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      'properties',
      'sale_properties',
      'rent_properties',
      'lease_properties',
      'pg_properties',
      'commercial_properties',
      'land_properties'
    ];

    for (const table of tables) {
      try {
        // Check if the column already exists
        const tableDescription = await queryInterface.describeTable(table);
        
        if (!tableDescription.images) {
          await queryInterface.addColumn(table, 'images', {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: []
          });
        } else {
          console.log(`Column 'images' already exists in table '${table}', skipping...`);
        }
      } catch (error) {
        console.error(`Error processing table '${table}':`, error.message);
        throw error;
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      'properties',
      'sale_properties',
      'rent_properties',
      'lease_properties',
      'pg_properties',
      'commercial_properties',
      'land_properties'
    ];

    for (const table of tables) {
      try {
        // Check if the column exists before attempting to remove it
        const tableDescription = await queryInterface.describeTable(table);
        
        if (tableDescription.images) {
          await queryInterface.removeColumn(table, 'images');
        } else {
          console.log(`Column 'images' does not exist in table '${table}', skipping...`);
        }
      } catch (error) {
        console.error(`Error processing table '${table}' during rollback:`, error.message);
        throw error;
      }
    }
  }
};