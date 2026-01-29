import { DataTypes, Model, Optional } from 'sequelize';

interface DealerAttributes {
  id: number;
  name: string;
  title: string;
  short_description?: string;
  full_description?: string;
  primary_image?: string;
  phone?: string;
  email?: string;
  address?: string;
  is_active: boolean;
  display_order: number;
}

interface DealerCreationAttributes extends Optional<DealerAttributes, 'id'> {}

class Dealer extends Model<DealerAttributes, DealerCreationAttributes> implements DealerAttributes {
  public id!: number;
  public name!: string;
  public title!: string;
  public short_description?: string;
  public full_description?: string;
  public primary_image?: string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public is_active!: boolean;
  public display_order!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export { Dealer, DealerAttributes };
