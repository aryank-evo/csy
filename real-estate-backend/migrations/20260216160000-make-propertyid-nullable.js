'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // First, remove any existing foreign key constraints on propertyId
    try {
      await queryInterface.removeConstraint('leads', 'leads_propertyId_fkey');
    } catch (error) {
      console.log('Foreign key leads_propertyId_fkey does not exist or already removed');
    }
    
    try {
      await queryInterface.removeConstraint('leads', 'leads_propertyId_fkey1');
    } catch (error) {
      console.log('Foreign key leads_propertyId_fkey1 does not exist or already removed');
    }
    
    // Make propertyId nullable without foreign key
    await queryInterface.changeColumn('leads', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert to NOT NULL
    await queryInterface.changeColumn('leads', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
