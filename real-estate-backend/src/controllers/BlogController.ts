import { Request, Response } from 'express';
import { Blog } from '../config/database';
import { Op } from 'sequelize';

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blogs', error: (error as Error).message });
  }
};

export const getRecentBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching recent blogs', error: (error as Error).message });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blog', error: (error as Error).message });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author_name, category, keywords } = req.body;
    
    // Handle uploaded images
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const primary_image = files?.['primary_image'] ? files['primary_image'][0].path : undefined;
    const secondary_image = files?.['secondary_image'] ? files['secondary_image'][0].path : undefined;

    const blog = await Blog.create({
      title,
      content,
      primary_image,
      secondary_image,
      author_name,
      category,
      keywords
    });
    res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating blog', error: (error as Error).message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, author_name, category, keywords } = req.body;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    // Handle uploaded images
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const primary_image = files?.['primary_image'] ? files['primary_image'][0].path : blog.primary_image;
    const secondary_image = files?.['secondary_image'] ? files['secondary_image'][0].path : blog.secondary_image;

    await blog.update({
      title,
      content,
      primary_image,
      secondary_image,
      author_name,
      category,
      keywords
    });
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating blog', error: (error as Error).message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    await blog.destroy();
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting blog', error: (error as Error).message });
  }
};
