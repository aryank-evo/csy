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
    await queryInterface.addColumn('sale_properties', 'fieldVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('sale_properties', 'imageVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('rent_properties', 'fieldVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('rent_properties', 'imageVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('lease_properties', 'fieldVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('lease_properties', 'imageVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('pg_properties', 'fieldVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('pg_properties', 'imageVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('commercial_properties', 'fieldVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('commercial_properties', 'imageVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('land_properties', 'fieldVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
    
    await queryInterface.addColumn('land_properties', 'imageVisibility', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {}
    });
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
