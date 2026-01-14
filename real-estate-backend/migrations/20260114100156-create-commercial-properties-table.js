'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('commercial_properties', {
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
        defaultValue: 'commercial'
      },
      area: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amenities: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // Commercial-specific fields
      commercialPropertyType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      transactionType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      carpetArea: {
        type: Sequelize.STRING,
        allowNull: true
      },
      builtUpArea: {
        type: Sequelize.STRING,
        allowNull: true
      },
      floorNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      totalFloors: {
        type: Sequelize.STRING,
        allowNull: true
      },
      parkingSpaces: {
        type: Sequelize.STRING,
        allowNull: true
      },
      washrooms: {
        type: Sequelize.STRING,
        allowNull: true
      },
      powerBackup: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lifts: {
        type: Sequelize.STRING,
        allowNull: true
      },
      commercialDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      approvalStatus: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      approvedBy: {
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
    await queryInterface.dropTable('commercial_properties');
  }
};
