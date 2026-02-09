import { DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database';

interface AbroadCountryAttributes {
  id: number;
  name: string;
  thumbnail?: string;
  description?: string;
  display_order: number;
  is_active: boolean;
}

interface AbroadCountryCreationAttributes extends Optional<AbroadCountryAttributes, 'id'> {}

class AbroadCountry extends Model<AbroadCountryAttributes, AbroadCountryCreationAttributes> implements AbroadCountryAttributes {
  public id!: number;
  public name!: string;
  public thumbnail?: string;
  public description?: string;
  public display_order!: number;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Associated listings
  public listings?: any[];
  public static associations: {
    listings: Association<AbroadCountry, any>;
  };
}

AbroadCountry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'abroad_countries',
    timestamps: true,
    underscored: true,
  }
);

export { AbroadCountry, AbroadCountryAttributes };
