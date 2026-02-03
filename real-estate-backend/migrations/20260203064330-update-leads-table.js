'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add new columns
    await queryInterface.addColumn('leads', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    
    await queryInterface.addColumn('leads', 'address', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
    
    await queryInterface.addColumn('leads', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
    
    await queryInterface.addColumn('leads', 'propertyTitle', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('leads', 'propertyPrice', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('leads', 'propertyLocation', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('leads', 'propertyType', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    // Modify existing columns
    await queryInterface.changeColumn('leads', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    // Remove old message column if it exists
    await queryInterface.removeColumn('leads', 'message');
  },

  async down (queryInterface, Sequelize) {
    // Revert changes
    await queryInterface.removeColumn('leads', 'phone');
    await queryInterface.removeColumn('leads', 'address');
    await queryInterface.removeColumn('leads', 'description');
    await queryInterface.removeColumn('leads', 'propertyTitle');
    await queryInterface.removeColumn('leads', 'propertyPrice');
    await queryInterface.removeColumn('leads', 'propertyLocation');
    await queryInterface.removeColumn('leads', 'propertyType');
    
    // Restore old message column
    await queryInterface.addColumn('leads', 'message', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
    // Restore email column
    await queryInterface.changeColumn('leads', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};