import { Router } from 'express';
import { authenticateUser, AuthRequest } from '../middleware/authMiddleware';
import { Property, Lead } from '../models';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Get user's submitted leads
router.get('/my-leads', async (req: AuthRequest, res) => {
  try {
    const leads = await Lead.findAll({
      where: {
        email: req.user.email // Use email to identify user's leads
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: leads
    });
  } catch (error) {
    console.error('Get user leads error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching your leads',
    });
  }
});

// Check if user can access property details (based on lead submission)
router.get('/property/:id/check-access', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    // Check if user has submitted lead for this property
    const lead = await Lead.findOne({
      where: {
        propertyId: parseInt(id),
        email: req.user.email // Use email instead of userId
      }
    });
    
    // If user hasn't submitted lead, hide contact information
    if (!lead) {
      res.json({
        success: true,
        canAccess: false,
        message: 'Please submit a lead to view property details'
      });
    } else {
      res.json({
        success: true,
        canAccess: true,
        message: 'Access granted'
      });
    }
  } catch (error) {
    console.error('Check access error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while checking access',
    });
  }
});

export default router;