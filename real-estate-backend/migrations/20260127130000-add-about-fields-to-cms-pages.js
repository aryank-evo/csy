'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add about-specific columns to cms_pages table
    await queryInterface.addColumn('cms_pages', 'aboutSubtitle', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'aboutDesc1', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'aboutTitle1', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'aboutTitle2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'aboutDesc2', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'aboutDesc3', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    
    await queryInterface.addColumn('cms_pages', 'aboutMission', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove about-specific columns from cms_pages table
    await queryInterface.removeColumn('cms_pages', 'aboutSubtitle');
    await queryInterface.removeColumn('cms_pages', 'aboutDesc1');
    await queryInterface.removeColumn('cms_pages', 'aboutTitle1');
    await queryInterface.removeColumn('cms_pages', 'aboutTitle2');
    await queryInterface.removeColumn('cms_pages', 'aboutDesc2');
    await queryInterface.removeColumn('cms_pages', 'aboutDesc3');
    await queryInterface.removeColumn('cms_pages', 'aboutMission');
  }
};