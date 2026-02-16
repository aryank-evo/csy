'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Use raw SQL to alter the column
    await queryInterface.sequelize.query(
      'ALTER TABLE leads ALTER COLUMN "propertyId" DROP NOT NULL;'
    );
  },

  async down (queryInterface, Sequelize) {
    // Revert: add NOT NULL constraint back
    await queryInterface.sequelize.query(
      'ALTER TABLE leads ALTER COLUMN "propertyId" SET NOT NULL;'
    );
  }
};
