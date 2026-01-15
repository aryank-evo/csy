import express from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { 
  getAllProperties, 
  approveProperty,
  rejectProperty,
  getPropertyById
} from '../controllers/AdminController';

const router = express.Router();

// All admin dashboard routes require authentication
router.use(authenticateAdmin);

// Dashboard overview - get statistics
router.get('/overview', getAllProperties);

// Get all properties (approved and pending)
router.get('/properties', getAllProperties);

// Get all pending properties (using getAllProperties with status filter)
router.get('/properties/pending', (req, res) => {
  req.query.status = 'pending';
  getAllProperties(req, res);
});

// Get specific property details
router.get('/properties/:id', getPropertyById);

// Approve property
router.patch('/properties/:id/approve', approveProperty);

// Reject property
router.patch('/properties/:id/reject', rejectProperty);

export default router;