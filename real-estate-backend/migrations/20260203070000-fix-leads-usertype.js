'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make userType nullable and set default value
    await queryInterface.changeColumn('leads', 'userType', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'visitor'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to NOT NULL (this might fail if there are null values)
    await queryInterface.changeColumn('leads', 'userType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'visitor'
    });
  }
};
