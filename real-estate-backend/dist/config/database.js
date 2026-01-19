"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Import JavaScript models using require
const UserModel = require('../../models/user');
const PropertyModel = require('../../models/property');
const LeadModel = require('../../models/lead');
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
exports.sequelize = new sequelize_1.Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
});
// Initialize JavaScript models
UserModel(exports.sequelize, require('sequelize').DataTypes);
PropertyModel(exports.sequelize, require('sequelize').DataTypes);
LeadModel(exports.sequelize, require('sequelize').DataTypes);
