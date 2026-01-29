import { Request, Response } from 'express';
import { Dealer } from '../models/Dealer';

// Get all dealers (only active ones for frontend)
export const getAllDealers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { active_only } = req.query;
    
    const whereClause = active_only === 'true' ? { is_active: true } : {};
    
    const dealers = await Dealer.findAll({
      where: whereClause,
      order: [['display_order', 'ASC'], ['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: dealers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dealers',
      error: (error as Error).message,
    });
  }
};

// Get single dealer by ID
export const getDealerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const dealer = await Dealer.findByPk(id);

    if (!dealer) {
      res.status(404).json({
        success: false,
        message: 'Dealer not found',
      });
      return;
    }

    res.json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dealer',
      error: (error as Error).message,
    });
  }
};

// Create new dealer
export const createDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, title, short_description, full_description, phone, email, address, is_active, display_order } = req.body;
    
    // Handle uploaded primary image (Cloudinary)
    let primary_image: string | undefined;
    if (req.file) {
      // For Cloudinary upload, the file URL is in req.file.path
      primary_image = req.file.path;
    }

    const dealer = await Dealer.create({
      name,
      title,
      short_description,
      full_description,
      primary_image,
      phone,
      email,
      address,
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Dealer created successfully',
      data: dealer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating dealer',
      error: (error as Error).message,
    });
  }
};

// Update existing dealer
export const updateDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, title, short_description, full_description, phone, email, address, is_active, display_order } = req.body;
    
    const dealer = await Dealer.findByPk(id);

    if (!dealer) {
      res.status(404).json({
        success: false,
        message: 'Dealer not found',
      });
      return;
    }

    // Handle uploaded primary image (Cloudinary)
    let primary_image = dealer.primary_image;
    if (req.file) {
      // For Cloudinary upload, the file URL is in req.file.path
      primary_image = req.file.path;
    }

    await dealer.update({
      name,
      title,
      short_description,
      full_description,
      primary_image,
      phone,
      email,
      address,
      is_active,
      display_order,
    });

    res.json({
      success: true,
      message: 'Dealer updated successfully',
      data: dealer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating dealer',
      error: (error as Error).message,
    });
  }
};

// Delete dealer
export const deleteDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const dealer = await Dealer.findByPk(id);

    if (!dealer) {
      res.status(404).json({
        success: false,
        message: 'Dealer not found',
      });
      return;
    }

    await dealer.destroy();

    res.json({
      success: true,
      message: 'Dealer deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting dealer',
      error: (error as Error).message,
    });
  }
};
