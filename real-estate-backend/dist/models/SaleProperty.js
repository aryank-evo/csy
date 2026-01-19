"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleProperty = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class SaleProperty extends sequelize_1.Model {
}
exports.SaleProperty = SaleProperty;
SaleProperty.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    zipCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    propertyType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    propertyStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bedrooms: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    bathrooms: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    area: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    amenities: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    approvalStatus: {
        type: sequelize_1.DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
    },
    approvedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    approvedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    contactName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    contactEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    contactPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    images: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
    },
    // Sale-specific fields
    possessionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    propertyAge: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    maintenanceCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'maintenanceCost'
    },
}, {
    tableName: 'sale_properties',
    sequelize: database_1.sequelize,
});
