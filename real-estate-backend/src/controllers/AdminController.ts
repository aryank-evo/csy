import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { Property } from '../models/Property';
import { SaleProperty } from '../models/SaleProperty';
import { RentProperty } from '../models/RentProperty';
import { LeaseProperty } from '../models/LeaseProperty';
import { PgProperty } from '../models/PgProperty';
import { CommercialProperty } from '../models/CommercialProperty';
import { LandProperty } from '../models/LandProperty';
import { Lead } from '../models/Lead';
import { User } from '../config/database';
import * as fs from 'fs';
import * as path from 'path';
import { Op } from 'sequelize';
const Sequelize = require('sequelize');

// Get all properties with pagination and filtering
export const getAllProperties = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = '10', status, search } = req.query;
    
    // Get properties from all property types (both approved and pending)
    // Use raw queries to avoid column mismatches between different property types
    const whereClause: any = {};
    if (status) {
      whereClause.approvalStatus = status;
    }
    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }
    
    const saleProperties = await SaleProperty.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    
    const rentProperties = await RentProperty.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    
    const leaseProperties = await LeaseProperty.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    
    const pgProperties = await PgProperty.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    
    const commercialProperties = await CommercialProperty.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });
    
    const landProperties = await LandProperty.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true
    });

    // Combine all properties
    const allProperties = [
      ...saleProperties.map(p => ({ ...p, sourceTable: 'sale_properties' })),
      ...rentProperties.map(p => ({ ...p, sourceTable: 'rent_properties' })),
      ...leaseProperties.map(p => ({ ...p, sourceTable: 'lease_properties' })),
      ...pgProperties.map(p => ({ ...p, sourceTable: 'pg_properties' })),
      ...commercialProperties.map(p => ({ ...p, sourceTable: 'commercial_properties' })),
      ...landProperties.map(p => ({ ...p, sourceTable: 'land_properties' }))
    ];

    // Sort by date descending
    allProperties.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

    const limitValue = String(limit).toLowerCase();
    const shouldPaginate = limitValue !== 'all';

    // Apply pagination only when limit is not "all"
    const parsedLimit = shouldPaginate ? Number(limit) || 10 : allProperties.length || 1;
    const parsedPage = shouldPaginate ? Number(page) || 1 : 1;
    const offset = shouldPaginate ? (parsedPage - 1) * parsedLimit : 0;
    const paginatedProperties = shouldPaginate
      ? allProperties.slice(offset, offset + parsedLimit)
      : allProperties;

    res.status(200).json({
      properties: paginatedProperties,
      totalPages: shouldPaginate ? Math.ceil(allProperties.length / parsedLimit) : 1,
      currentPage: parsedPage,
      total: allProperties.length
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error while fetching properties' });
  }
};

// Get property by ID
export const getPropertyById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id, type } = req.params;
    
    let property: any = null;
    let sourceTable: string | undefined;
    
    // Look for the property in all property tables
    property = await SaleProperty.findByPk(id);
    if (property) {
      sourceTable = 'sale_properties';
    } else {
      property = await RentProperty.findByPk(id);
      if (property) {
        sourceTable = 'rent_properties';
      } else {
        property = await LeaseProperty.findByPk(id);
        if (property) {
          sourceTable = 'lease_properties';
        } else {
          property = await PgProperty.findByPk(id);
          if (property) {
            sourceTable = 'pg_properties';
          } else {
            property = await CommercialProperty.findByPk(id);
            if (property) {
              sourceTable = 'commercial_properties';
            } else {
              property = await LandProperty.findByPk(id);
              if (property) {
                sourceTable = 'land_properties';
              }
            }
          }
        }
      }
    }
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    // Add source table to the property
    property.setDataValue('sourceTable', sourceTable);
    
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error while fetching property' });
  }
};

// Approve property
export const approveProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id, type } = req.params;
    const { fieldVisibility, imageVisibility, isVerified } = req.body;
    
    // Look for the property in all property tables
    let property: any = await SaleProperty.findByPk(id);
    let sourceTable: string | undefined;
    
    if (property) {
      sourceTable = 'sale_properties';
    } else {
      property = await RentProperty.findByPk(id);
      if (property) {
        sourceTable = 'rent_properties';
      } else {
        property = await LeaseProperty.findByPk(id);
        if (property) {
          sourceTable = 'lease_properties';
        } else {
          property = await PgProperty.findByPk(id);
          if (property) {
            sourceTable = 'pg_properties';
          } else {
            property = await CommercialProperty.findByPk(id);
            if (property) {
              sourceTable = 'commercial_properties';
            } else {
              property = await LandProperty.findByPk(id);
              if (property) {
                sourceTable = 'land_properties';
              }
            }
          }
        }
      }
    }
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    property.approvalStatus = 'approved';
    property.approvedAt = new Date();
    property.approvedBy = req.user?.id; // Assuming req.user is available after authentication
    
    // Update visibility settings if provided
    // Note: fieldVisibility and imageVisibility are only available on the main Property model
    // For individual property type models, these fields may not exist
    if (fieldVisibility) {
      if ('fieldVisibility' in property) {
        (property as any).fieldVisibility = fieldVisibility;
      }
    }
    if (imageVisibility) {
      if ('imageVisibility' in property) {
        (property as any).imageVisibility = imageVisibility;
      }
    }
    
    // Update verified status if provided
    if (typeof isVerified === 'boolean') {
      property.isVerified = isVerified;
      if (isVerified) {
        property.verifiedAt = new Date();
        // When a property is verified, it should also be marked as featured
        // You can implement this based on your business logic
      }
    }
    
    await property.save();
    
    res.status(200).json({ message: 'Property approved successfully', property });
  } catch (error) {
    console.error('Error approving property:', error);
    res.status(500).json({ message: 'Server error while approving property' });
  }
};

// Reject property
export const rejectProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id, type } = req.params;
    const { reason, fieldVisibility, imageVisibility } = req.body;
    
    // Look for the property in all property tables
    let property: any = await SaleProperty.findByPk(id);
    let sourceTable: string | undefined;
    
    if (property) {
      sourceTable = 'sale_properties';
    } else {
      property = await RentProperty.findByPk(id);
      if (property) {
        sourceTable = 'rent_properties';
      } else {
        property = await LeaseProperty.findByPk(id);
        if (property) {
          sourceTable = 'lease_properties';
        } else {
          property = await PgProperty.findByPk(id);
          if (property) {
            sourceTable = 'pg_properties';
          } else {
            property = await CommercialProperty.findByPk(id);
            if (property) {
              sourceTable = 'commercial_properties';
            } else {
              property = await LandProperty.findByPk(id);
              if (property) {
                sourceTable = 'land_properties';
              }
            }
          }
        }
      }
    }
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    property.approvalStatus = 'rejected';
    property.approvedAt = new Date();
    property.approvedBy = req.user?.id; // Assuming req.user is available after authentication
    
    // Update visibility settings if provided
    // Note: fieldVisibility and imageVisibility are only available on the main Property model
    // For individual property type models, these fields may not exist
    if (fieldVisibility) {
      if ('fieldVisibility' in property) {
        (property as any).fieldVisibility = fieldVisibility;
      }
    }
    if (imageVisibility) {
      if ('imageVisibility' in property) {
        (property as any).imageVisibility = imageVisibility;
      }
    }
    
    await property.save();
    
    res.status(200).json({ message: 'Property rejected successfully', property });
  } catch (error) {
    console.error('Error rejecting property:', error);
    res.status(500).json({ message: 'Server error while rejecting property' });
  }
};

// Get property statistics
export const getPropertyStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Count properties from all property type tables
    const salePropertiesCount = await SaleProperty.count();
    const rentPropertiesCount = await RentProperty.count();
    const leasePropertiesCount = await LeaseProperty.count();
    const pgPropertiesCount = await PgProperty.count();
    const commercialPropertiesCount = await CommercialProperty.count();
    const landPropertiesCount = await LandProperty.count();
    
    const totalProperties = salePropertiesCount + rentPropertiesCount + leasePropertiesCount + 
                            pgPropertiesCount + commercialPropertiesCount + landPropertiesCount;
    
    // Count pending properties
    const pendingSaleProperties = await SaleProperty.count({ where: { approvalStatus: 'pending' } });
    const pendingRentProperties = await RentProperty.count({ where: { approvalStatus: 'pending' } });
    const pendingLeaseProperties = await LeaseProperty.count({ where: { approvalStatus: 'pending' } });
    const pendingPgProperties = await PgProperty.count({ where: { approvalStatus: 'pending' } });
    const pendingCommercialProperties = await CommercialProperty.count({ where: { approvalStatus: 'pending' } });
    const pendingLandProperties = await LandProperty.count({ where: { approvalStatus: 'pending' } });
    
    const pendingProperties = pendingSaleProperties + pendingRentProperties + pendingLeaseProperties + 
                              pendingPgProperties + pendingCommercialProperties + pendingLandProperties;
    
    // Count approved properties
    const approvedSaleProperties = await SaleProperty.count({ where: { approvalStatus: 'approved' } });
    const approvedRentProperties = await RentProperty.count({ where: { approvalStatus: 'approved' } });
    const approvedLeaseProperties = await LeaseProperty.count({ where: { approvalStatus: 'approved' } });
    const approvedPgProperties = await PgProperty.count({ where: { approvalStatus: 'approved' } });
    const approvedCommercialProperties = await CommercialProperty.count({ where: { approvalStatus: 'approved' } });
    const approvedLandProperties = await LandProperty.count({ where: { approvalStatus: 'approved' } });
    
    const approvedProperties = approvedSaleProperties + approvedRentProperties + approvedLeaseProperties + 
                                approvedPgProperties + approvedCommercialProperties + approvedLandProperties;
    
    // Count rejected properties
    const rejectedSaleProperties = await SaleProperty.count({ where: { approvalStatus: 'rejected' } });
    const rejectedRentProperties = await RentProperty.count({ where: { approvalStatus: 'rejected' } });
    const rejectedLeaseProperties = await LeaseProperty.count({ where: { approvalStatus: 'rejected' } });
    const rejectedPgProperties = await PgProperty.count({ where: { approvalStatus: 'rejected' } });
    const rejectedCommercialProperties = await CommercialProperty.count({ where: { approvalStatus: 'rejected' } });
    const rejectedLandProperties = await LandProperty.count({ where: { approvalStatus: 'rejected' } });
    
    const rejectedProperties = rejectedSaleProperties + rejectedRentProperties + rejectedLeaseProperties + 
                                rejectedPgProperties + rejectedCommercialProperties + rejectedLandProperties;
    
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
export const getAllLeads = async (req: AuthRequest, res: Response): Promise<void> => {
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
      order: [['createdAt', 'DESC']]
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
export const exportLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.findAll({});
    
    // Create CSV content
    let csvContent = 'Name,Email,Phone,Property Title,Created At\n';
    
    leads.forEach(lead => {
      csvContent += `"${lead.name}","${lead.email}","${lead.phone}","${lead.propertyTitle || 'N/A'}","${lead.createdAt}"\n`;
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
export const getLeadStats = async (req: AuthRequest, res: Response): Promise<void> => {
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
