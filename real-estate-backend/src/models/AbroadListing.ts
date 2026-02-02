import { DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database';

interface AbroadListingAttributes {
  id: number;
  country_id: number;
  title: string;
  image?: string;
  link: string;
  display_order: number;
  is_active: boolean;
}

interface AbroadListingCreationAttributes extends Optional<AbroadListingAttributes, 'id'> {}

class AbroadListing extends Model<AbroadListingAttributes, AbroadListingCreationAttributes> implements AbroadListingAttributes {
  public id!: number;
  public country_id!: number;
  public title!: string;
  public image?: string;
  public link!: string;
  public display_order!: number;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Associated country
  public country?: any;
  public static associations: {
    country: Association<AbroadListing, any>;
  };
}

AbroadListing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'abroad_countries',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'abroad_listings',
    timestamps: true,
    underscored: true,
  }
);

export { AbroadListing, AbroadListingAttributes };
