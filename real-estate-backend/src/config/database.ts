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
import { GallerySection } from '../models/GallerySection';
import { Blog } from '../models/Blog';

// Define CmsPage model inline
class CmsPage extends Model {
  public id!: number;
  public slug!: string;
  public title!: string;
  public content!: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

// Define Advertisement model inline
class Advertisement extends Model {
  public id!: number;
  public name!: string;
  public iframe1_url?: string;
  public iframe2_url?: string;
  public iframe3_url?: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

dotenv.config();

const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
});

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
  },
  directorMsg: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  directorName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aboutSubtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aboutDesc1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aboutTitle1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aboutTitle2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aboutDesc2: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aboutDesc3: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aboutMission: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebookLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instagramLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  youtubeLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactAddress: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  googleMapEmbedUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "cms_pages",
  sequelize: sequelize,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

// Initialize Advertisement model
Advertisement.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Advertisement Section',
  },
  iframe1_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  iframe2_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  iframe3_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "advertisements",
  sequelize: sequelize,
  timestamps: true
});

// Initialize GallerySection model
GallerySection.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  youtube_links: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'gallery_sections',
  sequelize: sequelize,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

// Initialize Blog model
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  primary_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  secondary_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'blogs',
  sequelize: sequelize,
  timestamps: true,
  underscored: true
});

// Export models
export { User, Property, Lead, CmsContent };
export { CmsPage, Advertisement, GallerySection, Blog, Dealer };

// Initialize Dealer model
import { Dealer } from '../models/Dealer';
Dealer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  full_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  primary_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'dealers',
  sequelize: sequelize,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});