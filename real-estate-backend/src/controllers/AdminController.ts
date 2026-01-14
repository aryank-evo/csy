import { Request, Response } from 'express';
import { Property } from '../models/Property';
import { Lead } from '../models/Lead';
import { User } from '../models/User';
import * as fs from 'fs';
import * as path from 'path';
import { Op } from 'sequelize';
const Sequelize = require('sequelize');

// Get all properties with pagination and filtering
export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    const whereClause: any = {};
    
    if (status) {
      whereClause.approvalStatus = status;
    }
    
    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }
    
    const properties = await Property.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }]
    });
    
    res.status(200).json({
      properties: properties.rows,
      totalPages: Math.ceil(properties.count / Number(limit)),
      currentPage: Number(page),
      total: properties.count
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
};

// Get property by ID
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const property = await Property.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }, {
        model: Lead,
        attributes: ['id', 'name', 'email', 'phone', 'userType', 'createdAt']
      }]
    });
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error while fetching property' });
  }
};

// Approve property
export const approveProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const property = await Property.findByPk(id);
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    property.approvalStatus = 'approved';
    property.rejectionReason = undefined;
    
    await property.save();
    
    res.status(200).json({ message: 'Property approved successfully', property });
  } catch (error) {
    console.error('Error approving property:', error);
    res.status(500).json({ message: 'Server error while approving property' });
  }
};

// Reject property
export const rejectProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const property = await Property.findByPk(id);
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    property.approvalStatus = 'rejected';
    property.rejectionReason = reason || 'Not specified';
    
    await property.save();
    
    res.status(200).json({ message: 'Property rejected successfully', property });
  } catch (error) {
    console.error('Error rejecting property:', error);
    res.status(500).json({ message: 'Server error while rejecting property' });
  }
};

// Get property statistics
export const getPropertyStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalProperties = await Property.count();
    const pendingProperties = await Property.count({ where: { approvalStatus: 'pending' } });
    const approvedProperties = await Property.count({ where: { approvalStatus: 'approved' } });
    const rejectedProperties = await Property.count({ where: { approvalStatus: 'rejected' } });
    
    const stats = {
      total: totalProperties,
      pending: pendingProperties,
      approved: approvedProperties,
      rejected: rejectedProperties,
      approvalRate: totalProperties > 0 ? ((approvedProperties / totalProperties) * 100).toFixed(2) : 0
    };
    
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching property stats:', error);
    res.status(500).json({ message: 'Server error while fetching property stats' });
  }
};

// Get all leads
export const getAllLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, propertyId, dateFrom, dateTo } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    const whereClause: any = {};
    
    if (propertyId) {
      whereClause.propertyId = propertyId;
    }
    
    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) {
        whereClause.createdAt[Op.gte] = new Date(dateFrom as string);
      }
      if (dateTo) {
        whereClause.createdAt[Op.lte] = new Date(dateTo as string);
      }
    }
    
    const leads = await Lead.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Property,
        attributes: ['id', 'title']
      }]
    });
    
    res.status(200).json({
      leads: leads.rows,
      totalPages: Math.ceil(leads.count / Number(limit)),
      currentPage: Number(page),
      total: leads.count
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Server error while fetching leads' });
  }
};

// Export leads to CSV
export const exportLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await Lead.findAll({
      include: [{
        model: Property,
        attributes: ['id', 'title']
      }]
    });
    
    // Create CSV content
    let csvContent = 'Name,Email,Phone,User Type,Property Title,Created At\n';
    
    leads.forEach(lead => {
      csvContent += `"${lead.name}","${lead.email}","${lead.phone}","${lead.userType}","${lead.property?.title || ''}","${lead.createdAt}"\n`;
    });
    
    const fileName = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    const filePath = path.join(__dirname, '../../exports', fileName);
    
    // Ensure exports directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, csvContent);
    
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error exporting leads' });
      } else {
        // Clean up the file after download
        setTimeout(() => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }, 5000); // Delete file after 5 seconds
      }
    });
  } catch (error) {
    console.error('Error exporting leads:', error);
    res.status(500).json({ message: 'Server error while exporting leads' });
  }
};

// Get lead statistics
export const getLeadStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalLeads = await Lead.count();
    const Sequelize = require('sequelize');
    const leadsByUserType = await Lead.findAll({
      attributes: ['userType', [Sequelize.fn('COUNT', Sequelize.col('userType')), 'count']],
      group: ['userType'],
      raw: true
    });
    
    const leadsByProperty = await Lead.findAll({
      attributes: ['propertyId', [Sequelize.fn('COUNT', Sequelize.col('propertyId')), 'count']],
      group: ['propertyId'],
      include: [{
        model: Property,
        attributes: ['title']
      }],
      raw: true,
      nest: true
    });
    
    const stats = {
      total: totalLeads,
      byUserType: leadsByUserType,
      byProperty: leadsByProperty
    };
    
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching lead stats:', error);
    res.status(500).json({ message: 'Server error while fetching lead stats' });
  }
};