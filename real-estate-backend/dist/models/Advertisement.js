"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertisement = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Advertisement extends sequelize_1.Model {
}
exports.Advertisement = Advertisement;
Advertisement.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Advertisement Section',
    },
    iframe1_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    iframe2_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    iframe3_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'advertisements',
    sequelize: database_1.sequelize,
});
