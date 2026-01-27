import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';

// Import JavaScript models using require
const UserModel = require('../../models/user');
const PropertyModel = require('../../models/property');
const LeadModel = require('../../models/lead');
const CmsContentModel = require('../../models/cmsContent');

// Import TypeScript models
import { SaleProperty } from '../models/SaleProperty';
import { RentProperty } from '../models/RentProperty';
import { LeaseProperty } from '../models/LeaseProperty';
import { PgProperty } from '../models/PgProperty';
import { CommercialProperty } from '../models/CommercialProperty';
import { LandProperty } from '../models/LandProperty';

// Define CmsPage model inline
class CmsPage extends Model {
  public id!: number;
  public slug!: string;
  public title!: string;
  public content!: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

dotenv.config();

const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

export const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    logging: false,
  }
);

// Initialize JavaScript models
const User = UserModel(sequelize, require('sequelize').DataTypes);
const Property = PropertyModel(sequelize, require('sequelize').DataTypes);
const Lead = LeadModel(sequelize, require('sequelize').DataTypes);
const CmsContent = CmsContentModel(sequelize, require('sequelize').DataTypes);

// Initialize CmsPage model
CmsPage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  primaryImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  secondaryImage: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "cms_pages",
  sequelize,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

// Export models
export { User, Property, Lead, CmsContent };
export { CmsPage };