import { Request, Response } from 'express';
import { Lead } from '../models/Lead';
import { Property } from '../models/Property';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

// Submit lead before property access
export const submitLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, phone, userType, propertyId } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !userType || !propertyId) {
      res.status(400).json({ 
        message: 'Name, email, phone, user type, and property ID are required' 
      });
      return;
    }
    
    // Validate property exists and is approved
    const property = await Property.findByPk(propertyId);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    if (property.approvalStatus !== 'approved') {
      res.status(400).json({ message: 'Property is not approved for viewing' });
      return;
    }
    
    // Create lead record
    const newLead = new Lead();
    newLead.name = name;
    newLead.email = email;
    newLead.phone = phone;
    newLead.userType = userType;
    newLead.propertyId = propertyId;
    if (req.user?.id) {
      newLead.userId = req.user.id;
    }
    const lead = await newLead.save();
    
    res.status(201).json({
      message: 'Lead submitted successfully',
      leadId: lead.id
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ message: 'Server error while submitting lead' });
  }
};

// Check if user has submitted lead for property
export const checkLeadAccess = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const userId = req.user?.id; // From auth middleware
    
    // If user is not logged in, check by email from request body
    if (!userId) {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ message: 'User identification required' });
        return;
      }
      
      const lead = await Lead.findOne({
        where: {
          propertyId: parseInt(propertyId),
          email
        }
      });
      
      res.status(200).json({ hasAccess: !!lead });
      return;
    }
    
    // If user is logged in, check by user ID
    const lead = await Lead.findOne({
      where: {
        propertyId: parseInt(propertyId),
        userId
      }
    });
    
    res.status(200).json({ hasAccess: !!lead });
  } catch (error) {
    console.error('Error checking lead access:', error);
    res.status(500).json({ message: 'Server error while checking lead access' });
  }
};