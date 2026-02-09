import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ 
  tableName: "cms_content", 
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})
export class CmsContent extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'component_name'
  })
  componentName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'field_name'
  })
  fieldName!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'text',
    field: 'content_type'
  })
  contentType!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'content_value'
  })
  contentValue!: string;
}
