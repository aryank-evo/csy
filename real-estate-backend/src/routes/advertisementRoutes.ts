import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import {
  getAllAdvertisements,
  getAdvertisementById,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getActiveAdvertisements
} from '../controllers/AdvertisementController';

const router = express.Router();

// Public routes
router.get('/active', getActiveAdvertisements);

// Protected admin routes
router.get('/', authenticateAdmin, getAllAdvertisements);
router.get('/:id', authenticateAdmin, getAdvertisementById);
router.post('/', authenticateAdmin, createAdvertisement);
router.put('/:id', authenticateAdmin, updateAdvertisement);
router.delete('/:id', authenticateAdmin, deleteAdvertisement);

export default router;