import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Import JavaScript models using require
const UserModel = require('../../models/user');
const PropertyModel = require('../../models/property');
const LeadModel = require('../../models/lead');

// Import TypeScript models
import { SaleProperty } from '../models/SaleProperty';
import { RentProperty } from '../models/RentProperty';
import { LeaseProperty } from '../models/LeaseProperty';
import { PgProperty } from '../models/PgProperty';
import { CommercialProperty } from '../models/CommercialProperty';
import { LandProperty } from '../models/LandProperty';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

export const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
  }
);

// Initialize JavaScript models
UserModel(sequelize, require('sequelize').DataTypes);
PropertyModel(sequelize, require('sequelize').DataTypes);
LeadModel(sequelize, require('sequelize').DataTypes);
