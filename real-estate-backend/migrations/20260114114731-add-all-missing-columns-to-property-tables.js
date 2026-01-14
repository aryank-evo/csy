module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add all missing columns to sale_properties table that aren't already added
    const existingColumns = await queryInterface.describeTable('sale_properties');
    
    if (!existingColumns.address) {
      await queryInterface.addColumn('sale_properties', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.city) {
      await queryInterface.addColumn('sale_properties', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.state) {
      await queryInterface.addColumn('sale_properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.zipCode) {
      await queryInterface.addColumn('sale_properties', 'zipCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.country) {
      await queryInterface.addColumn('sale_properties', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.bedrooms) {
      await queryInterface.addColumn('sale_properties', 'bedrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.bathrooms) {
      await queryInterface.addColumn('sale_properties', 'bathrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.area) {
      await queryInterface.addColumn('sale_properties', 'area', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.amenities) {
      await queryInterface.addColumn('sale_properties', 'amenities', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.approvedBy) {
      await queryInterface.addColumn('sale_properties', 'approvedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    
    if (!existingColumns.approvedAt) {
      await queryInterface.addColumn('sale_properties', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    
    if (!existingColumns.possessionStatus) {
      await queryInterface.addColumn('sale_properties', 'possessionStatus', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.propertyAge) {
      await queryInterface.addColumn('sale_properties', 'propertyAge', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!existingColumns.maintenanceCharge) {
      await queryInterface.addColumn('sale_properties', 'maintenanceCharge', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns from sale_properties table
    await queryInterface.removeColumn('sale_properties', 'address');
    await queryInterface.removeColumn('sale_properties', 'city');
    await queryInterface.removeColumn('sale_properties', 'state');
    await queryInterface.removeColumn('sale_properties', 'zipCode');
    await queryInterface.removeColumn('sale_properties', 'country');
    await queryInterface.removeColumn('sale_properties', 'bedrooms');
    await queryInterface.removeColumn('sale_properties', 'bathrooms');
    await queryInterface.removeColumn('sale_properties', 'area');
    await queryInterface.removeColumn('sale_properties', 'amenities');
    await queryInterface.removeColumn('sale_properties', 'approvedBy');
    await queryInterface.removeColumn('sale_properties', 'approvedAt');
    await queryInterface.removeColumn('sale_properties', 'possessionStatus');
    await queryInterface.removeColumn('sale_properties', 'propertyAge');
    await queryInterface.removeColumn('sale_properties', 'maintenanceCharge');
  }
};
