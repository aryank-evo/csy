"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateApprovalStatus = exports.updateProperty = exports.getUserProperties = exports.rejectProperty = exports.approveProperty = exports.getPropertyById = exports.getAllPendingProperties = exports.getAllPropertiesCombined = exports.getAllProperties = exports.createProperty = void 0;
const SaleProperty_1 = require("../models/SaleProperty");
const RentProperty_1 = require("../models/RentProperty");
const LeaseProperty_1 = require("../models/LeaseProperty");
const PgProperty_1 = require("../models/PgProperty");
const CommercialProperty_1 = require("../models/CommercialProperty");
const LandProperty_1 = require("../models/LandProperty");
const createProperty = async (req, res) => {
    try {
        const { title, description, price, location, address, city, state, zipCode, country, propertyType, propertyStatus, bedrooms, bathrooms, area, amenities, contactName, contactEmail, contactPhone, latitude, longitude, userType, possessionStatus, propertyAge, maintenanceCharge, availableFrom, securityDeposit, leasePeriod, monthlyLeaseAmount, leaseTerms, foodIncluded, gender, occupancy, propertySubType, commercialArea, facing, landArea, landType, utilities } = req.body;
        const images = req.files?.map((file) => file.path) || [];
        let newProperty;
        if (!propertyType) {
            res.status(400).json({
                success: false,
                message: 'Property type is required'
            });
            return;
        }
        switch (propertyType.toLowerCase()) {
            case 'sale':
            case 'sell':
                newProperty = await SaleProperty_1.SaleProperty.create({
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
                newProperty = await RentProperty_1.RentProperty.create({
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
                newProperty = await LeaseProperty_1.LeaseProperty.create({
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
                newProperty = await PgProperty_1.PgProperty.create({
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
                newProperty = await CommercialProperty_1.CommercialProperty.create({
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
                newProperty = await LandProperty_1.LandProperty.create({
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
    }
    catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create property listing',
            error: error.message
        });
    }
};
exports.createProperty = createProperty;
const getAllProperties = async (req, res) => {
    try {
        const { type } = req.query;
        if (type) {
            let properties = [];
            const whereClause = { approvalStatus: 'approved' };
            const order = [['createdAt', 'DESC']];
            const typeStr = String(type).toLowerCase();
            if (typeStr === 'sale' || typeStr === 'sell' || typeStr === 'buy') {
                properties = await SaleProperty_1.SaleProperty.findAll({ where: whereClause, order });
            }
            else if (typeStr === 'rent') {
                properties = await RentProperty_1.RentProperty.findAll({ where: whereClause, order });
            }
            else if (typeStr === 'lease') {
                properties = await LeaseProperty_1.LeaseProperty.findAll({ where: whereClause, order });
            }
            else if (typeStr === 'pg') {
                properties = await PgProperty_1.PgProperty.findAll({ where: whereClause, order });
            }
            else if (typeStr === 'commercial') {
                properties = await CommercialProperty_1.CommercialProperty.findAll({ where: whereClause, order });
            }
            else if (typeStr === 'land') {
                properties = await LandProperty_1.LandProperty.findAll({ where: whereClause, order });
            }
            res.status(200).json({
                success: true,
                count: properties.length,
                data: properties
            });
            return;
        }
        const saleProperties = await SaleProperty_1.SaleProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const rentProperties = await RentProperty_1.RentProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const leaseProperties = await LeaseProperty_1.LeaseProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const pgProperties = await PgProperty_1.PgProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const commercialProperties = await CommercialProperty_1.CommercialProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const landProperties = await LandProperty_1.LandProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const allProperties = [
            ...saleProperties,
            ...rentProperties,
            ...leaseProperties,
            ...pgProperties,
            ...commercialProperties,
            ...landProperties
        ];
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
    }
    catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch properties',
            error: error.message
        });
    }
};
exports.getAllProperties = getAllProperties;
const getAllPropertiesCombined = async (req, res) => {
    try {
        // Check if this is being called from admin dashboard
        // For admin dashboard, show all properties regardless of approval status
        const isFromAdmin = req.headers.referer && req.headers.referer.includes('/admin');
        
        const whereClause = isFromAdmin ? {} : { approvalStatus: 'approved' };
        
        const saleProperties = await SaleProperty_1.SaleProperty.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            raw: true
        });
        
        const rentProperties = await RentProperty_1.RentProperty.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            raw: true
        });
        
        const leaseProperties = await LeaseProperty_1.LeaseProperty.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            raw: true
        });
        
        const pgProperties = await PgProperty_1.PgProperty.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            raw: true
        });
        
        const commercialProperties = await CommercialProperty_1.CommercialProperty.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            raw: true
        });
        
        const landProperties = await LandProperty_1.LandProperty.findAll({
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
    }
    catch (error) {
        console.error('Error fetching all properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all properties',
            error: error.message
        });
    }
};
exports.getAllPropertiesCombined = getAllPropertiesCombined;
const getAllPendingProperties = async (req, res) => {
    try {
        const saleProperties = await SaleProperty_1.SaleProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const rentProperties = await RentProperty_1.RentProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const leaseProperties = await LeaseProperty_1.LeaseProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const pgProperties = await PgProperty_1.PgProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const commercialProperties = await CommercialProperty_1.CommercialProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const landProperties = await LandProperty_1.LandProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const allPendingProperties = [
            ...saleProperties,
            ...rentProperties,
            ...leaseProperties,
            ...pgProperties,
            ...commercialProperties,
            ...landProperties
        ];
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
    }
    catch (error) {
        console.error('Error fetching pending properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending properties',
            error: error.message
        });
    }
};
exports.getAllPendingProperties = getAllPendingProperties;
const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;
        const propertyId = parseInt(id);
        let property = null;
        let foundPropertyType = null;
        if (type) {
            const typeStr = String(type).toLowerCase();
            if (typeStr === 'sale' || typeStr === 'sell' || typeStr === 'buy') {
                property = await SaleProperty_1.SaleProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property)
                    foundPropertyType = 'sale';
            }
            else if (typeStr === 'rent') {
                property = await RentProperty_1.RentProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property)
                    foundPropertyType = 'rent';
            }
            else if (typeStr === 'lease') {
                property = await LeaseProperty_1.LeaseProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property)
                    foundPropertyType = 'lease';
            }
            else if (typeStr === 'pg') {
                property = await PgProperty_1.PgProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property)
                    foundPropertyType = 'pg';
            }
            else if (typeStr === 'commercial') {
                property = await CommercialProperty_1.CommercialProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property)
                    foundPropertyType = 'commercial';
            }
            else if (typeStr === 'land') {
                property = await LandProperty_1.LandProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property)
                    foundPropertyType = 'land';
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
        property = await SaleProperty_1.SaleProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
        if (property) {
            foundPropertyType = 'sale';
        }
        else {
            property = await RentProperty_1.RentProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
            if (property) {
                foundPropertyType = 'rent';
            }
            else {
                property = await LeaseProperty_1.LeaseProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                if (property) {
                    foundPropertyType = 'lease';
                }
                else {
                    property = await PgProperty_1.PgProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                    if (property) {
                        foundPropertyType = 'pg';
                    }
                    else {
                        property = await CommercialProperty_1.CommercialProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
                        if (property) {
                            foundPropertyType = 'commercial';
                        }
                        else {
                            property = await LandProperty_1.LandProperty.findOne({ where: { id: propertyId, approvalStatus: 'approved' } });
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
    }
    catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch property',
            error: error.message
        });
    }
};
exports.getPropertyById = getPropertyById;
const approveProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        let updatedRows = 0;
        let tableName = '';
        let propertyExists = await SaleProperty_1.SaleProperty.findByPk(propertyId);
        if (propertyExists) {
            [updatedRows] = await SaleProperty_1.SaleProperty.update({
                approvalStatus: 'approved',
                approvedAt: new Date()
            }, {
                where: { id: propertyId }
            });
            tableName = 'sale';
        }
        else {
            const rentProperty = await RentProperty_1.RentProperty.findByPk(propertyId);
            if (rentProperty) {
                [updatedRows] = await RentProperty_1.RentProperty.update({
                    approvalStatus: 'approved',
                    approvedAt: new Date()
                }, {
                    where: { id: propertyId }
                });
                tableName = 'rent';
            }
            else {
                const leaseProperty = await LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                if (leaseProperty) {
                    [updatedRows] = await LeaseProperty_1.LeaseProperty.update({
                        approvalStatus: 'approved',
                        approvedAt: new Date()
                    }, {
                        where: { id: propertyId }
                    });
                    tableName = 'lease';
                }
                else {
                    const pgProperty = await PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        [updatedRows] = await PgProperty_1.PgProperty.update({
                            approvalStatus: 'approved',
                            approvedAt: new Date()
                        }, {
                            where: { id: propertyId }
                        });
                        tableName = 'pg';
                    }
                    else {
                        const commercialProperty = await CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                        if (commercialProperty) {
                            [updatedRows] = await CommercialProperty_1.CommercialProperty.update({
                                approvalStatus: 'approved',
                                approvedAt: new Date()
                            }, {
                                where: { id: propertyId }
                            });
                            tableName = 'commercial';
                        }
                        else {
                            const landProperty = await LandProperty_1.LandProperty.findByPk(propertyId);
                            if (landProperty) {
                                [updatedRows] = await LandProperty_1.LandProperty.update({
                                    approvalStatus: 'approved',
                                    approvedAt: new Date()
                                }, {
                                    where: { id: propertyId }
                                });
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
    }
    catch (error) {
        console.error('Error approving property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve property',
            error: error.message
        });
    }
};
exports.approveProperty = approveProperty;
const rejectProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        let updatedRows = 0;
        let tableName = '';
        let propertyExists = await SaleProperty_1.SaleProperty.findByPk(propertyId);
        if (propertyExists) {
            [updatedRows] = await SaleProperty_1.SaleProperty.update({
                approvalStatus: 'rejected'
            }, {
                where: { id: propertyId }
            });
            tableName = 'sale';
        }
        else {
            const rentProperty = await RentProperty_1.RentProperty.findByPk(propertyId);
            if (rentProperty) {
                [updatedRows] = await RentProperty_1.RentProperty.update({
                    approvalStatus: 'rejected'
                }, {
                    where: { id: propertyId }
                });
                tableName = 'rent';
            }
            else {
                const leaseProperty = await LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                if (leaseProperty) {
                    [updatedRows] = await LeaseProperty_1.LeaseProperty.update({
                        approvalStatus: 'rejected'
                    }, {
                        where: { id: propertyId }
                    });
                    tableName = 'lease';
                }
                else {
                    const pgProperty = await PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        [updatedRows] = await PgProperty_1.PgProperty.update({
                            approvalStatus: 'rejected'
                        }, {
                            where: { id: propertyId }
                        });
                        tableName = 'pg';
                    }
                    else {
                        const commercialProperty = await CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                        if (commercialProperty) {
                            [updatedRows] = await CommercialProperty_1.CommercialProperty.update({
                                approvalStatus: 'rejected'
                            }, {
                                where: { id: propertyId }
                            });
                            tableName = 'commercial';
                        }
                        else {
                            const landProperty = await LandProperty_1.LandProperty.findByPk(propertyId);
                            if (landProperty) {
                                [updatedRows] = await LandProperty_1.LandProperty.update({
                                    approvalStatus: 'rejected'
                                }, {
                                    where: { id: propertyId }
                                });
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
    }
    catch (error) {
        console.error('Error rejecting property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject property',
            error: error.message
        });
    }
};
exports.rejectProperty = rejectProperty;
const getUserProperties = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User properties not applicable - properties are managed by admin',
            data: []
        });
    }
    catch (error) {
        console.error('Error fetching user properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user properties',
            error: error.message
        });
    }
};
exports.getUserProperties = getUserProperties;
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        const propertyType = req.query.type;
        const { title, description, price, location, address, city, state, zipCode, country, propertyStatus, bedrooms, bathrooms, area, amenities, contactName, contactEmail, contactPhone, fieldVisibility, imageVisibility, isVerified, existingImages } = req.body;
        const newImages = req.files?.map((file) => file.path) || [];
        let images = newImages;
        if (existingImages) {
            const parsedExisting = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
            images = [...parsedExisting, ...newImages];
        }
        const commonFields = {
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
        if (images.length > 0) {
            commonFields.images = images;
        }
        if (typeof isVerified === 'boolean' && isVerified) {
            commonFields.verifiedAt = new Date();
        }
        if (propertyType) {
            switch (propertyType.toLowerCase()) {
                case 'sale':
                    const saleProperty = await SaleProperty_1.SaleProperty.findByPk(propertyId);
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
                    const rentProperty = await RentProperty_1.RentProperty.findByPk(propertyId);
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
                    const leaseProperty = await LeaseProperty_1.LeaseProperty.findByPk(propertyId);
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
                    const pgProperty = await PgProperty_1.PgProperty.findByPk(propertyId);
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
                    const commercialProperty = await CommercialProperty_1.CommercialProperty.findByPk(propertyId);
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
                    const landProperty = await LandProperty_1.LandProperty.findByPk(propertyId);
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
        const tables = [
            { model: SaleProperty_1.SaleProperty, name: 'sale' },
            { model: RentProperty_1.RentProperty, name: 'rent' },
            { model: LeaseProperty_1.LeaseProperty, name: 'lease' },
            { model: PgProperty_1.PgProperty, name: 'pg' },
            { model: CommercialProperty_1.CommercialProperty, name: 'commercial' },
            { model: LandProperty_1.LandProperty, name: 'land' }
        ];
        for (const table of tables) {
            try {
                const property = await table.model.findByPk(propertyId);
                if (property) {
                    await property.update(commonFields);
                    res.status(200).json({
                        success: true,
                        message: `${table.name.charAt(0).toUpperCase() + table.name.slice(1)} property updated successfully`,
                        data: property
                    });
                    return;
                }
            }
            catch (err) {
                continue;
            }
        }
        res.status(404).json({
            success: false,
            message: 'Property not found in any table'
        });
    }
    catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update property',
            error: error.message
        });
    }
};
exports.updateProperty = updateProperty;
const updateApprovalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        const propertyType = req.query.type;
        const { approvalStatus } = req.body;
        if (!approvalStatus || !['pending', 'approved', 'rejected'].includes(approvalStatus)) {
            res.status(400).json({
                success: false,
                message: 'Invalid approval status. Must be pending, approved, or rejected.'
            });
            return;
        }
        if (propertyType) {
            switch (propertyType.toLowerCase()) {
                case 'sale':
                    const saleProperty = await SaleProperty_1.SaleProperty.findByPk(propertyId);
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
                    const rentProperty = await RentProperty_1.RentProperty.findByPk(propertyId);
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
                    const leaseProperty = await LeaseProperty_1.LeaseProperty.findByPk(propertyId);
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
                    const pgProperty = await PgProperty_1.PgProperty.findByPk(propertyId);
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
                    const commercialProperty = await CommercialProperty_1.CommercialProperty.findByPk(propertyId);
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
                    const landProperty = await LandProperty_1.LandProperty.findByPk(propertyId);
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
        const tables = [
            { model: SaleProperty_1.SaleProperty, name: 'sale' },
            { model: RentProperty_1.RentProperty, name: 'rent' },
            { model: LeaseProperty_1.LeaseProperty, name: 'lease' },
            { model: PgProperty_1.PgProperty, name: 'pg' },
            { model: CommercialProperty_1.CommercialProperty, name: 'commercial' },
            { model: LandProperty_1.LandProperty, name: 'land' }
        ];
        for (const table of tables) {
            try {
                const property = await table.model.findByPk(propertyId);
                if (property) {
                    await property.update({ approvalStatus });
                    res.status(200).json({
                        success: true,
                        message: `${table.name.charAt(0).toUpperCase() + table.name.slice(1)} property approval status updated successfully`,
                        data: { ...property.toJSON(), approvalStatus }
                    });
                    return;
                }
            }
            catch (err) {
                continue;
            }
        }
        res.status(404).json({
            success: false,
            message: 'Property not found in any table'
        });
    }
    catch (error) {
        console.error('Error updating property approval status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update property approval status',
            error: error.message
        });
    }
};
exports.updateApprovalStatus = updateApprovalStatus;
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        let deletedRows = 0;
        let tableName = '';
        let propertyExists = await SaleProperty_1.SaleProperty.findByPk(propertyId);
        if (propertyExists) {
            deletedRows = await SaleProperty_1.SaleProperty.destroy({
                where: { id: propertyId }
            });
            tableName = 'sale';
        }
        else {
            const rentProperty = await RentProperty_1.RentProperty.findByPk(propertyId);
            if (rentProperty) {
                deletedRows = await RentProperty_1.RentProperty.destroy({
                    where: { id: propertyId }
                });
                tableName = 'rent';
            }
            else {
                const leaseProperty = await LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                if (leaseProperty) {
                    deletedRows = await LeaseProperty_1.LeaseProperty.destroy({
                        where: { id: propertyId }
                    });
                    tableName = 'lease';
                }
                else {
                    const pgProperty = await PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        deletedRows = await PgProperty_1.PgProperty.destroy({
                            where: { id: propertyId }
                        });
                        tableName = 'pg';
                    }
                    else {
                        const commercialProperty = await CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                        if (commercialProperty) {
                            deletedRows = await CommercialProperty_1.CommercialProperty.destroy({
                                where: { id: propertyId }
                            });
                            tableName = 'commercial';
                        }
                        else {
                            const landProperty = await LandProperty_1.LandProperty.findByPk(propertyId);
                            if (landProperty) {
                                deletedRows = await LandProperty_1.LandProperty.destroy({
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
    }
    catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete property',
            error: error.message
        });
    }
};
exports.deleteProperty = deleteProperty;
