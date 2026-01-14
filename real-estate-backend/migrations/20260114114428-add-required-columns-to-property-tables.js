module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add missing propertyStatus column to all property tables
    // Check if column exists before adding to avoid errors
    try {
      await queryInterface.addColumn('sale_properties', 'propertyStatus', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ready'
      });
      console.log('Added propertyStatus to sale_properties');
    } catch (error) {
      console.log('propertyStatus already exists in sale_properties or error occurred:', error.message);
    }
    
    try {
      await queryInterface.addColumn('rent_properties', 'propertyStatus', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ready'
      });
      console.log('Added propertyStatus to rent_properties');
    } catch (error) {
      console.log('propertyStatus already exists in rent_properties or error occurred:', error.message);
    }
    
    try {
      await queryInterface.addColumn('lease_properties', 'propertyStatus', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ready'
      });
      console.log('Added propertyStatus to lease_properties');
    } catch (error) {
      console.log('propertyStatus already exists in lease_properties or error occurred:', error.message);
    }
    
    try {
      await queryInterface.addColumn('pg_properties', 'propertyStatus', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ready'
      });
      console.log('Added propertyStatus to pg_properties');
    } catch (error) {
      console.log('propertyStatus already exists in pg_properties or error occurred:', error.message);
    }
    
    try {
      await queryInterface.addColumn('commercial_properties', 'propertyStatus', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ready'
      });
      console.log('Added propertyStatus to commercial_properties');
    } catch (error) {
      console.log('propertyStatus already exists in commercial_properties or error occurred:', error.message);
    }
    
    try {
      await queryInterface.addColumn('land_properties', 'propertyStatus', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ready'
      });
      console.log('Added propertyStatus to land_properties');
    } catch (error) {
      console.log('propertyStatus already exists in land_properties or error occurred:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove propertyStatus columns
    await queryInterface.removeColumn('sale_properties', 'propertyStatus');
    await queryInterface.removeColumn('rent_properties', 'propertyStatus');
    await queryInterface.removeColumn('lease_properties', 'propertyStatus');
    await queryInterface.removeColumn('pg_properties', 'propertyStatus');
    await queryInterface.removeColumn('commercial_properties', 'propertyStatus');
    await queryInterface.removeColumn('land_properties', 'propertyStatus');
  }
};
