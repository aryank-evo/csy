'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add directorMsg and directorName columns to cms_pages table
    await queryInterface.addColumn('cms_pages', 'directorMsg', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'directorName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove directorMsg and directorName columns from cms_pages table
    await queryInterface.removeColumn('cms_pages', 'directorMsg');
    await queryInterface.removeColumn('cms_pages', 'directorName');
  }
};