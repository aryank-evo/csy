'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove old columns and add new ones
    await queryInterface.removeColumn('advertisements', 'youtubeUrl');
    await queryInterface.removeColumn('advertisements', 'isActive');
    await queryInterface.removeColumn('advertisements', 'position');
    
    // Add new columns
    await queryInterface.addColumn('advertisements', 'iframe1_url', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('advertisements', 'iframe2_url', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('advertisements', 'iframe3_url', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.removeColumn('advertisements', 'iframe3_url');
    await queryInterface.removeColumn('advertisements', 'iframe2_url');
    await queryInterface.removeColumn('advertisements', 'iframe1_url');
    
    await queryInterface.addColumn('advertisements', 'position', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('advertisements', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
    await queryInterface.addColumn('advertisements', 'youtubeUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
