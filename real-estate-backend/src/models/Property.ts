import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PropertyAttributes {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  propertyType: string;
  propertyStatus: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  amenities?: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: number;
  approvedAt?: Date;
  userId?: number;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PropertyCreationAttributes extends Optional<PropertyAttributes, 'id'> {}

export class Property extends Model<PropertyAttributes, PropertyCreationAttributes> implements PropertyAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: string;
  public location!: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public zipCode?: string;
  public country?: string;
  public propertyType!: string;
  public propertyStatus!: string;
  public bedrooms?: string;
  public bathrooms?: string;
  public area?: string;
  public amenities?: string;
  public approvalStatus!: 'pending' | 'approved' | 'rejected';
  public approvedBy?: number;
  public approvedAt?: Date;
  public userId?: number;
  public contactName?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  public images?: string[];
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

Property.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  propertyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bathrooms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amenities: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  approvalStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  approvedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  contactName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
}, {
  tableName: 'properties',
  sequelize, // passing the `sequelize` instance is required
});