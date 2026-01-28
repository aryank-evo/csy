import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AdvertisementAttributes {
  id: number;
  name: string;
  iframe1_url?: string;
  iframe2_url?: string;
  iframe3_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdvertisementCreationAttributes extends Optional<AdvertisementAttributes, 'id'> {}

export class Advertisement extends Model<AdvertisementAttributes, AdvertisementCreationAttributes> implements AdvertisementAttributes {
  public id!: number;
  public name!: string;
  public iframe1_url?: string;
  public iframe2_url?: string;
  public iframe3_url?: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

Advertisement.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  tableName: 'advertisements',
  sequelize,
});
