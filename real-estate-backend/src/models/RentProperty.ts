import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface RentPropertyAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  propertyType: string;
  propertyStatus: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  amenities?: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: number;
  approvedAt?: Date;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  // Rent-specific fields
  availableFrom?: string;
  securityDeposit?: number;
  maintenanceCharge?: number;
  // Approval workflow fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RentPropertyCreationAttributes extends Optional<RentPropertyAttributes, 'id'> {}

export class RentProperty extends Model<RentPropertyAttributes, RentPropertyCreationAttributes> implements RentPropertyAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public location!: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public zipCode?: string;
  public country?: string;
  public propertyType!: string;
  public propertyStatus!: string;
  public bedrooms?: number;
  public bathrooms?: number;
  public area?: number;
  public amenities?: string;
  public approvalStatus!: 'pending' | 'approved' | 'rejected';
  public approvedBy?: number;
  public approvedAt?: Date;
  public contactName?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  // Rent-specific fields
  public availableFrom?: string;
  public securityDeposit?: number;
  public maintenanceCharge?: number;
  // Timestamps
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

RentProperty.init({
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
    type: DataTypes.DECIMAL(10, 2),
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
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  area: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  amenities: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  approvalStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
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
  // Rent-specific fields
  availableFrom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  securityDeposit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  maintenanceCharge: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'rent_properties',
  sequelize,
});