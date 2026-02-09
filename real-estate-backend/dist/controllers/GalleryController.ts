import { Request, Response } from 'express';
import { GallerySection } from '../models/GallerySection';
import { Op } from 'sequelize';
import { sequelize } from '../config/database';

export const getAllGallerySections = async (req: Request, res: Response): Promise<void> => {
  try {
    const sections = await GallerySection.findAll({
      order: [['order', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      data: sections
    });
  } catch (error) {
    console.error('Error fetching gallery sections:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery sections',
      error: (error as Error).message
    });
  }
};

export const createGallerySection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { heading, description, youtube_links = [] } = req.body;

    if (!heading) {
      res.status(400).json({
        success: false,
        message: 'Heading is required'
      });
      return;
    }

    // Get the highest order and add 1
    const lastSection = await GallerySection.findOne({
      order: [['order', 'DESC']]
    });
    const order = (lastSection?.order || 0) + 1;

    const section = await GallerySection.create({
      heading,
      description: description || null,
      youtube_links: Array.isArray(youtube_links) ? youtube_links.filter(link => link.trim()) : [],
      order
    });

    res.status(201).json({
      success: true,
      message: 'Gallery section created successfully',
      data: section
    });
  } catch (error) {
    console.error('Error creating gallery section:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create gallery section',
      error: (error as Error).message
    });
  }
};

export const updateGallerySection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { heading, description, youtube_links = [] } = req.body;

    if (!heading) {
      res.status(400).json({
        success: false,
        message: 'Heading is required'
      });
      return;
    }

    const section = await GallerySection.findByPk(id);
    if (!section) {
      res.status(404).json({
        success: false,
        message: 'Gallery section not found'
      });
      return;
    }

    await section.update({
      heading,
      description: description || null,
      youtube_links: Array.isArray(youtube_links) ? youtube_links.filter(link => link.trim()) : []
    });

    res.status(200).json({
      success: true,
      message: 'Gallery section updated successfully',
      data: section
    });
  } catch (error) {
    console.error('Error updating gallery section:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update gallery section',
      error: (error as Error).message
    });
  }
};

export const deleteGallerySection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const section = await GallerySection.findByPk(id);
    if (!section) {
      res.status(404).json({
        success: false,
        message: 'Gallery section not found'
      });
      return;
    }

    // Reorder remaining sections
    const deletedOrder = section.order;
    await GallerySection.update(
      { order: sequelize.literal(`"order" - 1`) },
      { where: { order: { [Op.gt]: deletedOrder } } }
    );

    await section.destroy();

    res.status(200).json({
      success: true,
      message: 'Gallery section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery section:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery section',
      error: (error as Error).message
    });
  }
};

export const reorderGallerySections = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sections } = req.body; // Array of { id, order }

    if (!Array.isArray(sections)) {
      res.status(400).json({
        success: false,
        message: 'Sections array is required'
      });
      return;
    }

    for (const item of sections) {
      await GallerySection.update(
        { order: item.order },
        { where: { id: item.id } }
      );
    }

    const updated = await GallerySection.findAll({
      order: [['order', 'ASC']]
    });

    res.status(200).json({
      success: true,
      message: 'Gallery sections reordered successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error reordering gallery sections:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder gallery sections',
      error: (error as Error).message
    });
  }
};
