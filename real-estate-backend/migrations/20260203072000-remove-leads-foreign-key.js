'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint on propertyId
    await queryInterface.removeConstraint('leads', 'leads_propertyId_fkey');
    await queryInterface.removeConstraint('leads', 'leads_propertyId_fkey1');
  },

  down: async (queryInterface, Sequelize) => {
    // Add foreign key constraint back (references properties table)
    await queryInterface.addConstraint('leads', {
      fields: ['propertyId'],
      type: 'foreign key',
      name: 'leads_propertyId_fkey',
      references: {
        table: 'properties',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
};