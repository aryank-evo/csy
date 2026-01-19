"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateApprovalStatus = exports.updateProperty = exports.getUserProperties = exports.rejectProperty = exports.approveProperty = exports.getPropertyById = exports.getAllPendingProperties = exports.getAllPropertiesCombined = exports.getAllProperties = exports.createProperty = void 0;
const SaleProperty_1 = require("../models/SaleProperty");
const RentProperty_1 = require("../models/RentProperty");
const LeaseProperty_1 = require("../models/LeaseProperty");
const PgProperty_1 = require("../models/PgProperty");
const CommercialProperty_1 = require("../models/CommercialProperty");
const LandProperty_1 = require("../models/LandProperty");
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract property data from request body
        const { title, description, price, location, address, city, state, zipCode, country, propertyType, propertyStatus, bedrooms, bathrooms, area, amenities, contactName, contactEmail, contactPhone, 
        // Sale-specific fields
        possessionStatus, propertyAge, maintenanceCharge, 
        // Rent-specific fields
        availableFrom, securityDeposit, 
        // Lease-specific fields
        leasePeriod, monthlyLeaseAmount, leaseTerms, 
        // PG-specific fields
        foodIncluded, gender, occupancy, 
        // Commercial-specific fields
        propertySubType, commercialArea, facing, 
        // Land-specific fields
        landArea, landType, utilities } = req.body;
        // Handle uploaded images from Cloudinary
        const images = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => file.path)) || [];
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
        switch (propertyType.toLowerCase()) {
            case 'sale':
            case 'sell':
                newProperty = yield SaleProperty_1.SaleProperty.create({
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
                    images,
                    approvalStatus: 'pending'
                });
                break;
            case 'rent':
                newProperty = yield RentProperty_1.RentProperty.create({
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
                    images,
                    approvalStatus: 'pending'
                });
                break;
            case 'lease':
                newProperty = yield LeaseProperty_1.LeaseProperty.create({
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
                    images,
                    approvalStatus: 'pending'
                });
                break;
            case 'pg':
            case 'hostel':
                newProperty = yield PgProperty_1.PgProperty.create({
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
                    images,
                    approvalStatus: 'pending'
                });
                break;
            case 'commercial':
                newProperty = yield CommercialProperty_1.CommercialProperty.create({
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
                    images,
                    approvalStatus: 'pending'
                });
                break;
            case 'land':
                newProperty = yield LandProperty_1.LandProperty.create({
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
                    images,
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
    }
    catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create property listing',
            error: error.message
        });
    }
});
exports.createProperty = createProperty;
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all approved properties from all property types
        const saleProperties = yield SaleProperty_1.SaleProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const rentProperties = yield RentProperty_1.RentProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const leaseProperties = yield LeaseProperty_1.LeaseProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const pgProperties = yield PgProperty_1.PgProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const commercialProperties = yield CommercialProperty_1.CommercialProperty.findAll({
            where: {
                approvalStatus: 'approved'
            },
            order: [['createdAt', 'DESC']]
        });
        const landProperties = yield LandProperty_1.LandProperty.findAll({
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
    }
    catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch properties',
            error: error.message
        });
    }
});
exports.getAllProperties = getAllProperties;
const getAllPropertiesCombined = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get ALL properties from all property types (both approved and pending)
        // Use raw queries to avoid column mismatches between different property types
        const saleProperties = yield SaleProperty_1.SaleProperty.findAll({
            order: [['createdAt', 'DESC']],
            raw: true // Use raw to avoid some attribute issues
        });
        const rentProperties = yield RentProperty_1.RentProperty.findAll({
            order: [['createdAt', 'DESC']],
            raw: true
        });
        const leaseProperties = yield LeaseProperty_1.LeaseProperty.findAll({
            order: [['createdAt', 'DESC']],
            raw: true
        });
        const pgProperties = yield PgProperty_1.PgProperty.findAll({
            order: [['createdAt', 'DESC']],
            raw: true
        });
        const commercialProperties = yield CommercialProperty_1.CommercialProperty.findAll({
            order: [['createdAt', 'DESC']],
            raw: true
        });
        const landProperties = yield LandProperty_1.LandProperty.findAll({
            order: [['createdAt', 'DESC']],
            raw: true
        });
        // Combine all properties
        const allProperties = [
            ...saleProperties.map(p => (Object.assign(Object.assign({}, p), { sourceTable: 'sale_properties' }))),
            ...rentProperties.map(p => (Object.assign(Object.assign({}, p), { sourceTable: 'rent_properties' }))),
            ...leaseProperties.map(p => (Object.assign(Object.assign({}, p), { sourceTable: 'lease_properties' }))),
            ...pgProperties.map(p => (Object.assign(Object.assign({}, p), { sourceTable: 'pg_properties' }))),
            ...commercialProperties.map(p => (Object.assign(Object.assign({}, p), { sourceTable: 'commercial_properties' }))),
            ...landProperties.map(p => (Object.assign(Object.assign({}, p), { sourceTable: 'land_properties' })))
        ];
        // Sort by date descending
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
});
exports.getAllPropertiesCombined = getAllPropertiesCombined;
const getAllPendingProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all pending properties from all property types for admin dashboard
        const saleProperties = yield SaleProperty_1.SaleProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const rentProperties = yield RentProperty_1.RentProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const leaseProperties = yield LeaseProperty_1.LeaseProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const pgProperties = yield PgProperty_1.PgProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const commercialProperties = yield CommercialProperty_1.CommercialProperty.findAll({
            where: {
                approvalStatus: 'pending'
            },
            order: [['createdAt', 'DESC']]
        });
        const landProperties = yield LandProperty_1.LandProperty.findAll({
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
    }
    catch (error) {
        console.error('Error fetching pending properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending properties',
            error: error.message
        });
    }
});
exports.getAllPendingProperties = getAllPendingProperties;
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        // Search for property in all property tables
        let property = null;
        let propertyType = null;
        // Try to find in each table
        property = yield SaleProperty_1.SaleProperty.findOne({
            where: {
                id: propertyId,
                approvalStatus: 'approved'
            }
        });
        if (property) {
            propertyType = 'sale';
        }
        else {
            property = yield RentProperty_1.RentProperty.findOne({
                where: {
                    id: propertyId,
                    approvalStatus: 'approved'
                }
            });
            if (property) {
                propertyType = 'rent';
            }
            else {
                property = yield LeaseProperty_1.LeaseProperty.findOne({
                    where: {
                        id: propertyId,
                        approvalStatus: 'approved'
                    }
                });
                if (property) {
                    propertyType = 'lease';
                }
                else {
                    property = yield PgProperty_1.PgProperty.findOne({
                        where: {
                            id: propertyId,
                            approvalStatus: 'approved'
                        }
                    });
                    if (property) {
                        propertyType = 'pg';
                    }
                    else {
                        property = yield CommercialProperty_1.CommercialProperty.findOne({
                            where: {
                                id: propertyId,
                                approvalStatus: 'approved'
                            }
                        });
                        if (property) {
                            propertyType = 'commercial';
                        }
                        else {
                            property = yield LandProperty_1.LandProperty.findOne({
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
    }
    catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch property',
            error: error.message
        });
    }
});
exports.getPropertyById = getPropertyById;
const approveProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        // Try to update in each table
        let updatedRows = 0;
        let tableName = '';
        // First, check which table the property belongs to
        let propertyExists = yield SaleProperty_1.SaleProperty.findByPk(propertyId);
        if (propertyExists) {
            [updatedRows] = yield SaleProperty_1.SaleProperty.update({
                approvalStatus: 'approved',
                approvedAt: new Date()
            }, {
                where: { id: propertyId }
            });
            tableName = 'sale';
        }
        else {
            const rentProperty = yield RentProperty_1.RentProperty.findByPk(propertyId);
            if (rentProperty) {
                [updatedRows] = yield RentProperty_1.RentProperty.update({
                    approvalStatus: 'approved',
                    approvedAt: new Date()
                }, {
                    where: { id: propertyId }
                });
                tableName = 'rent';
            }
            else {
                const leaseProperty = yield LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                if (leaseProperty) {
                    [updatedRows] = yield LeaseProperty_1.LeaseProperty.update({
                        approvalStatus: 'approved',
                        approvedAt: new Date()
                    }, {
                        where: { id: propertyId }
                    });
                    tableName = 'lease';
                }
                else {
                    const pgProperty = yield PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        [updatedRows] = yield PgProperty_1.PgProperty.update({
                            approvalStatus: 'approved',
                            approvedAt: new Date()
                        }, {
                            where: { id: propertyId }
                        });
                        tableName = 'pg';
                    }
                    else {
                        const commercialProperty = yield CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                        if (commercialProperty) {
                            [updatedRows] = yield CommercialProperty_1.CommercialProperty.update({
                                approvalStatus: 'approved',
                                approvedAt: new Date()
                            }, {
                                where: { id: propertyId }
                            });
                            tableName = 'commercial';
                        }
                        else {
                            const landProperty = yield LandProperty_1.LandProperty.findByPk(propertyId);
                            if (landProperty) {
                                [updatedRows] = yield LandProperty_1.LandProperty.update({
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
});
exports.approveProperty = approveProperty;
const rejectProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        // Try to update in each table
        let updatedRows = 0;
        let tableName = '';
        // First, check which table the property belongs to
        let propertyExists = yield SaleProperty_1.SaleProperty.findByPk(propertyId);
        if (propertyExists) {
            [updatedRows] = yield SaleProperty_1.SaleProperty.update({
                approvalStatus: 'rejected'
            }, {
                where: { id: propertyId }
            });
            tableName = 'sale';
        }
        else {
            const rentProperty = yield RentProperty_1.RentProperty.findByPk(propertyId);
            if (rentProperty) {
                [updatedRows] = yield RentProperty_1.RentProperty.update({
                    approvalStatus: 'rejected'
                }, {
                    where: { id: propertyId }
                });
                tableName = 'rent';
            }
            else {
                const leaseProperty = yield LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                if (leaseProperty) {
                    [updatedRows] = yield LeaseProperty_1.LeaseProperty.update({
                        approvalStatus: 'rejected'
                    }, {
                        where: { id: propertyId }
                    });
                    tableName = 'lease';
                }
                else {
                    const pgProperty = yield PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        [updatedRows] = yield PgProperty_1.PgProperty.update({
                            approvalStatus: 'rejected'
                        }, {
                            where: { id: propertyId }
                        });
                        tableName = 'pg';
                    }
                    else {
                        const commercialProperty = yield CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                        if (commercialProperty) {
                            [updatedRows] = yield CommercialProperty_1.CommercialProperty.update({
                                approvalStatus: 'rejected'
                            }, {
                                where: { id: propertyId }
                            });
                            tableName = 'commercial';
                        }
                        else {
                            const landProperty = yield LandProperty_1.LandProperty.findByPk(propertyId);
                            if (landProperty) {
                                [updatedRows] = yield LandProperty_1.LandProperty.update({
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
});
exports.rejectProperty = rejectProperty;
const getUserProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Since property submission is now without authentication,
        // there's no concept of user-owned properties.
        // This endpoint might be deprecated in favor of admin-only property management.
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
});
exports.getUserProperties = getUserProperties;
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        const propertyType = req.query.type; // Get property type from query param
        const { title, description, price, location, propertyStatus, contactName, contactEmail, contactPhone, existingImages // Optional: if frontend wants to keep some old images
         } = req.body;
        // Handle new uploaded images from Cloudinary
        const newImages = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => file.path)) || [];
        // Combine existing images with new ones
        let images = newImages;
        if (existingImages) {
            const parsedExisting = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
            images = [...parsedExisting, ...newImages];
        }
        // Define common fields that exist in all property types
        const commonFields = {
            title,
            description,
            price,
            location,
            propertyStatus,
            contactName,
            contactEmail,
            contactPhone
        };
        // Only update images if new ones were uploaded or existing ones were provided
        if (images.length > 0) {
            commonFields.images = images;
        }
        // If property type is specified, update that specific table
        if (propertyType) {
            switch (propertyType.toLowerCase()) {
                case 'sale':
                    const saleProperty = yield SaleProperty_1.SaleProperty.findByPk(propertyId);
                    if (saleProperty) {
                        yield saleProperty.update(commonFields);
                        res.status(200).json({
                            success: true,
                            message: 'Sale property updated successfully',
                            data: saleProperty
                        });
                        return;
                    }
                    break;
                case 'rent':
                    const rentProperty = yield RentProperty_1.RentProperty.findByPk(propertyId);
                    if (rentProperty) {
                        yield rentProperty.update(commonFields);
                        res.status(200).json({
                            success: true,
                            message: 'Rent property updated successfully',
                            data: rentProperty
                        });
                        return;
                    }
                    break;
                case 'lease':
                    const leaseProperty = yield LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                    if (leaseProperty) {
                        yield leaseProperty.update(commonFields);
                        res.status(200).json({
                            success: true,
                            message: 'Lease property updated successfully',
                            data: leaseProperty
                        });
                        return;
                    }
                    break;
                case 'pg':
                    const pgProperty = yield PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        yield pgProperty.update(commonFields);
                        res.status(200).json({
                            success: true,
                            message: 'PG property updated successfully',
                            data: pgProperty
                        });
                        return;
                    }
                    break;
                case 'commercial':
                    const commercialProperty = yield CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                    if (commercialProperty) {
                        yield commercialProperty.update(commonFields);
                        res.status(200).json({
                            success: true,
                            message: 'Commercial property updated successfully',
                            data: commercialProperty
                        });
                        return;
                    }
                    break;
                case 'land':
                    const landProperty = yield LandProperty_1.LandProperty.findByPk(propertyId);
                    if (landProperty) {
                        yield landProperty.update(commonFields);
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
            { model: SaleProperty_1.SaleProperty, name: 'sale' },
            { model: RentProperty_1.RentProperty, name: 'rent' },
            { model: LeaseProperty_1.LeaseProperty, name: 'lease' },
            { model: PgProperty_1.PgProperty, name: 'pg' },
            { model: CommercialProperty_1.CommercialProperty, name: 'commercial' },
            { model: LandProperty_1.LandProperty, name: 'land' }
        ];
        for (const table of tables) {
            try {
                // Using type assertion to handle different property types
                const property = yield table.model.findByPk(propertyId);
                if (property) {
                    yield property.update(commonFields);
                    res.status(200).json({
                        success: true,
                        message: `${table.name.charAt(0).toUpperCase() + table.name.slice(1)} property updated successfully`,
                        data: property
                    });
                    return;
                }
            }
            catch (err) {
                // Continue to the next table if there's an error
                continue;
            }
        }
        // If property not found in any table
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
});
exports.updateProperty = updateProperty;
// New function to update approval status for any property type
const updateApprovalStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        const propertyType = req.query.type; // Get property type from query param
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
            switch (propertyType.toLowerCase()) {
                case 'sale':
                    const saleProperty = yield SaleProperty_1.SaleProperty.findByPk(propertyId);
                    if (saleProperty) {
                        yield saleProperty.update({ approvalStatus });
                        res.status(200).json({
                            success: true,
                            message: 'Sale property approval status updated successfully',
                            data: Object.assign(Object.assign({}, saleProperty.toJSON()), { approvalStatus })
                        });
                        return;
                    }
                    break;
                case 'rent':
                    const rentProperty = yield RentProperty_1.RentProperty.findByPk(propertyId);
                    if (rentProperty) {
                        yield rentProperty.update({ approvalStatus });
                        res.status(200).json({
                            success: true,
                            message: 'Rent property approval status updated successfully',
                            data: Object.assign(Object.assign({}, rentProperty.toJSON()), { approvalStatus })
                        });
                        return;
                    }
                    break;
                case 'lease':
                    const leaseProperty = yield LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                    if (leaseProperty) {
                        yield leaseProperty.update({ approvalStatus });
                        res.status(200).json({
                            success: true,
                            message: 'Lease property approval status updated successfully',
                            data: Object.assign(Object.assign({}, leaseProperty.toJSON()), { approvalStatus })
                        });
                        return;
                    }
                    break;
                case 'pg':
                    const pgProperty = yield PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        yield pgProperty.update({ approvalStatus });
                        res.status(200).json({
                            success: true,
                            message: 'PG property approval status updated successfully',
                            data: Object.assign(Object.assign({}, pgProperty.toJSON()), { approvalStatus })
                        });
                        return;
                    }
                    break;
                case 'commercial':
                    const commercialProperty = yield CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                    if (commercialProperty) {
                        yield commercialProperty.update({ approvalStatus });
                        res.status(200).json({
                            success: true,
                            message: 'Commercial property approval status updated successfully',
                            data: Object.assign(Object.assign({}, commercialProperty.toJSON()), { approvalStatus })
                        });
                        return;
                    }
                    break;
                case 'land':
                    const landProperty = yield LandProperty_1.LandProperty.findByPk(propertyId);
                    if (landProperty) {
                        yield landProperty.update({ approvalStatus });
                        res.status(200).json({
                            success: true,
                            message: 'Land property approval status updated successfully',
                            data: Object.assign(Object.assign({}, landProperty.toJSON()), { approvalStatus })
                        });
                        return;
                    }
                    break;
            }
        }
        // If no property type specified, fall back to searching all tables
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
                // Using type assertion to handle different property types
                const property = yield table.model.findByPk(propertyId);
                if (property) {
                    yield property.update({ approvalStatus });
                    res.status(200).json({
                        success: true,
                        message: `${table.name.charAt(0).toUpperCase() + table.name.slice(1)} property approval status updated successfully`,
                        data: Object.assign(Object.assign({}, property.toJSON()), { approvalStatus })
                    });
                    return;
                }
            }
            catch (err) {
                // Continue to the next table if there's an error
                continue;
            }
        }
        // If property not found in any table
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
});
exports.updateApprovalStatus = updateApprovalStatus;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const propertyId = parseInt(id);
        // Try to delete from each table
        let deletedRows = 0;
        let tableName = '';
        // First, check which table the property belongs to
        let propertyExists = yield SaleProperty_1.SaleProperty.findByPk(propertyId);
        if (propertyExists) {
            deletedRows = yield SaleProperty_1.SaleProperty.destroy({
                where: { id: propertyId }
            });
            tableName = 'sale';
        }
        else {
            const rentProperty = yield RentProperty_1.RentProperty.findByPk(propertyId);
            if (rentProperty) {
                deletedRows = yield RentProperty_1.RentProperty.destroy({
                    where: { id: propertyId }
                });
                tableName = 'rent';
            }
            else {
                const leaseProperty = yield LeaseProperty_1.LeaseProperty.findByPk(propertyId);
                if (leaseProperty) {
                    deletedRows = yield LeaseProperty_1.LeaseProperty.destroy({
                        where: { id: propertyId }
                    });
                    tableName = 'lease';
                }
                else {
                    const pgProperty = yield PgProperty_1.PgProperty.findByPk(propertyId);
                    if (pgProperty) {
                        deletedRows = yield PgProperty_1.PgProperty.destroy({
                            where: { id: propertyId }
                        });
                        tableName = 'pg';
                    }
                    else {
                        const commercialProperty = yield CommercialProperty_1.CommercialProperty.findByPk(propertyId);
                        if (commercialProperty) {
                            deletedRows = yield CommercialProperty_1.CommercialProperty.destroy({
                                where: { id: propertyId }
                            });
                            tableName = 'commercial';
                        }
                        else {
                            const landProperty = yield LandProperty_1.LandProperty.findByPk(propertyId);
                            if (landProperty) {
                                deletedRows = yield LandProperty_1.LandProperty.destroy({
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
});
exports.deleteProperty = deleteProperty;
