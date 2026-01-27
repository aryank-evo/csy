import { Request, Response } from 'express';
import { CmsPage } from '../config/database';

export const getCmsPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const page = await CmsPage.findOne({ where: { slug } });

    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page content',
      error: (error as Error).message,
    });
  }
};

export const updateCmsPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { title, content } = req.body;

    let page = await CmsPage.findOne({ where: { slug } });

    if (page) {
      await page.update({ title, content });
    } else {
      page = await CmsPage.create({ slug, title, content });
    }

    res.json({
      success: true,
      message: 'Page content updated successfully',
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating page content',
      error: (error as Error).message,
    });
  }
};

export const getAllCmsPages = async (req: Request, res: Response): Promise<void> => {
  try {
    const pages = await CmsPage.findAll();
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching all pages',
      error: (error as Error).message,
    });
  }
};
