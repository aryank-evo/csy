import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import {
  getAllAdvertisements,
  getAdvertisementById,
  createOrUpdateAdvertisement,
  deleteAdvertisement
} from '../controllers/AdvertisementController';

const router = express.Router();

// Public routes - anyone can view advertisements
router.get('/', getAllAdvertisements);

// Protected admin routes
router.get('/:id', authenticateAdmin, getAdvertisementById);
router.post('/', authenticateAdmin, createOrUpdateAdvertisement);
router.delete('/:id', authenticateAdmin, deleteAdvertisement);

export default router;
