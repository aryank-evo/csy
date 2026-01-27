import { Request, Response } from 'express';
import { Advertisement } from '../config/database';

export const getAllAdvertisements = async (req: Request, res: Response): Promise<void> => {
  try {
    const advertisements = await Advertisement.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      data: advertisements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching advertisements',
      error: (error as Error).message,
    });
  }
};

export const getAdvertisementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const advertisement = await Advertisement.findByPk(id);
    
    if (!advertisement) {
      res.status(404).json({
        success: false,
        message: 'Advertisement not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: advertisement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching advertisement',
      error: (error as Error).message,
    });
  }
};

export const createAdvertisement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, youtubeUrl, isActive, position } = req.body;
    
    const advertisement = await Advertisement.create({
      name,
      youtubeUrl,
      isActive: isActive !== undefined ? isActive : true,
      position,
    });
    
    res.status(201).json({
      success: true,
      message: 'Advertisement created successfully',
      data: advertisement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating advertisement',
      error: (error as Error).message,
    });
  }
};

export const updateAdvertisement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, youtubeUrl, isActive, position } = req.body;
    
    const advertisement = await Advertisement.findByPk(id);
    
    if (!advertisement) {
      res.status(404).json({
        success: false,
        message: 'Advertisement not found',
      });
      return;
    }
    
    await advertisement.update({
      name,
      youtubeUrl,
      isActive,
      position,
    });
    
    res.json({
      success: true,
      message: 'Advertisement updated successfully',
      data: advertisement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating advertisement',
      error: (error as Error).message,
    });
  }
};

export const deleteAdvertisement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const advertisement = await Advertisement.findByPk(id);
    
    if (!advertisement) {
      res.status(404).json({
        success: false,
        message: 'Advertisement not found',
      });
      return;
    }
    
    await advertisement.destroy();
    
    res.json({
      success: true,
      message: 'Advertisement deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting advertisement',
      error: (error as Error).message,
    });
  }
};

export const getActiveAdvertisements = async (req: Request, res: Response): Promise<void> => {
  try {
    const advertisements = await Advertisement.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      data: advertisements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching active advertisements',
      error: (error as Error).message,
    });
  }
};