module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add remaining columns to rent_properties table
    const rentColumns = await queryInterface.describeTable('rent_properties');
    
    if (!rentColumns.address) {
      await queryInterface.addColumn('rent_properties', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.city) {
      await queryInterface.addColumn('rent_properties', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.state) {
      await queryInterface.addColumn('rent_properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.zipCode) {
      await queryInterface.addColumn('rent_properties', 'zipCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.country) {
      await queryInterface.addColumn('rent_properties', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.bedrooms) {
      await queryInterface.addColumn('rent_properties', 'bedrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.bathrooms) {
      await queryInterface.addColumn('rent_properties', 'bathrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.area) {
      await queryInterface.addColumn('rent_properties', 'area', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.amenities) {
      await queryInterface.addColumn('rent_properties', 'amenities', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.approvedBy) {
      await queryInterface.addColumn('rent_properties', 'approvedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    
    if (!rentColumns.approvedAt) {
      await queryInterface.addColumn('rent_properties', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    
    if (!rentColumns.availableFrom) {
      await queryInterface.addColumn('rent_properties', 'availableFrom', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.securityDeposit) {
      await queryInterface.addColumn('rent_properties', 'securityDeposit', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!rentColumns.maintenanceCharge) {
      await queryInterface.addColumn('rent_properties', 'maintenanceCharge', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    // Add remaining columns to lease_properties table
    const leaseColumns = await queryInterface.describeTable('lease_properties');
    
    if (!leaseColumns.address) {
      await queryInterface.addColumn('lease_properties', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.city) {
      await queryInterface.addColumn('lease_properties', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.state) {
      await queryInterface.addColumn('lease_properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.zipCode) {
      await queryInterface.addColumn('lease_properties', 'zipCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.country) {
      await queryInterface.addColumn('lease_properties', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.bedrooms) {
      await queryInterface.addColumn('lease_properties', 'bedrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.bathrooms) {
      await queryInterface.addColumn('lease_properties', 'bathrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.area) {
      await queryInterface.addColumn('lease_properties', 'area', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.amenities) {
      await queryInterface.addColumn('lease_properties', 'amenities', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.approvedBy) {
      await queryInterface.addColumn('lease_properties', 'approvedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.approvedAt) {
      await queryInterface.addColumn('lease_properties', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.leasePeriod) {
      await queryInterface.addColumn('lease_properties', 'leasePeriod', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.monthlyLeaseAmount) {
      await queryInterface.addColumn('lease_properties', 'monthlyLeaseAmount', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!leaseColumns.leaseTerms) {
      await queryInterface.addColumn('lease_properties', 'leaseTerms', {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
    
    // Add remaining columns to pg_properties table
    const pgColumns = await queryInterface.describeTable('pg_properties');
    
    if (!pgColumns.address) {
      await queryInterface.addColumn('pg_properties', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.city) {
      await queryInterface.addColumn('pg_properties', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.state) {
      await queryInterface.addColumn('pg_properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.zipCode) {
      await queryInterface.addColumn('pg_properties', 'zipCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.country) {
      await queryInterface.addColumn('pg_properties', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.bedrooms) {
      await queryInterface.addColumn('pg_properties', 'bedrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.bathrooms) {
      await queryInterface.addColumn('pg_properties', 'bathrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.area) {
      await queryInterface.addColumn('pg_properties', 'area', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.amenities) {
      await queryInterface.addColumn('pg_properties', 'amenities', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.approvedBy) {
      await queryInterface.addColumn('pg_properties', 'approvedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    
    if (!pgColumns.approvedAt) {
      await queryInterface.addColumn('pg_properties', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    
    if (!pgColumns.foodIncluded) {
      await queryInterface.addColumn('pg_properties', 'foodIncluded', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      });
    }
    
    if (!pgColumns.gender) {
      await queryInterface.addColumn('pg_properties', 'gender', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!pgColumns.occupancy) {
      await queryInterface.addColumn('pg_properties', 'occupancy', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    // Add remaining columns to commercial_properties table
    const commercialColumns = await queryInterface.describeTable('commercial_properties');
    
    if (!commercialColumns.address) {
      await queryInterface.addColumn('commercial_properties', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.city) {
      await queryInterface.addColumn('commercial_properties', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.state) {
      await queryInterface.addColumn('commercial_properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.zipCode) {
      await queryInterface.addColumn('commercial_properties', 'zipCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.country) {
      await queryInterface.addColumn('commercial_properties', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.bedrooms) {
      await queryInterface.addColumn('commercial_properties', 'bedrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.bathrooms) {
      await queryInterface.addColumn('commercial_properties', 'bathrooms', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.area) {
      await queryInterface.addColumn('commercial_properties', 'area', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.amenities) {
      await queryInterface.addColumn('commercial_properties', 'amenities', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.approvedBy) {
      await queryInterface.addColumn('commercial_properties', 'approvedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.approvedAt) {
      await queryInterface.addColumn('commercial_properties', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.propertySubType) {
      await queryInterface.addColumn('commercial_properties', 'propertySubType', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.commercialArea) {
      await queryInterface.addColumn('commercial_properties', 'commercialArea', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!commercialColumns.facing) {
      await queryInterface.addColumn('commercial_properties', 'facing', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    // Add remaining columns to land_properties table
    const landColumns = await queryInterface.describeTable('land_properties');
    
    if (!landColumns.address) {
      await queryInterface.addColumn('land_properties', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.city) {
      await queryInterface.addColumn('land_properties', 'city', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.state) {
      await queryInterface.addColumn('land_properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.zipCode) {
      await queryInterface.addColumn('land_properties', 'zipCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.country) {
      await queryInterface.addColumn('land_properties', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.approvedBy) {
      await queryInterface.addColumn('land_properties', 'approvedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
    
    if (!landColumns.approvedAt) {
      await queryInterface.addColumn('land_properties', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    
    if (!landColumns.landArea) {
      await queryInterface.addColumn('land_properties', 'landArea', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.landType) {
      await queryInterface.addColumn('land_properties', 'landType', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.facing) {
      await queryInterface.addColumn('land_properties', 'facing', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!landColumns.utilities) {
      await queryInterface.addColumn('land_properties', 'utilities', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns from rent_properties table
    await queryInterface.removeColumn('rent_properties', 'address');
    await queryInterface.removeColumn('rent_properties', 'city');
    await queryInterface.removeColumn('rent_properties', 'state');
    await queryInterface.removeColumn('rent_properties', 'zipCode');
    await queryInterface.removeColumn('rent_properties', 'country');
    await queryInterface.removeColumn('rent_properties', 'bedrooms');
    await queryInterface.removeColumn('rent_properties', 'bathrooms');
    await queryInterface.removeColumn('rent_properties', 'area');
    await queryInterface.removeColumn('rent_properties', 'amenities');
    await queryInterface.removeColumn('rent_properties', 'approvedBy');
    await queryInterface.removeColumn('rent_properties', 'approvedAt');
    await queryInterface.removeColumn('rent_properties', 'availableFrom');
    await queryInterface.removeColumn('rent_properties', 'securityDeposit');
    await queryInterface.removeColumn('rent_properties', 'maintenanceCharge');
    
    // Remove columns from lease_properties table
    await queryInterface.removeColumn('lease_properties', 'address');
    await queryInterface.removeColumn('lease_properties', 'city');
    await queryInterface.removeColumn('lease_properties', 'state');
    await queryInterface.removeColumn('lease_properties', 'zipCode');
    await queryInterface.removeColumn('lease_properties', 'country');
    await queryInterface.removeColumn('lease_properties', 'bedrooms');
    await queryInterface.removeColumn('lease_properties', 'bathrooms');
    await queryInterface.removeColumn('lease_properties', 'area');
    await queryInterface.removeColumn('lease_properties', 'amenities');
    await queryInterface.removeColumn('lease_properties', 'approvedBy');
    await queryInterface.removeColumn('lease_properties', 'approvedAt');
    await queryInterface.removeColumn('lease_properties', 'leasePeriod');
    await queryInterface.removeColumn('lease_properties', 'monthlyLeaseAmount');
    await queryInterface.removeColumn('lease_properties', 'leaseTerms');
    
    // Remove columns from pg_properties table
    await queryInterface.removeColumn('pg_properties', 'address');
    await queryInterface.removeColumn('pg_properties', 'city');
    await queryInterface.removeColumn('pg_properties', 'state');
    await queryInterface.removeColumn('pg_properties', 'zipCode');
    await queryInterface.removeColumn('pg_properties', 'country');
    await queryInterface.removeColumn('pg_properties', 'bedrooms');
    await queryInterface.removeColumn('pg_properties', 'bathrooms');
    await queryInterface.removeColumn('pg_properties', 'area');
    await queryInterface.removeColumn('pg_properties', 'amenities');
    await queryInterface.removeColumn('pg_properties', 'approvedBy');
    await queryInterface.removeColumn('pg_properties', 'approvedAt');
    await queryInterface.removeColumn('pg_properties', 'foodIncluded');
    await queryInterface.removeColumn('pg_properties', 'gender');
    await queryInterface.removeColumn('pg_properties', 'occupancy');
    
    // Remove columns from commercial_properties table
    await queryInterface.removeColumn('commercial_properties', 'address');
    await queryInterface.removeColumn('commercial_properties', 'city');
    await queryInterface.removeColumn('commercial_properties', 'state');
    await queryInterface.removeColumn('commercial_properties', 'zipCode');
    await queryInterface.removeColumn('commercial_properties', 'country');
    await queryInterface.removeColumn('commercial_properties', 'bedrooms');
    await queryInterface.removeColumn('commercial_properties', 'bathrooms');
    await queryInterface.removeColumn('commercial_properties', 'area');
    await queryInterface.removeColumn('commercial_properties', 'amenities');
    await queryInterface.removeColumn('commercial_properties', 'approvedBy');
    await queryInterface.removeColumn('commercial_properties', 'approvedAt');
    await queryInterface.removeColumn('commercial_properties', 'propertySubType');
    await queryInterface.removeColumn('commercial_properties', 'commercialArea');
    await queryInterface.removeColumn('commercial_properties', 'facing');
    
    // Remove columns from land_properties table
    await queryInterface.removeColumn('land_properties', 'address');
    await queryInterface.removeColumn('land_properties', 'city');
    await queryInterface.removeColumn('land_properties', 'state');
    await queryInterface.removeColumn('land_properties', 'zipCode');
    await queryInterface.removeColumn('land_properties', 'country');
    await queryInterface.removeColumn('land_properties', 'approvedBy');
    await queryInterface.removeColumn('land_properties', 'approvedAt');
    await queryInterface.removeColumn('land_properties', 'landArea');
    await queryInterface.removeColumn('land_properties', 'landType');
    await queryInterface.removeColumn('land_properties', 'facing');
    await queryInterface.removeColumn('land_properties', 'utilities');
  }
};
