import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { SaleProperty } from '../models/SaleProperty';
import { RentProperty } from '../models/RentProperty';
import { LeaseProperty } from '../models/LeaseProperty';
import { PgProperty } from '../models/PgProperty';
import { CommercialProperty } from '../models/CommercialProperty';
import { LandProperty } from '../models/LandProperty';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract property data from request body
    const {
      title,
      description,
      price,
      location,
      address,
      city,
      state,
      zipCode,
      country,
      propertyType,
      propertyStatus,
      bedrooms,
      bathrooms,
      area,
      amenities,
      contactName,
      contactEmail,
      contactPhone,
      latitude,
      longitude,
      userType,
      // Sale-specific fields
      possessionStatus,
      propertyAge,
      maintenanceCharge,
      // Rent-specific fields
      availableFrom,
      securityDeposit,
      // Lease-specific fields
      leasePeriod,
      monthlyLeaseAmount,
      leaseTerms,
      // PG-specific fields
      foodIncluded,
      gender,
      occupancy,
      // Commercial-specific fields
      propertySubType,
      commercialArea,
      facing,
      // Land-specific fields
      landArea,
      landType,
      utilities
    } = req.body;

    // Handle uploaded images from Cloudinary
    const images = (req.files as any[])?.map((file: any) => file.path) || [];

    let newProperty;

    // Validate property type
    if (!propertyType) {
      res.status(400).json({
        success: false,
        message: 'Property type is required'
      });
      return;
    }
    
    // Create property based on property type
    switch(propertyType.toLowerCase()) {
      case 'sale':
      case 'sell':
        newProperty = await SaleProperty.create({
          title,
          description,
          price,
          location,
          address,
          city,
          state,
          zipCode,
          country,
          propertyType,
          propertyStatus,
          bedrooms,
          bathrooms,
          area,
          amenities,
          contactName,
          contactEmail,
          contactPhone,
          possessionStatus,
          propertyAge,
          latitude,
          longitude,
          userType,
          images,
          approvalStatus: 'pending',
          isVerified: false
        });
        break;
      case 'rent':
        newProperty = await RentProperty.create({
          title,
          description,
          price,
          location,
          address,
          city,
          state,
          zipCode,
          country,
          propertyType,
          propertyStatus,
          bedrooms,
          bathrooms,
          area,
          amenities,
          contactName,
          contactEmail,
          contactPhone,
          availableFrom,
          securityDeposit,
          maintenanceCharge,
          latitude,
          longitude,
          userType,
          images,
          approvalStatus: 'pending',
          isVerified: false
        });
        break;
      case 'lease':
        newProperty = await LeaseProperty.create({
          title,
          description,
          price,
          location,
          address,
          city,
          state,
          zipCode,
          country,
          propertyType,
          propertyStatus,
          bedrooms,
          bathrooms,
          area,
          amenities,
          contactName,
          contactEmail,
          contactPhone,
          leasePeriod,
          monthlyLeaseAmount,
          leaseTerms,
          latitude,
          longitude,
          userType,
          images,
          approvalStatus: 'pending',
          isVerified: false
        });
        break;
      case 'pg':
      case 'hostel':
        newProperty = await PgProperty.create({
          title,
          description,
          price,
          location,
          address,
          city,
          state,
          zipCode,
          country,
          propertyType,
          propertyStatus,
          bedrooms,
          bathrooms,
          area,
          amenities,
          contactName,
          contactEmail,
          contactPhone,
          foodIncluded,
          gender,
          occupancy,
          latitude,
          longitude,
          userType,
          images,
          approvalStatus: 'pending',
          isVerified: false
        });
        break;
      case 'commercial':
        newProperty = await CommercialProperty.create({
          title,
          description,
          price,
          location,
          address,
          city,
          state,
          zipCode,
          country,
          propertyType,
          propertyStatus,
          bedrooms,
          bathrooms,
          area,
          amenities,
          contactName,
          contactEmail,
          contactPhone,
          propertySubType,
          commercialArea,
          facing,
          latitude,
          longitude,
          userType,
          images,
          approvalStatus: 'pending',
          isVerified: false
        });
        break;
      case 'land':
        newProperty = await LandProperty.create({
          title,
          description,
          price,
          location,
          address,
          city,
          state,
          zipCode,
          country,
          propertyType,
          propertyStatus,
          contactName,
          contactEmail,
          contactPhone,
          landArea,
          landType,
          facing,
          utilities,
          latitude,
          longitude,
          userType,
          images,
          approvalStatus: 'pending',
          isVerified: false
        });
        break;
      default:
        res.status(400).json({
          success: false,
          message: 'Invalid property type. Valid types are: sale, rent, lease, pg, commercial, land'
        });
        return;
    }

    res.status(201).json({
      success: true,
      message: 'Property listing created successfully and is pending approval',
      data: newProperty
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create property listing',
      error: (error as Error).message
    });
  }
};

export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;

    // If a specific type is requested, only fetch from that table
    if (type) {
      let properties: any[] = [];
      const whereClause = { approvalStatus: 'approved' };
      const order: any = [['createdAt', 'DESC']];
      const typeStr = String(type).toLowerCase();

      if (typeStr === 'sale' || typeStr === 'sell' || typeStr === 'buy') {
        properties = await SaleProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'rent') {
        properties = await RentProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'lease') {
        properties = await LeaseProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'pg') {
        properties = await PgProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'commercial') {
        properties = await CommercialProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'land') {
        properties = await LandProperty.findAll({ where: whereClause, order });
      }

      res.status(200).json({
        success: true,
        count: properties.length,
        data: properties
      });
      return;
    }

    // Get all approved properties from all property types
    const saleProperties = await SaleProperty.findAll({
      where: {
        approvalStatus: 'approved'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const rentProperties = await RentProperty.findAll({
      where: {
        approvalStatus: 'approved'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const leaseProperties = await LeaseProperty.findAll({
      where: {
        approvalStatus: 'approved'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const pgProperties = await PgProperty.findAll({
      where: {
        approvalStatus: 'approved'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const commercialProperties = await CommercialProperty.findAll({
      where: {
        approvalStatus: 'approved'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const landProperties = await LandProperty.findAll({
      where: {
        approvalStatus: 'approved'
      },
      order: [['createdAt', 'DESC']]
    });

    // Combine all properties
    const allProperties = [
      ...saleProperties,
      ...rentProperties,
      ...leaseProperties,
      ...pgProperties,
      ...commercialProperties,
      ...landProperties
    ];

    // Sort by date descending
    allProperties.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    });

    res.status(200).json({
      success: true,
      count: allProperties.length,
      data: allProperties
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties',
      error: (error as Error).message
    });
  }
};

export const getAllPropertiesCombined = async (req: Request, res: Response) => {
  try {
    // Check if admin parameter is provided to show all properties
    const { admin } = req.query;
    
    const whereClause = admin ? {} : { approvalStatus: 'approved' };
    
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
    
    const allProperties = [
      ...saleProperties.map(p => ({ ...p, sourceTable: 'sale_properties' })),
      ...rentProperties.map(p => ({ ...p, sourceTable: 'rent_properties' })),
      ...leaseProperties.map(p => ({ ...p, sourceTable: 'lease_properties' })),
      ...pgProperties.map(p => ({ ...p, sourceTable: 'pg_properties' })),
      ...commercialProperties.map(p => ({ ...p, sourceTable: 'commercial_properties' })),
      ...landProperties.map(p => ({ ...p, sourceTable: 'land_properties' }))
    ];
    
    allProperties.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
    
    res.status(200).json({
      success: true,
      count: allProperties.length,
      data: allProperties
    });
  } catch (error) {
    console.error('Error fetching all properties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all properties',
      error: (error as Error).message
    });
  }
};

export const getAllPendingProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all pending properties from all property types for admin dashboard
    const saleProperties = await SaleProperty.findAll({
      where: {
        approvalStatus: 'pending'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const rentProperties = await RentProperty.findAll({
      where: {
        approvalStatus: 'pending'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const leaseProperties = await LeaseProperty.findAll({
      where: {
        approvalStatus: 'pending'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const pgProperties = await PgProperty.findAll({
      where: {
        approvalStatus: 'pending'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const commercialProperties = await CommercialProperty.findAll({
      where: {
        approvalStatus: 'pending'
      },
      order: [['createdAt', 'DESC']]
    });
    
    const landProperties = await LandProperty.findAll({
      where: {
        approvalStatus: 'pending'
      },
      order: [['createdAt', 'DESC']]
    });

    // Combine all pending properties
    const allPendingProperties = [
      ...saleProperties,
      ...rentProperties,
      ...leaseProperties,
      ...pgProperties,
      ...commercialProperties,
      ...landProperties
    ];

    // Sort by date descending
    allPendingProperties.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    });

    res.status(200).json({
      success: true,
      count: allPendingProperties.length,
      data: allPendingProperties
    });
  } catch (error) {
    console.error('Error fetching pending properties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending properties',
      error: (error as Error).message
    });
  }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { type } = req.query; // Get type from query param
    const propertyId = parseInt(id);

    // Search for property in all property tables
    let property = null;
    let foundPropertyType = null;

    // If type is provided, prioritize searching that table
    if (type) {
      const typeStr = String(type).toLowerCase();
      if (typeStr === 'sale' || typeStr === 'sell' || typeStr === 'buy') {
        property = await SaleProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) foundPropertyType = 'sale';
      } else if (typeStr === 'rent') {
        property = await RentProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) foundPropertyType = 'rent';
      } else if (typeStr === 'lease') {
        property = await LeaseProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) foundPropertyType = 'lease';
      } else if (typeStr === 'pg') {
        property = await PgProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) foundPropertyType = 'pg';
      } else if (typeStr === 'commercial') {
        property = await CommercialProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) foundPropertyType = 'commercial';
      } else if (typeStr === 'land') {
        property = await LandProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) foundPropertyType = 'land';
      }

      if (property) {
        res.status(200).json({
          success: true,
          propertyType: foundPropertyType,
          data: property
        });
        return;
      }
    }

    // Fallback to searching all tables if no type or not found in specified type
    property = await SaleProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
    if (property) {
      foundPropertyType = 'sale';
    } else {
      property = await RentProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
      if (property) {
        foundPropertyType = 'rent';
      } else {
        property = await LeaseProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) {
          foundPropertyType = 'lease';
        } else {
          property = await PgProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
          if (property) {
            foundPropertyType = 'pg';
          } else {
            property = await CommercialProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
            if (property) {
              foundPropertyType = 'commercial';
            } else {
              property = await LandProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
              if (property) {
                foundPropertyType = 'land';
              }
            }
          }
        }
      }
    }

    if (!property) {
      res.status(404).json({
        success: false,
        message: 'Property not found or not approved yet'
      });
      return;
    }

    res.status(200).json({
      success: true,
      propertyType: foundPropertyType,
      data: property
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property',
      error: (error as Error).message
    });
  }
};

export const approveProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = parseInt(id);

    // Try to update in each table
    let updatedRows = 0;
    let tableName = '';

    // First, check which table the property belongs to
    let propertyExists = await SaleProperty.findByPk(propertyId);
    if (propertyExists) {
      [updatedRows] = await SaleProperty.update(
        {
          approvalStatus: 'approved',
          approvedAt: new Date()
        },
        {
          where: { id: propertyId }
        }
      );
      tableName = 'sale';
    } else {
      const rentProperty = await RentProperty.findByPk(propertyId);
      if (rentProperty) {
        [updatedRows] = await RentProperty.update(
          {
            approvalStatus: 'approved',
            approvedAt: new Date()
          },
          {
            where: { id: propertyId }
          }
        );
        tableName = 'rent';
      } else {
        const leaseProperty = await LeaseProperty.findByPk(propertyId);
        if (leaseProperty) {
          [updatedRows] = await LeaseProperty.update(
            {
              approvalStatus: 'approved',
              approvedAt: new Date()
            },
            {
              where: { id: propertyId }
            }
          );
          tableName = 'lease';
        } else {
          const pgProperty = await PgProperty.findByPk(propertyId);
          if (pgProperty) {
            [updatedRows] = await PgProperty.update(
              {
                approvalStatus: 'approved',
                approvedAt: new Date()
              },
              {
                where: { id: propertyId }
              }
            );
            tableName = 'pg';
          } else {
            const commercialProperty = await CommercialProperty.findByPk(propertyId);
            if (commercialProperty) {
              [updatedRows] = await CommercialProperty.update(
                {
                  approvalStatus: 'approved',
                  approvedAt: new Date()
                },
                {
                  where: { id: propertyId }
                }
              );
              tableName = 'commercial';
            } else {
              const landProperty = await LandProperty.findByPk(propertyId);
              if (landProperty) {
                [updatedRows] = await LandProperty.update(
                  {
                    approvalStatus: 'approved',
                    approvedAt: new Date()
                  },
                  {
                    where: { id: propertyId }
                  }
                );
                tableName = 'land';
              }
            }
          }
        }
      }
    }

    if (updatedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Property not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Property approved successfully in ${tableName} table`
    });
  } catch (error) {
    console.error('Error approving property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve property',
      error: (error as Error).message
    });
  }
};

export const rejectProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = parseInt(id);

    // Try to update in each table
    let updatedRows = 0;
    let tableName = '';

    // First, check which table the property belongs to
    let propertyExists = await SaleProperty.findByPk(propertyId);
    if (propertyExists) {
      [updatedRows] = await SaleProperty.update(
        {
          approvalStatus: 'rejected'
        },
        {
          where: { id: propertyId }
        }
      );
      tableName = 'sale';
    } else {
      const rentProperty = await RentProperty.findByPk(propertyId);
      if (rentProperty) {
        [updatedRows] = await RentProperty.update(
          {
            approvalStatus: 'rejected'
          },
          {
            where: { id: propertyId }
          }
        );
        tableName = 'rent';
      } else {
        const leaseProperty = await LeaseProperty.findByPk(propertyId);
        if (leaseProperty) {
          [updatedRows] = await LeaseProperty.update(
            {
              approvalStatus: 'rejected'
            },
            {
              where: { id: propertyId }
            }
          );
          tableName = 'lease';
        } else {
          const pgProperty = await PgProperty.findByPk(propertyId);
          if (pgProperty) {
            [updatedRows] = await PgProperty.update(
              {
                approvalStatus: 'rejected'
              },
              {
                where: { id: propertyId }
              }
            );
            tableName = 'pg';
          } else {
            const commercialProperty = await CommercialProperty.findByPk(propertyId);
            if (commercialProperty) {
              [updatedRows] = await CommercialProperty.update(
                {
                  approvalStatus: 'rejected'
                },
                {
                  where: { id: propertyId }
                }
              );
              tableName = 'commercial';
            } else {
              const landProperty = await LandProperty.findByPk(propertyId);
              if (landProperty) {
                [updatedRows] = await LandProperty.update(
                  {
                    approvalStatus: 'rejected'
                  },
                  {
                    where: { id: propertyId }
                  }
                );
                tableName = 'land';
              }
            }
          }
        }
      }
    }

    if (updatedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Property not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Property rejected successfully in ${tableName} table`
    });
  } catch (error) {
    console.error('Error rejecting property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject property',
      error: (error as Error).message
    });
  }
};

export const getUserProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since property submission is now without authentication,
    // there's no concept of user-owned properties.
    // This endpoint might be deprecated in favor of admin-only property management.
    res.status(200).json({
      success: true,
      message: 'User properties not applicable - properties are managed by admin',
      data: []
    });
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user properties',
      error: (error as Error).message
    });
  }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = parseInt(id);
    const propertyType = req.query.type as string; // Get property type from query param
    const {
      title,
      description,
      price,
      location,
      address,
      city,
      state,
      zipCode,
      country,
      propertyStatus,
      bedrooms,
      bathrooms,
      area,
      amenities,
      contactName,
      contactEmail,
      contactPhone,
      fieldVisibility,
      imageVisibility,
      isVerified,
      existingImages // Optional: if frontend wants to keep some old images
    } = req.body;

    // Handle new uploaded images from Cloudinary
    const newImages = (req.files as any[])?.map((file: any) => file.path) || [];
    
    // Combine existing images with new ones
    let images = newImages;
    if (existingImages) {
      const parsedExisting = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      images = [...parsedExisting, ...newImages];
    }

    // Define common fields that exist in all property types
    const commonFields: any = {
      title,
      description,
      price,
      location,
      address,
      city,
      state,
      zipCode,
      country,
      propertyStatus,
      bedrooms,
      bathrooms,
      area,
      amenities,
      contactName,
      contactEmail,
      contactPhone,
      fieldVisibility,
      imageVisibility,
      isVerified
    };

    // Only update images if new ones were uploaded or existing ones were provided
    if (images.length > 0) {
      commonFields.images = images;
    }

    // Update verifiedAt timestamp when isVerified changes to true
    if (typeof isVerified === 'boolean' && isVerified) {
      commonFields.verifiedAt = new Date();
    }

    // If property type is specified, update that specific table
    if (propertyType) {
      switch(propertyType.toLowerCase()) {
        case 'sale':
          const saleProperty = await SaleProperty.findByPk(propertyId);
          if (saleProperty) {
            await saleProperty.update(commonFields);
            res.status(200).json({
              success: true,
              message: 'Sale property updated successfully',
              data: saleProperty
            });
            return;
          }
          break;
        case 'rent':
          const rentProperty = await RentProperty.findByPk(propertyId);
          if (rentProperty) {
            await rentProperty.update(commonFields);
            res.status(200).json({
              success: true,
              message: 'Rent property updated successfully',
              data: rentProperty
            });
            return;
          }
          break;
        case 'lease':
          const leaseProperty = await LeaseProperty.findByPk(propertyId);
          if (leaseProperty) {
            await leaseProperty.update(commonFields);
            res.status(200).json({
              success: true,
              message: 'Lease property updated successfully',
              data: leaseProperty
            });
            return;
          }
          break;
        case 'pg':
          const pgProperty = await PgProperty.findByPk(propertyId);
          if (pgProperty) {
            await pgProperty.update(commonFields);
            res.status(200).json({
              success: true,
              message: 'PG property updated successfully',
              data: pgProperty
            });
            return;
          }
          break;
        case 'commercial':
          const commercialProperty = await CommercialProperty.findByPk(propertyId);
          if (commercialProperty) {
            await commercialProperty.update(commonFields);
            res.status(200).json({
              success: true,
              message: 'Commercial property updated successfully',
              data: commercialProperty
            });
            return;
          }
          break;
        case 'land':
          const landProperty = await LandProperty.findByPk(propertyId);
          if (landProperty) {
            await landProperty.update(commonFields);
            res.status(200).json({
              success: true,
              message: 'Land property updated successfully',
              data: landProperty
            });
            return;
          }
          break;
      }
    }

    // If no property type specified, fall back to searching all tables
    const tables = [
      { model: SaleProperty, name: 'sale' },
      { model: RentProperty, name: 'rent' },
      { model: LeaseProperty, name: 'lease' },
      { model: PgProperty, name: 'pg' },
      { model: CommercialProperty, name: 'commercial' },
      { model: LandProperty, name: 'land' }
    ];

    for (const table of tables) {
      try {
        // Using type assertion to handle different property types
        const property: any = await (table.model as any).findByPk(propertyId);
        if (property) {
          await property.update(commonFields);
          res.status(200).json({
            success: true,
            message: `${table.name.charAt(0).toUpperCase() + table.name.slice(1)} property updated successfully`,
            data: property
          });
          return;
        }
      } catch (err) {
        // Continue to the next table if there's an error
        continue;
      }
    }

    // If property not found in any table
    res.status(404).json({
      success: false,
      message: 'Property not found in any table'
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update property',
      error: (error as Error).message
    });
  }
};

// New function to update approval status for any property type
export const updateApprovalStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = parseInt(id);
    const propertyType = req.query.type as string; // Get property type from query param
    const { approvalStatus } = req.body;

    if (!approvalStatus || !['pending', 'approved', 'rejected'].includes(approvalStatus)) {
      res.status(400).json({
        success: false,
        message: 'Invalid approval status. Must be pending, approved, or rejected.'
      });
      return;
    }

    // If property type is specified, update that specific table
    if (propertyType) {
      switch(propertyType.toLowerCase()) {
        case 'sale':
          const saleProperty = await SaleProperty.findByPk(propertyId);
          if (saleProperty) {
            await saleProperty.update({ approvalStatus });
            res.status(200).json({
              success: true,
              message: 'Sale property approval status updated successfully',
              data: { ...saleProperty.toJSON(), approvalStatus }
            });
            return;
          }
          break;
        case 'rent':
          const rentProperty = await RentProperty.findByPk(propertyId);
          if (rentProperty) {
            await rentProperty.update({ approvalStatus });
            res.status(200).json({
              success: true,
              message: 'Rent property approval status updated successfully',
              data: { ...rentProperty.toJSON(), approvalStatus }
            });
            return;
          }
          break;
        case 'lease':
          const leaseProperty = await LeaseProperty.findByPk(propertyId);
          if (leaseProperty) {
            await leaseProperty.update({ approvalStatus });
            res.status(200).json({
              success: true,
              message: 'Lease property approval status updated successfully',
              data: { ...leaseProperty.toJSON(), approvalStatus }
            });
            return;
          }
          break;
        case 'pg':
          const pgProperty = await PgProperty.findByPk(propertyId);
          if (pgProperty) {
            await pgProperty.update({ approvalStatus });
            res.status(200).json({
              success: true,
              message: 'PG property approval status updated successfully',
              data: { ...pgProperty.toJSON(), approvalStatus }
            });
            return;
          }
          break;
        case 'commercial':
          const commercialProperty = await CommercialProperty.findByPk(propertyId);
          if (commercialProperty) {
            await commercialProperty.update({ approvalStatus });
            res.status(200).json({
              success: true,
              message: 'Commercial property approval status updated successfully',
              data: { ...commercialProperty.toJSON(), approvalStatus }
            });
            return;
          }
          break;
        case 'land':
          const landProperty = await LandProperty.findByPk(propertyId);
          if (landProperty) {
            await landProperty.update({ approvalStatus });
            res.status(200).json({
              success: true,
              message: 'Land property approval status updated successfully',
              data: { ...landProperty.toJSON(), approvalStatus }
            });
            return;
          }
          break;
      }
    }

    // If no property type specified, fall back to searching all tables
    const tables = [
      { model: SaleProperty, name: 'sale' },
      { model: RentProperty, name: 'rent' },
      { model: LeaseProperty, name: 'lease' },
      { model: PgProperty, name: 'pg' },
      { model: CommercialProperty, name: 'commercial' },
      { model: LandProperty, name: 'land' }
    ];

    for (const table of tables) {
      try {
        // Using type assertion to handle different property types
        const property: any = await (table.model as any).findByPk(propertyId);
        if (property) {
          await property.update({ approvalStatus });
          res.status(200).json({
            success: true,
            message: `${table.name.charAt(0).toUpperCase() + table.name.slice(1)} property approval status updated successfully`,
            data: { ...property.toJSON(), approvalStatus }
          });
          return;
        }
      } catch (err) {
        // Continue to the next table if there's an error
        continue;
      }
    }

    // If property not found in any table
    res.status(404).json({
      success: false,
      message: 'Property not found in any table'
    });
  } catch (error) {
    console.error('Error updating property approval status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update property approval status',
      error: (error as Error).message
    });
  }
};

export const getPropertiesByLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { locationName } = req.params;
    const { type, includePending = false } = req.query;
    
    if (!locationName) {
      res.status(400).json({
        success: false,
        message: 'Location name is required'
      });
      return;
    }

    // Decode the location name (in case it contains URL-encoded characters)
    const decodedLocationName = decodeURIComponent(locationName).toLowerCase().trim();
    
    // Define approval status filter
    const approvalStatus = includePending ? ['approved', 'pending'] : ['approved'];
    
    // If a specific type is requested, only search in that table
    if (type) {
      let properties: any[] = [];
      const whereClause = { 
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      };
      const order: any = [['createdAt', 'DESC']];
      const typeStr = String(type).toLowerCase();

      if (typeStr === 'sale' || typeStr === 'sell' || typeStr === 'buy') {
        properties = await SaleProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'rent') {
        properties = await RentProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'lease') {
        properties = await LeaseProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'pg') {
        properties = await PgProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'commercial') {
        properties = await CommercialProperty.findAll({ where: whereClause, order });
      } else if (typeStr === 'land') {
        properties = await LandProperty.findAll({ where: whereClause, order });
      }

      res.status(200).json({
        success: true,
        count: properties.length,
        location: decodedLocationName,
        propertyType: typeStr,
        data: properties
      });
      return;
    }

    // Search across all property tables
    const saleProperties = await SaleProperty.findAll({
      where: {
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    const rentProperties = await RentProperty.findAll({
      where: {
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    const leaseProperties = await LeaseProperty.findAll({
      where: {
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    const pgProperties = await PgProperty.findAll({
      where: {
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    const commercialProperties = await CommercialProperty.findAll({
      where: {
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    const landProperties = await LandProperty.findAll({
      where: {
        approvalStatus: approvalStatus,
        [Op.or]: [
          { location: { [Op.iLike]: `%${decodedLocationName}%` } },
          { city: { [Op.iLike]: `%${decodedLocationName}%` } },
          { state: { [Op.iLike]: `%${decodedLocationName}%` } },
          { address: { [Op.iLike]: `%${decodedLocationName}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });

    // Combine all properties
    const allProperties = [
      ...saleProperties,
      ...rentProperties,
      ...leaseProperties,
      ...pgProperties,
      ...commercialProperties,
      ...landProperties
    ];

    // Sort by date descending
    allProperties.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    });

    res.status(200).json({
      success: true,
      count: allProperties.length,
      location: decodedLocationName,
      data: allProperties
    });
  } catch (error) {
    console.error('Error searching properties by location:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search properties by location',
      error: (error as Error).message
    });
  }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id } = req.params;
    const propertyId = parseInt(id);

    // Try to delete from each table
    let deletedRows = 0;
    let tableName = '';

    // First, check which table the property belongs to
    let propertyExists = await SaleProperty.findByPk(propertyId);
    if (propertyExists) {
      deletedRows = await SaleProperty.destroy({
        where: { id: propertyId }
      });
      tableName = 'sale';
    } else {
      const rentProperty = await RentProperty.findByPk(propertyId);
      if (rentProperty) {
        deletedRows = await RentProperty.destroy({
          where: { id: propertyId }
        });
        tableName = 'rent';
      } else {
        const leaseProperty = await LeaseProperty.findByPk(propertyId);
        if (leaseProperty) {
          deletedRows = await LeaseProperty.destroy({
            where: { id: propertyId }
          });
          tableName = 'lease';
        } else {
          const pgProperty = await PgProperty.findByPk(propertyId);
          if (pgProperty) {
            deletedRows = await PgProperty.destroy({
              where: { id: propertyId }
            });
            tableName = 'pg';
          } else {
            const commercialProperty = await CommercialProperty.findByPk(propertyId);
            if (commercialProperty) {
              deletedRows = await CommercialProperty.destroy({
                where: { id: propertyId }
              });
              tableName = 'commercial';
            } else {
              const landProperty = await LandProperty.findByPk(propertyId);
              if (landProperty) {
                deletedRows = await LandProperty.destroy({
                  where: { id: propertyId }
                });
                tableName = 'land';
              }
            }
          }
        }
      }
    }

    if (deletedRows === 0) {
      res.status(404).json({
        success: false,
        message: 'Property not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Property deleted successfully from ${tableName} table`
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete property',
      error: (error as Error).message
    });
  }
};