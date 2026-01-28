import { DataTypes, Model, Optional } from 'sequelize';

interface BlogAttributes {
  id: number;
  title: string;
  content: string;
  primary_image?: string;
  secondary_image?: string;
  author_name?: string;
  category?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogCreationAttributes extends Optional<BlogAttributes, 'id'> {}

export class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public primary_image?: string;
  public secondary_image?: string;
  public author_name?: string;
  public category?: string;
  public keywords?: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

export default Blog;
