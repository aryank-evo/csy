'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if isAdmin column exists, if not, add it
    const tableDesc = await queryInterface.describeTable('users');
    if (!tableDesc.isAdmin) {
      await queryInterface.addColumn('users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      });
    }

    // Check if properties table exists, if not, create it
    const tableExists = await queryInterface.tableExists('properties');
    if (!tableExists) {
      await queryInterface.createTable('properties', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false
        },
        address: {
          type: Sequelize.STRING
        },
        city: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING
        },
        zipCode: {
          type: Sequelize.STRING
        },
        country: {
          type: Sequelize.STRING
        },
        propertyType: {
          type: Sequelize.STRING
        },
        propertyStatus: {
          type: Sequelize.STRING
        },
        bedrooms: {
          type: Sequelize.INTEGER
        },
        bathrooms: {
          type: Sequelize.INTEGER
        },
        area: {
          type: Sequelize.INTEGER
        },
        amenities: {
          type: Sequelize.STRING
        },
        images: {
          type: Sequelize.STRING
        },
        approvalStatus: {
          type: Sequelize.STRING,
          defaultValue: 'pending',
          allowNull: false
        },
        rejectionReason: {
          type: Sequelize.TEXT
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    }

    // Check if leads table exists, if not, create it
    const leadsTableExists = await queryInterface.tableExists('leads');
    if (!leadsTableExists) {
      await queryInterface.createTable('leads', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false
        },
        userType: {
          type: Sequelize.STRING,
          allowNull: false
        },
        propertyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'properties',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'SET NULL'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Drop leads table
    await queryInterface.dropTable('leads');

    // Drop properties table
    await queryInterface.dropTable('properties');

    // Remove isAdmin column from users table
    await queryInterface.removeColumn('users', 'isAdmin');
  }
};