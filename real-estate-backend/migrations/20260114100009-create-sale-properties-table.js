'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sale_properties', {
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
        defaultValue: 'sale'
      },
      bedrooms: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bathrooms: {
        type: Sequelize.STRING,
        allowNull: true
      },
      area: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amenities: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // Sale-specific fields
      possessionStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      propertyAge: {
        type: Sequelize.STRING,
        allowNull: true
      },
      maintenanceCost: {
        type: Sequelize.STRING,
        allowNull: true
      },
      furnishingStatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('sale_properties');
  }
};
