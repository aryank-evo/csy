'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Check if columns exist before adding them
    const salePropertiesInfo = await queryInterface.describeTable('sale_properties');
    if (!salePropertiesInfo.fieldVisibility) {
      await queryInterface.addColumn('sale_properties', 'fieldVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    if (!salePropertiesInfo.imageVisibility) {
      await queryInterface.addColumn('sale_properties', 'imageVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    const rentPropertiesInfo = await queryInterface.describeTable('rent_properties');
    if (!rentPropertiesInfo.fieldVisibility) {
      await queryInterface.addColumn('rent_properties', 'fieldVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    if (!rentPropertiesInfo.imageVisibility) {
      await queryInterface.addColumn('rent_properties', 'imageVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    const leasePropertiesInfo = await queryInterface.describeTable('lease_properties');
    if (!leasePropertiesInfo.fieldVisibility) {
      await queryInterface.addColumn('lease_properties', 'fieldVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    if (!leasePropertiesInfo.imageVisibility) {
      await queryInterface.addColumn('lease_properties', 'imageVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    const pgPropertiesInfo = await queryInterface.describeTable('pg_properties');
    if (!pgPropertiesInfo.fieldVisibility) {
      await queryInterface.addColumn('pg_properties', 'fieldVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    if (!pgPropertiesInfo.imageVisibility) {
      await queryInterface.addColumn('pg_properties', 'imageVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    const commercialPropertiesInfo = await queryInterface.describeTable('commercial_properties');
    if (!commercialPropertiesInfo.fieldVisibility) {
      await queryInterface.addColumn('commercial_properties', 'fieldVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    if (!commercialPropertiesInfo.imageVisibility) {
      await queryInterface.addColumn('commercial_properties', 'imageVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    const landPropertiesInfo = await queryInterface.describeTable('land_properties');
    if (!landPropertiesInfo.fieldVisibility) {
      await queryInterface.addColumn('land_properties', 'fieldVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
    
    if (!landPropertiesInfo.imageVisibility) {
      await queryInterface.addColumn('land_properties', 'imageVisibility', {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      });
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('sale_properties', 'fieldVisibility');
    await queryInterface.removeColumn('sale_properties', 'imageVisibility');
    
    await queryInterface.removeColumn('rent_properties', 'fieldVisibility');
    await queryInterface.removeColumn('rent_properties', 'imageVisibility');
    
    await queryInterface.removeColumn('lease_properties', 'fieldVisibility');
    await queryInterface.removeColumn('lease_properties', 'imageVisibility');
    
    await queryInterface.removeColumn('pg_properties', 'fieldVisibility');
    await queryInterface.removeColumn('pg_properties', 'imageVisibility');
    
    await queryInterface.removeColumn('commercial_properties', 'fieldVisibility');
    await queryInterface.removeColumn('commercial_properties', 'imageVisibility');
    
    await queryInterface.removeColumn('land_properties', 'fieldVisibility');
    await queryInterface.removeColumn('land_properties', 'imageVisibility');
  }
};
