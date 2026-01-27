import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { getCmsPage, updateCmsPage, getAllCmsPages } from '../controllers/CmsPageController';

const router = express.Router();

// Public routes
router.get('/', getAllCmsPages);
router.get('/:slug', getCmsPage);

// Protected admin routes
router.post('/:slug', authenticateAdmin, updateCmsPage);

export default router;
