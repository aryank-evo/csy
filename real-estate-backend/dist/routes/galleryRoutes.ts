import express, { Router } from 'express';
import {
  getAllGallerySections,
  createGallerySection,
  updateGallerySection,
  deleteGallerySection,
  reorderGallerySections
} from '../controllers/GalleryController';

const router = Router();

// Public routes
router.get('/', getAllGallerySections);

// Protected routes (add middleware if needed)
router.post('/', createGallerySection);
router.put('/:id', updateGallerySection);
router.delete('/:id', deleteGallerySection);
router.post('/reorder', reorderGallerySections);

export default router;
