import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { getCmsPage, updateCmsPage, getAllCmsPages } from '../controllers/CmsPageController';
import { upload } from '../utils/cloudinary';

const router = express.Router();

// Public routes
router.get('/', getAllCmsPages);
router.get('/:slug', getCmsPage);

// Protected admin routes
// Handle image uploads for CMS pages
router.post('/:slug', authenticateAdmin, upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'secondaryImage', maxCount: 1 }]), updateCmsPage);

export default router;
