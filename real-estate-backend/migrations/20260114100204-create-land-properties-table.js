'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('land_properties', {
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
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      propertyType: {
        type: Sequelize.STRING,
        defaultValue: 'land'
      },
      area: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amenities: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // Land-specific fields
      landType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      transactionType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      totalArea: {
        type: Sequelize.STRING,
        allowNull: true
      },
      areaUnit: {
        type: Sequelize.STRING,
        defaultValue: 'sqft'
      },
      plotWidth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      plotDepth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roadFacing: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roadWidth: {
        type: Sequelize.STRING,
        allowNull: true
      },

      zoningInfo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      approvalStatus: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      approvedByUserId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      approvedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      contactName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactPhone: {
        type: Sequelize.STRING,
        allowNull: true
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('land_properties');
  }
};
