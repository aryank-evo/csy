import { Table, Column, Model, DataType, BeforeCreate } from "sequelize-typescript";
import * as bcrypt from 'bcryptjs';

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
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
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isAdmin!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  termsAccepted!: boolean;

  
  @Column({
    type: DataType.STRING,
    allowNull: true, 
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  about?: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
