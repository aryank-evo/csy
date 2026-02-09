import { Router } from 'express';
import { getAllDealers, getDealerById, createDealer, updateDealer, deleteDealer } from '../controllers/DealerController';
import { dealerUpload } from '../utils/dealerCloudinary';

const router = Router();

// Public routes
router.get('/', getAllDealers);
router.get('/:id', getDealerById);

// Protected routes (require authentication)
router.post('/', dealerUpload.single('primary_image'), createDealer);
router.put('/:id', dealerUpload.single('primary_image'), updateDealer);
router.delete('/:id', deleteDealer);

export default router;
