import { Request, Response } from 'express';
import { Lead } from '../config/database';
import { sendLeadNotificationEmail } from '../utils/nodemailer';

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      phone,
      address,
      email,
      description,
      propertyId,
      propertyTitle,
      propertyPrice,
      propertyLocation,
      propertyType
    } = req.body;

    // Validate required fields
    if (!name || !phone || !address || !description) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, phone, address, description',
      });
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      res.status(400).json({
        success: false,
        message: 'Phone number must be 10 digits',
      });
      return;
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          success: false,
          message: 'Please provide a valid email address',
        });
        return;
      }
    }

    // Create lead
    const lead = await (Lead as any).create({
      name,
      phone,
      address,
      email: email || null,
      description,
      propertyId: propertyId || null,
      propertyTitle: propertyTitle || null,
      propertyPrice: propertyPrice || null,
      propertyLocation: propertyLocation || null,
      propertyType: propertyType || null,
      status: 'new'
    });

    // Send email notification to admin
    try {
      await sendLeadNotificationEmail({
        leadId: lead.id,
        name,
        phone,
        address,
        email: email || 'Not provided',
        description,
        propertyId,
        propertyTitle,
        propertyPrice,
        propertyLocation,
        propertyType,
        createdAt: lead.createdAt
      });
    } catch (emailError) {
      console.error('Failed to send lead notification email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the lead. Please try again.',
    });
  }
};

export const getAllLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leads = await (Lead as any).findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: leads
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching leads',
    });
  }
};

export const getLeadById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const lead = await (Lead as any).findByPk(id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
      return;
    }

    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Get lead by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the lead',
    });
  }
};

export const updateLeadStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead: any = await (Lead as any).findByPk(id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
      return;
    }

    lead.status = status;
    await lead.save();

    res.json({
      success: true,
      message: 'Lead status updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating lead status',
    });
  }
};