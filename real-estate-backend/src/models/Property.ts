import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Lead } from './Lead';

@Table({
  tableName: 'properties',
  timestamps: true,
})
export class Property extends Model<Property> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  zipCode?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyType?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyStatus?: string; // buy, rent, lease, pg

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  bedrooms?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  bathrooms?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  area?: number; // in sq ft

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  amenities?: string; // JSON string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  images?: string; // JSON string of image URLs

  @Column({
    type: DataType.STRING,
    defaultValue: 'pending',
    allowNull: false,
  })
  approvalStatus!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  rejectionReason?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isActive!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Lead)
  leads!: Lead[];
}