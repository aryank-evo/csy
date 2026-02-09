"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbroadListing = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AbroadListing extends sequelize_1.Model {
}
exports.AbroadListing = AbroadListing;
AbroadListing.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    country_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'abroad_countries',
            key: 'id',
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    display_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'abroad_listings',
    timestamps: true,
    underscored: true,
});
