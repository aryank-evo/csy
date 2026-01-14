import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Property } from './Property';

@Table({
  tableName: 'leads',
  timestamps: true,
})
export class Lead extends Model<Lead> {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userType!: string;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  propertyId!: number;

  @BelongsTo(() => Property)
  property!: Property;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId?: number;

  @BelongsTo(() => User)
  user?: User;
}