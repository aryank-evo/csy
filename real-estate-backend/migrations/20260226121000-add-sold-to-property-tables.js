'use strict';

/** @type {import('sequelize-cli').Migration} */
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
        const tableDescription = await queryInterface.describeTable(table);

        if (!tableDescription.sold) {
          await queryInterface.addColumn(table, 'sold', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          });
          console.log(`Added sold column to ${table}`);
        } else {
          console.log(`sold column already exists in ${table}`);
        }
      } catch (error) {
        console.error(`Error adding sold column to ${table}:`, error.message);
      }
    }
  },

  async down(queryInterface) {
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
        await queryInterface.removeColumn(table, 'sold');
        console.log(`Removed sold column from ${table}`);
      } catch (error) {
        console.error(`Error removing sold column from ${table}:`, error.message);
      }
    }
  }
};
