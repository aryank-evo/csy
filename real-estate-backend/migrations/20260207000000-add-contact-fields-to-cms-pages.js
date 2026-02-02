'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add contact page fields to cms_pages table
    await queryInterface.addColumn('cms_pages', 'contactTitle', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'contactAddress', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'contactPhone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'contactEmail', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'googleMapEmbedUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove contact page fields from cms_pages table
    await queryInterface.removeColumn('cms_pages', 'contactTitle');
    await queryInterface.removeColumn('cms_pages', 'contactAddress');
    await queryInterface.removeColumn('cms_pages', 'contactPhone');
    await queryInterface.removeColumn('cms_pages', 'contactEmail');
    await queryInterface.removeColumn('cms_pages', 'googleMapEmbedUrl');
  }
};
