'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update sale_properties table
    // First, clean and update price column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET price = \'0\' WHERE price IS NULL OR price = \'\' OR NOT price ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('sale_properties', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    
    // Update bedrooms column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET bedrooms = NULL WHERE bedrooms = \'\' OR NOT bedrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('sale_properties', 'bedrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    // Update bathrooms column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET bathrooms = NULL WHERE bathrooms = \'\' OR NOT bathrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('sale_properties', 'bathrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    // Update area column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET area = NULL WHERE area = \'\' OR NOT area ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('sale_properties', 'area', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    // Update approvalStatus column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET "approvalStatus" = \'pending\' WHERE "approvalStatus" NOT IN (\'pending\', \'approved\', \'rejected\')'
    );
    await queryInterface.changeColumn('sale_properties', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    });
    
    // Update propertyAge column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET "propertyAge" = NULL WHERE "propertyAge" = \'\' OR NOT "propertyAge" ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('sale_properties', 'propertyAge', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    // Update maintenanceCharge column
    await queryInterface.sequelize.query(
      'UPDATE sale_properties SET "maintenanceCharge" = NULL WHERE "maintenanceCharge" = \'\' OR NOT "maintenanceCharge" ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('sale_properties', 'maintenanceCharge', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });

    // Update rent_properties table
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET price = \'0\' WHERE price IS NULL OR price = \'\' OR NOT price ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('rent_properties', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET bedrooms = NULL WHERE bedrooms = \'\' OR NOT bedrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('rent_properties', 'bedrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET bathrooms = NULL WHERE bathrooms = \'\' OR NOT bathrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('rent_properties', 'bathrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET area = NULL WHERE area = \'\' OR NOT area ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('rent_properties', 'area', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET "approvalStatus" = \'pending\' WHERE "approvalStatus" NOT IN (\'pending\', \'approved\', \'rejected\')'
    );
    await queryInterface.changeColumn('rent_properties', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    });
    
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET "securityDeposit" = NULL WHERE "securityDeposit" = \'\' OR NOT "securityDeposit" ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('rent_properties', 'securityDeposit', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE rent_properties SET "maintenanceCharge" = NULL WHERE "maintenanceCharge" = \'\' OR NOT "maintenanceCharge" ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('rent_properties', 'maintenanceCharge', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });

    // Update lease_properties table
    await queryInterface.sequelize.query(
      'UPDATE lease_properties SET price = \'0\' WHERE price IS NULL OR price = \'\' OR NOT price ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('lease_properties', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    
    await queryInterface.sequelize.query(
      'UPDATE lease_properties SET bedrooms = NULL WHERE bedrooms = \'\' OR NOT bedrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('lease_properties', 'bedrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE lease_properties SET bathrooms = NULL WHERE bathrooms = \'\' OR NOT bathrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('lease_properties', 'bathrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE lease_properties SET area = NULL WHERE area = \'\' OR NOT area ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('lease_properties', 'area', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE lease_properties SET "approvalStatus" = \'pending\' WHERE "approvalStatus" NOT IN (\'pending\', \'approved\', \'rejected\')'
    );
    await queryInterface.changeColumn('lease_properties', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    });
    
    await queryInterface.sequelize.query(
      'UPDATE lease_properties SET "monthlyLeaseAmount" = NULL WHERE "monthlyLeaseAmount" = \'\' OR NOT "monthlyLeaseAmount" ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('lease_properties', 'monthlyLeaseAmount', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });

    // Update pg_properties table
    await queryInterface.sequelize.query(
      'UPDATE pg_properties SET price = \'0\' WHERE price IS NULL OR price = \'\' OR NOT price ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('pg_properties', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    
    await queryInterface.sequelize.query(
      'UPDATE pg_properties SET bedrooms = NULL WHERE bedrooms = \'\' OR NOT bedrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('pg_properties', 'bedrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE pg_properties SET bathrooms = NULL WHERE bathrooms = \'\' OR NOT bathrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('pg_properties', 'bathrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE pg_properties SET area = NULL WHERE area = \'\' OR NOT area ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('pg_properties', 'area', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE pg_properties SET "approvalStatus" = \'pending\' WHERE "approvalStatus" NOT IN (\'pending\', \'approved\', \'rejected\')'
    );
    await queryInterface.changeColumn('pg_properties', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    });
    
    await queryInterface.sequelize.query(
      'UPDATE pg_properties SET occupancy = NULL WHERE occupancy = \'\' OR NOT occupancy ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('pg_properties', 'occupancy', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    // Update commercial_properties table
    await queryInterface.sequelize.query(
      'UPDATE commercial_properties SET price = \'0\' WHERE price IS NULL OR price = \'\' OR NOT price ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('commercial_properties', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    
    await queryInterface.sequelize.query(
      'UPDATE commercial_properties SET bedrooms = NULL WHERE bedrooms = \'\' OR NOT bedrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('commercial_properties', 'bedrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE commercial_properties SET bathrooms = NULL WHERE bathrooms = \'\' OR NOT bathrooms ~ \'^\\d+$\''
    );
    await queryInterface.changeColumn('commercial_properties', 'bathrooms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE commercial_properties SET area = NULL WHERE area = \'\' OR NOT area ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('commercial_properties', 'area', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      'UPDATE commercial_properties SET "approvalStatus" = \'pending\' WHERE "approvalStatus" NOT IN (\'pending\', \'approved\', \'rejected\')'
    );
    await queryInterface.changeColumn('commercial_properties', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    });
    
    await queryInterface.sequelize.query(
      'UPDATE commercial_properties SET "commercialArea" = NULL WHERE "commercialArea" = \'\' OR NOT "commercialArea" ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('commercial_properties', 'commercialArea', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });

    // Update land_properties table
    await queryInterface.sequelize.query(
      'UPDATE land_properties SET price = \'0\' WHERE price IS NULL OR price = \'\' OR NOT price ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('land_properties', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    
    await queryInterface.sequelize.query(
      'UPDATE land_properties SET "approvalStatus" = \'pending\' WHERE "approvalStatus" NOT IN (\'pending\', \'approved\', \'rejected\')'
    );
    await queryInterface.changeColumn('land_properties', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    });
    
    await queryInterface.sequelize.query(
      'UPDATE land_properties SET "landArea" = NULL WHERE "landArea" = \'\' OR NOT "landArea" ~ \'^\\d+(\\.\\d+)?$\''
    );
    await queryInterface.changeColumn('land_properties', 'landArea', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert changes - change back to original types
    // Update sale_properties table
    await queryInterface.changeColumn('sale_properties', 'price', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('sale_properties', 'bedrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('sale_properties', 'bathrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('sale_properties', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('sale_properties', 'approvalStatus', {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('sale_properties', 'propertyAge', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('sale_properties', 'maintenanceCharge', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update rent_properties table
    await queryInterface.changeColumn('rent_properties', 'price', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('rent_properties', 'bedrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('rent_properties', 'bathrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('rent_properties', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('rent_properties', 'approvalStatus', {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('rent_properties', 'securityDeposit', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('rent_properties', 'maintenanceCharge', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update lease_properties table
    await queryInterface.changeColumn('lease_properties', 'price', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('lease_properties', 'bedrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('lease_properties', 'bathrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('lease_properties', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('lease_properties', 'approvalStatus', {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('lease_properties', 'monthlyLeaseAmount', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update pg_properties table
    await queryInterface.changeColumn('pg_properties', 'price', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('pg_properties', 'bedrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('pg_properties', 'bathrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('pg_properties', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('pg_properties', 'approvalStatus', {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('pg_properties', 'occupancy', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update commercial_properties table
    await queryInterface.changeColumn('commercial_properties', 'price', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('commercial_properties', 'bedrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('commercial_properties', 'bathrooms', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('commercial_properties', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('commercial_properties', 'approvalStatus', {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('commercial_properties', 'commercialArea', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update land_properties table
    await queryInterface.changeColumn('land_properties', 'price', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('land_properties', 'approvalStatus', {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('land_properties', 'landArea', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};