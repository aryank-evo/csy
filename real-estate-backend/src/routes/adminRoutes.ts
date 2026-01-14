import { Router } from 'express';
import { adminLogin } from '../controllers/AdminAuthController';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { 
  getAllProperties, 
  getPropertyById, 
  approveProperty, 
  rejectProperty, 
  getPropertyStats,
  getAllLeads,
  exportLeads,
  getLeadStats
} from '../controllers/AdminController';

const router = Router();

// Admin authentication
router.post('/login', adminLogin);

// Admin routes (require authentication)
router.get('/properties', authenticateAdmin, getAllProperties);
router.get('/properties/:id', authenticateAdmin, getPropertyById);
router.patch('/properties/:id/approve', authenticateAdmin, approveProperty);
router.patch('/properties/:id/reject', authenticateAdmin, rejectProperty);
router.get('/stats', authenticateAdmin, getPropertyStats);

// Leads management
router.get('/leads', authenticateAdmin, getAllLeads);
router.get('/leads/export', authenticateAdmin, exportLeads);
router.get('/leads/stats', authenticateAdmin, getLeadStats);

export default router;