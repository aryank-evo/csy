import { DataTypes, Model, Optional } from 'sequelize';

interface GallerySectionAttributes {
  id: number;
  heading: string;
  youtube_links?: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GallerySectionCreationAttributes extends Optional<GallerySectionAttributes, 'id'> {}

export class GallerySection extends Model<GallerySectionAttributes, GallerySectionCreationAttributes> implements GallerySectionAttributes {
  public id!: number;
  public heading!: string;
  public youtube_links?: string[];
  public order!: number;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

export default GallerySection;
