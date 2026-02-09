import { Router } from 'express';
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLeadStatus
} from '../controllers/LeadController';

const router = Router();

// Create a new lead
router.post('/', createLead);

// Get all leads
router.get('/', getAllLeads);

// Get lead by ID
router.get('/:id', getLeadById);

// Update lead status
router.patch('/:id/status', updateLeadStatus);

export default router;