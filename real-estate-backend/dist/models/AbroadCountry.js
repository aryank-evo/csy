"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbroadCountry = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AbroadCountry extends sequelize_1.Model {
}
exports.AbroadCountry = AbroadCountry;
AbroadCountry.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    display_order: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'abroad_countries',
    timestamps: true,
    underscored: true,
});
