import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'leads',
  timestamps: true,
})
export class Lead extends Model<Lead> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  propertyId!: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyTitle!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyPrice!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyLocation!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyType!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'new',
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'visitor',
  })
  userType!: string;
}