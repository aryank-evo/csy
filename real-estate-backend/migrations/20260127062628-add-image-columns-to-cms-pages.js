'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add primaryImage and secondaryImage columns to cms_pages table
    await queryInterface.addColumn('cms_pages', 'primaryImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'secondaryImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove primaryImage and secondaryImage columns from cms_pages table
    await queryInterface.removeColumn('cms_pages', 'primaryImage');
    await queryInterface.removeColumn('cms_pages', 'secondaryImage');
  }
};
