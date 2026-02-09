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

export const createOrUpdateAdvertisement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, iframe1_url, iframe2_url, iframe3_url } = req.body;

    if (id) {
      // Update existing advertisement
      const advertisement = await Advertisement.findByPk(id);
      
      if (!advertisement) {
        res.status(404).json({
          success: false,
          message: 'Advertisement not found',
        });
        return;
      }
      
      await advertisement.update({
        iframe1_url,
        iframe2_url,
        iframe3_url,
      });
      
      res.json({
        success: true,
        message: 'Advertisement updated successfully',
        data: advertisement,
      });
    } else {
      // Create new advertisement (or update if one exists)
      const existingAds = await Advertisement.findAll();
      
      if (existingAds.length > 0) {
        // Update the first advertisement record
        const advertisement = existingAds[0];
        await advertisement.update({
          iframe1_url,
          iframe2_url,
          iframe3_url,
        });
        
        res.json({
          success: true,
          message: 'Advertisement updated successfully',
          data: advertisement,
        });
      } else {
        const advertisement = await Advertisement.create({
          name: 'Advertisement Section',
          iframe1_url,
          iframe2_url,
          iframe3_url,
        });
        
        res.status(201).json({
          success: true,
          message: 'Advertisement created successfully',
          data: advertisement,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving advertisement',
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