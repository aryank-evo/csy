import express from 'express';
import { 
  createProperty, 
  getAllProperties, 
  getAllPropertiesCombined,
  getAllPendingProperties, 
  getPropertyById, 
  approveProperty, 
  rejectProperty, 
  deleteProperty 
} from '../controllers/PropertyController';

const router = express.Router();

// Public routes - no authentication required
router.post('/', createProperty); // Create property listing without auth
router.get('/', getAllProperties); // Get all approved properties
router.get('/all-combined', getAllPropertiesCombined); // Get ALL properties from ALL tables
router.get('/:id', getPropertyById); // Get specific approved property

// Admin routes - would require admin authentication in production
router.get('/pending/all', getAllPendingProperties); // Get all pending properties for admin
router.put('/:id/approve', approveProperty); // Approve property
router.put('/:id/reject', rejectProperty); // Reject property
router.delete('/:id', deleteProperty); // Delete property

export default router;