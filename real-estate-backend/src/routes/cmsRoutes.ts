import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { getCmsContent, updateCmsContent } from '../controllers/CmsController';

const router = express.Router();

// GET content is public
router.get('/:componentName', getCmsContent);

// Update content requires admin authentication
router.post('/:componentName', authenticateAdmin, updateCmsContent);

export default router;
