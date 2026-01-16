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

export const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:1572001@127.0.0.1:5433/real_estate_db',
  {
    dialect: 'postgres',
  }
);

// Initialize JavaScript models
UserModel(sequelize, require('sequelize').DataTypes);
PropertyModel(sequelize, require('sequelize').DataTypes);
LeadModel(sequelize, require('sequelize').DataTypes);
