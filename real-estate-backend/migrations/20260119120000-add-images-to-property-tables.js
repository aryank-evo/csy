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
      await queryInterface.addColumn(table, 'images', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
      });
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
      await queryInterface.removeColumn(table, 'images');
    }
  }
};
