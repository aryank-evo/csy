'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make propertyId nullable
    await queryInterface.changeColumn('leads', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'properties',
        key: 'id'
      },
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to NOT NULL
    await queryInterface.changeColumn('leads', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  }
};
