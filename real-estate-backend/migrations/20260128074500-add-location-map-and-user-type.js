'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      'sale_properties',
      'rent_properties',
      'lease_properties',
      'pg_properties',
      'commercial_properties',
      'land_properties'
    ];

    for (const table of tables) {
      try {
        // Add latitude column
        await queryInterface.addColumn(table, 'latitude', {
          type: Sequelize.DECIMAL(10, 8),
          allowNull: true
        });
      } catch (err) {
        console.log(`Column latitude already exists in ${table} or error occurred:`, err.message);
      }

      try {
        // Add longitude column
        await queryInterface.addColumn(table, 'longitude', {
          type: Sequelize.DECIMAL(10, 8),
          allowNull: true
        });
      } catch (err) {
        console.log(`Column longitude already exists in ${table} or error occurred:`, err.message);
      }

      try {
        // Add userType column
        await queryInterface.addColumn(table, 'userType', {
          type: Sequelize.STRING,
          allowNull: true
        });
      } catch (err) {
        console.log(`Column userType already exists in ${table} or error occurred:`, err.message);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      'sale_properties',
      'rent_properties',
      'lease_properties',
      'pg_properties',
      'commercial_properties',
      'land_properties'
    ];

    for (const table of tables) {
      try {
        await queryInterface.removeColumn(table, 'latitude');
      } catch (err) {
        console.log(`Error removing latitude from ${table}:`, err.message);
      }

      try {
        await queryInterface.removeColumn(table, 'longitude');
      } catch (err) {
        console.log(`Error removing longitude from ${table}:`, err.message);
      }

      try {
        await queryInterface.removeColumn(table, 'userType');
      } catch (err) {
        console.log(`Error removing userType from ${table}:`, err.message);
      }
    }
  }
};
