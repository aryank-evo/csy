import { Request, Response } from 'express';
import { CmsContent } from '../config/database';

export const getCmsContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { componentName } = req.params;
    const content = await CmsContent.findAll({
      where: { componentName },
    });

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching CMS content',
      error: (error as Error).message,
    });
  }
};

export const updateCmsContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { componentName } = req.params;
    const { fields } = req.body; // Array of { fieldName, contentType, contentValue }

    if (!Array.isArray(fields)) {
      res.status(400).json({
        success: false,
        message: 'Fields must be an array',
      });
      return;
    }

    for (const field of fields) {
      const { fieldName, contentType, contentValue } = field;
      
      const [content, created] = await CmsContent.findOrCreate({
        where: { componentName, fieldName },
        defaults: {
          componentName,
          fieldName,
          contentType: contentType || 'text',
          contentValue,
        },
      });

      if (!created) {
        await content.update({
          contentType: contentType || content.contentType,
          contentValue,
        });
      }
    }

    res.json({
      success: true,
      message: 'Content updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating CMS content',
      error: (error as Error).message,
    });
  }
};
