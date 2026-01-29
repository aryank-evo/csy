'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add isVerified columns to all property tables
    const tables = [
      'properties',
      'sale_properties',
      'rent_properties',
      'pg_properties',
      'lease_properties',
      'land_properties',
      'commercial_properties'
    ];

    for (const table of tables) {
      try {
        // Check if column already exists
        const tableDescription = await queryInterface.describeTable(table);
        
        if (!tableDescription.is_verified) {
          await queryInterface.addColumn(table, 'is_verified', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            after: 'approval_status'
          });
          console.log(`Added is_verified column to ${table}`);
        } else {
          console.log(`is_verified column already exists in ${table}`);
        }

        if (!tableDescription.verified_by) {
          await queryInterface.addColumn(table, 'verified_by', {
            type: Sequelize.INTEGER,
            allowNull: true,
            after: 'is_verified'
          });
          console.log(`Added verified_by column to ${table}`);
        } else {
          console.log(`verified_by column already exists in ${table}`);
        }

        if (!tableDescription.verified_at) {
          await queryInterface.addColumn(table, 'verified_at', {
            type: Sequelize.DATE,
            allowNull: true,
            after: 'verified_by'
          });
          console.log(`Added verified_at column to ${table}`);
        } else {
          console.log(`verified_at column already exists in ${table}`);
        }
      } catch (error) {
        console.error(`Error adding columns to ${table}:`, error.message);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      'properties',
      'sale_properties',
      'rent_properties',
      'pg_properties',
      'lease_properties',
      'land_properties',
      'commercial_properties'
    ];

    for (const table of tables) {
      try {
        await queryInterface.removeColumn(table, 'verified_at');
        await queryInterface.removeColumn(table, 'verified_by');
        await queryInterface.removeColumn(table, 'is_verified');
        console.log(`Removed verification columns from ${table}`);
      } catch (error) {
        console.error(`Error removing columns from ${table}:`, error.message);
      }
    }
  }
};
