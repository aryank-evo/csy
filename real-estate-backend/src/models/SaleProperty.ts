import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SalePropertyAttributes {
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
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  // Sale-specific fields
  possessionStatus?: string;
  propertyAge?: string;
  maintenanceCharge?: string;
  // Approval workflow fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SalePropertyCreationAttributes extends Optional<SalePropertyAttributes, 'id'> {}

export class SaleProperty extends Model<SalePropertyAttributes, SalePropertyCreationAttributes> implements SalePropertyAttributes {
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
  public contactName?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  // Sale-specific fields
  public possessionStatus?: string;
  public propertyAge?: string;
  // Timestamps
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

SaleProperty.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
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
  // Sale-specific fields
  possessionStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  propertyAge: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'sale_properties',
  sequelize,
});