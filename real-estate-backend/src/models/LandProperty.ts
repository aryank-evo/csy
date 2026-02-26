import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface LandPropertyAttributes {
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
  sold: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  isVerified: boolean;
  verifiedBy?: number;
  verifiedAt?: Date;
  approvedBy?: number;
  approvedAt?: Date;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  images?: string[];
  latitude?: number;
  longitude?: number;
  userType?: string;
  // Field visibility settings
  fieldVisibility?: Record<string, boolean>;
  imageVisibility?: Record<number, boolean>;
  // Land-specific fields
  landArea?: number;
  landType?: string;
  facing?: string;
  utilities?: string;
  // Approval workflow fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LandPropertyCreationAttributes extends Optional<LandPropertyAttributes, 'id'> {}

export class LandProperty extends Model<LandPropertyAttributes, LandPropertyCreationAttributes> implements LandPropertyAttributes {
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
  public sold!: boolean;
  public approvalStatus!: 'pending' | 'approved' | 'rejected';
  public isVerified!: boolean;
  public verifiedBy?: number;
  public verifiedAt?: Date;
  public approvedBy?: number;
  public approvedAt?: Date;
  public contactName?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  public images?: string[];
  public latitude?: number;
  public longitude?: number;
  public userType?: string;
  // Land-specific fields
  public landArea?: number;
  public landType?: string;
  public facing?: string;
  public utilities?: string;
  // Timestamps
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

LandProperty.init({
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
  sold: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  approvalStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifiedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  verifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Land-specific fields
  landArea: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  landType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facing: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  utilities: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Field visibility settings
  fieldVisibility: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
  imageVisibility: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
}, {
  tableName: 'land_properties',
  sequelize,
});
