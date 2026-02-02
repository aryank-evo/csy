'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add social media link columns to cms_pages table
    await queryInterface.addColumn('cms_pages', 'facebookLink', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'instagramLink', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'youtubeLink', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove social media link columns from cms_pages table
    await queryInterface.removeColumn('cms_pages', 'facebookLink');
    await queryInterface.removeColumn('cms_pages', 'instagramLink');
    await queryInterface.removeColumn('cms_pages', 'youtubeLink');
  }
};
