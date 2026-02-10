import express from 'express';
import { upload } from '../utils/cloudinary';
import { 
  createProperty, 
  getAllProperties, 
  getAllPropertiesCombined,
  getAllPendingProperties, 
  getPropertyById, 
  getPropertiesByLocation,
  updateProperty,
  updateApprovalStatus,
  approveProperty, 
  rejectProperty, 
  deleteProperty 
} from '../controllers/PropertyController';

const router = express.Router();

// Public routes - no authentication required
router.post('/', upload.array('images'), createProperty); // Create property listing with image upload
router.get('/', getAllProperties); // Get all approved properties
router.get('/all-combined', getAllPropertiesCombined); // Get ALL properties from ALL tables
router.get('/location/:locationName', getPropertiesByLocation); // Search properties by location name
router.get('/:id', getPropertyById); // Get specific approved property
router.put('/:id', upload.array('images'), updateProperty); // Update property details with image upload
router.put('/:id/status', updateApprovalStatus); // Update property approval status

// Admin routes - would require admin authentication in production
router.get('/pending/all', getAllPendingProperties); // Get all pending properties for admin
router.put('/:id/approve', approveProperty); // Approve property
router.put('/:id/reject', rejectProperty); // Reject property
router.delete('/:id', deleteProperty); // Delete property

export default router;