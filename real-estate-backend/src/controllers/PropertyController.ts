import { Request, Response } from 'express';
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
          approvalStatus: 'pending'
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
          approvalStatus: 'pending'
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
          approvalStatus: 'pending'
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
          approvalStatus: 'pending'
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
          approvalStatus: 'pending'
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
          approvalStatus: 'pending'
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
    const propertyId = parseInt(id);

    // Search for property in all property tables
    let property = null;
    let propertyType = null;

    // Try to find in each table
    property = await SaleProperty.findOne({
      where: {
        id: propertyId,
        approvalStatus: 'approved'
      }
    });
    if (property) {
      propertyType = 'sale';
    } else {
      property = await RentProperty.findOne({
        where: {
          id: propertyId,
          approvalStatus: 'approved'
        }
      });
      if (property) {
        propertyType = 'rent';
      } else {
        property = await LeaseProperty.findOne({
          where: {
            id: propertyId,
            approvalStatus: 'approved'
          }
        });
        if (property) {
          propertyType = 'lease';
        } else {
          property = await PgProperty.findOne({
            where: {
              id: propertyId,
              approvalStatus: 'approved'
            }
          });
          if (property) {
            propertyType = 'pg';
          } else {
            property = await CommercialProperty.findOne({
              where: {
                id: propertyId,
                approvalStatus: 'approved'
              }
            });
            if (property) {
              propertyType = 'commercial';
            } else {
              property = await LandProperty.findOne({
                where: {
                  id: propertyId,
                  approvalStatus: 'approved'
                }
              });
              if (property) {
                propertyType = 'land';
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
      propertyType,
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
      propertyExists = await RentProperty.findByPk(propertyId);
      if (propertyExists) {
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
        propertyExists = await LeaseProperty.findByPk(propertyId);
        if (propertyExists) {
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
          propertyExists = await PgProperty.findByPk(propertyId);
          if (propertyExists) {
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
            propertyExists = await CommercialProperty.findByPk(propertyId);
            if (propertyExists) {
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
              propertyExists = await LandProperty.findByPk(propertyId);
              if (propertyExists) {
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
      propertyExists = await RentProperty.findByPk(propertyId);
      if (propertyExists) {
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
        propertyExists = await LeaseProperty.findByPk(propertyId);
        if (propertyExists) {
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
          propertyExists = await PgProperty.findByPk(propertyId);
          if (propertyExists) {
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
            propertyExists = await CommercialProperty.findByPk(propertyId);
            if (propertyExists) {
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
              propertyExists = await LandProperty.findByPk(propertyId);
              if (propertyExists) {
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
      propertyExists = await RentProperty.findByPk(propertyId);
      if (propertyExists) {
        deletedRows = await RentProperty.destroy({
          where: { id: propertyId }
        });
        tableName = 'rent';
      } else {
        propertyExists = await LeaseProperty.findByPk(propertyId);
        if (propertyExists) {
          deletedRows = await LeaseProperty.destroy({
            where: { id: propertyId }
          });
          tableName = 'lease';
        } else {
          propertyExists = await PgProperty.findByPk(propertyId);
          if (propertyExists) {
            deletedRows = await PgProperty.destroy({
              where: { id: propertyId }
            });
            tableName = 'pg';
          } else {
            propertyExists = await CommercialProperty.findByPk(propertyId);
            if (propertyExists) {
              deletedRows = await CommercialProperty.destroy({
                where: { id: propertyId }
              });
              tableName = 'commercial';
            } else {
              propertyExists = await LandProperty.findByPk(propertyId);
              if (propertyExists) {
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