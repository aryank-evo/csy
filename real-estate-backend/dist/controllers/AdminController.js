"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadStats = exports.exportLeads = exports.getAllLeads = exports.getPropertyStats = exports.rejectProperty = exports.approveProperty = exports.getPropertyById = exports.getAllProperties = void 0;
const Property_1 = require("../models/Property");
const SaleProperty_1 = require("../models/SaleProperty");
const RentProperty_1 = require("../models/RentProperty");
const LeaseProperty_1 = require("../models/LeaseProperty");
const PgProperty_1 = require("../models/PgProperty");
const CommercialProperty_1 = require("../models/CommercialProperty");
const LandProperty_1 = require("../models/LandProperty");
const Lead_1 = require("../models/Lead");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = require("sequelize");
const Sequelize = require('sequelize');
const getAllProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const whereClause = {};
        if (status) {
            whereClause.approvalStatus = status;
        }
        if (search) {
            whereClause.title = { [sequelize_1.Op.iLike]: `%${search}%` };
        }
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
        const offset = (Number(page) - 1) * Number(limit);
        const paginatedProperties = allProperties.slice(offset, offset + Number(limit));
        res.status(200).json({
            properties: paginatedProperties,
            totalPages: Math.ceil(allProperties.length / Number(limit)),
            currentPage: Number(page),
            total: allProperties.length
        });
    }
    catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server error while fetching properties' });
    }
};
exports.getAllProperties = getAllProperties;
const getPropertyById = async (req, res) => {
    try {
        const { id, type } = req.params;
        let property = null;
        let sourceTable;
        property = await SaleProperty_1.SaleProperty.findByPk(id);
        if (property) {
            sourceTable = 'sale_properties';
        }
        else {
            property = await RentProperty_1.RentProperty.findByPk(id);
            if (property) {
                sourceTable = 'rent_properties';
            }
            else {
                property = await LeaseProperty_1.LeaseProperty.findByPk(id);
                if (property) {
                    sourceTable = 'lease_properties';
                }
                else {
                    property = await PgProperty_1.PgProperty.findByPk(id);
                    if (property) {
                        sourceTable = 'pg_properties';
                    }
                    else {
                        property = await CommercialProperty_1.CommercialProperty.findByPk(id);
                        if (property) {
                            sourceTable = 'commercial_properties';
                        }
                        else {
                            property = await LandProperty_1.LandProperty.findByPk(id);
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
        property.setDataValue('sourceTable', sourceTable);
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Server error while fetching property' });
    }
};
exports.getPropertyById = getPropertyById;
const approveProperty = async (req, res) => {
    try {
        const { id, type } = req.params;
        const { fieldVisibility, imageVisibility, isVerified } = req.body;
        let property = await SaleProperty_1.SaleProperty.findByPk(id);
        let sourceTable;
        if (property) {
            sourceTable = 'sale_properties';
        }
        else {
            property = await RentProperty_1.RentProperty.findByPk(id);
            if (property) {
                sourceTable = 'rent_properties';
            }
            else {
                property = await LeaseProperty_1.LeaseProperty.findByPk(id);
                if (property) {
                    sourceTable = 'lease_properties';
                }
                else {
                    property = await PgProperty_1.PgProperty.findByPk(id);
                    if (property) {
                        sourceTable = 'pg_properties';
                    }
                    else {
                        property = await CommercialProperty_1.CommercialProperty.findByPk(id);
                        if (property) {
                            sourceTable = 'commercial_properties';
                        }
                        else {
                            property = await LandProperty_1.LandProperty.findByPk(id);
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
        property.approvedBy = req.user?.id;
        if (fieldVisibility) {
            if ('fieldVisibility' in property) {
                property.fieldVisibility = fieldVisibility;
            }
        }
        if (imageVisibility) {
            if ('imageVisibility' in property) {
                property.imageVisibility = imageVisibility;
            }
        }
        if (typeof isVerified === 'boolean') {
            property.isVerified = isVerified;
            if (isVerified) {
                property.verifiedAt = new Date();
            }
        }
        await property.save();
        res.status(200).json({ message: 'Property approved successfully', property });
    }
    catch (error) {
        console.error('Error approving property:', error);
        res.status(500).json({ message: 'Server error while approving property' });
    }
};
exports.approveProperty = approveProperty;
const rejectProperty = async (req, res) => {
    try {
        const { id, type } = req.params;
        const { reason, fieldVisibility, imageVisibility } = req.body;
        let property = await SaleProperty_1.SaleProperty.findByPk(id);
        let sourceTable;
        if (property) {
            sourceTable = 'sale_properties';
        }
        else {
            property = await RentProperty_1.RentProperty.findByPk(id);
            if (property) {
                sourceTable = 'rent_properties';
            }
            else {
                property = await LeaseProperty_1.LeaseProperty.findByPk(id);
                if (property) {
                    sourceTable = 'lease_properties';
                }
                else {
                    property = await PgProperty_1.PgProperty.findByPk(id);
                    if (property) {
                        sourceTable = 'pg_properties';
                    }
                    else {
                        property = await CommercialProperty_1.CommercialProperty.findByPk(id);
                        if (property) {
                            sourceTable = 'commercial_properties';
                        }
                        else {
                            property = await LandProperty_1.LandProperty.findByPk(id);
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
        property.approvedBy = req.user?.id;
        if (fieldVisibility) {
            if ('fieldVisibility' in property) {
                property.fieldVisibility = fieldVisibility;
            }
        }
        if (imageVisibility) {
            if ('imageVisibility' in property) {
                property.imageVisibility = imageVisibility;
            }
        }
        await property.save();
        res.status(200).json({ message: 'Property rejected successfully', property });
    }
    catch (error) {
        console.error('Error rejecting property:', error);
        res.status(500).json({ message: 'Server error while rejecting property' });
    }
};
exports.rejectProperty = rejectProperty;
const getPropertyStats = async (req, res) => {
    try {
        const salePropertiesCount = await SaleProperty_1.SaleProperty.count();
        const rentPropertiesCount = await RentProperty_1.RentProperty.count();
        const leasePropertiesCount = await LeaseProperty_1.LeaseProperty.count();
        const pgPropertiesCount = await PgProperty_1.PgProperty.count();
        const commercialPropertiesCount = await CommercialProperty_1.CommercialProperty.count();
        const landPropertiesCount = await LandProperty_1.LandProperty.count();
        const totalProperties = salePropertiesCount + rentPropertiesCount + leasePropertiesCount +
            pgPropertiesCount + commercialPropertiesCount + landPropertiesCount;
        const pendingSaleProperties = await SaleProperty_1.SaleProperty.count({ where: { approvalStatus: 'pending' } });
        const pendingRentProperties = await RentProperty_1.RentProperty.count({ where: { approvalStatus: 'pending' } });
        const pendingLeaseProperties = await LeaseProperty_1.LeaseProperty.count({ where: { approvalStatus: 'pending' } });
        const pendingPgProperties = await PgProperty_1.PgProperty.count({ where: { approvalStatus: 'pending' } });
        const pendingCommercialProperties = await CommercialProperty_1.CommercialProperty.count({ where: { approvalStatus: 'pending' } });
        const pendingLandProperties = await LandProperty_1.LandProperty.count({ where: { approvalStatus: 'pending' } });
        const pendingProperties = pendingSaleProperties + pendingRentProperties + pendingLeaseProperties +
            pendingPgProperties + pendingCommercialProperties + pendingLandProperties;
        const approvedSaleProperties = await SaleProperty_1.SaleProperty.count({ where: { approvalStatus: 'approved' } });
        const approvedRentProperties = await RentProperty_1.RentProperty.count({ where: { approvalStatus: 'approved' } });
        const approvedLeaseProperties = await LeaseProperty_1.LeaseProperty.count({ where: { approvalStatus: 'approved' } });
        const approvedPgProperties = await PgProperty_1.PgProperty.count({ where: { approvalStatus: 'approved' } });
        const approvedCommercialProperties = await CommercialProperty_1.CommercialProperty.count({ where: { approvalStatus: 'approved' } });
        const approvedLandProperties = await LandProperty_1.LandProperty.count({ where: { approvalStatus: 'approved' } });
        const approvedProperties = approvedSaleProperties + approvedRentProperties + approvedLeaseProperties +
            approvedPgProperties + approvedCommercialProperties + approvedLandProperties;
        const rejectedSaleProperties = await SaleProperty_1.SaleProperty.count({ where: { approvalStatus: 'rejected' } });
        const rejectedRentProperties = await RentProperty_1.RentProperty.count({ where: { approvalStatus: 'rejected' } });
        const rejectedLeaseProperties = await LeaseProperty_1.LeaseProperty.count({ where: { approvalStatus: 'rejected' } });
        const rejectedPgProperties = await PgProperty_1.PgProperty.count({ where: { approvalStatus: 'rejected' } });
        const rejectedCommercialProperties = await CommercialProperty_1.CommercialProperty.count({ where: { approvalStatus: 'rejected' } });
        const rejectedLandProperties = await LandProperty_1.LandProperty.count({ where: { approvalStatus: 'rejected' } });
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
    }
    catch (error) {
        console.error('Error fetching property stats:', error);
        res.status(500).json({ message: 'Server error while fetching property stats' });
    }
};
exports.getPropertyStats = getPropertyStats;
const getAllLeads = async (req, res) => {
    try {
        const { page = 1, limit = 10, propertyId, dateFrom, dateTo } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const whereClause = {};
        if (propertyId) {
            whereClause.propertyId = propertyId;
        }
        if (dateFrom || dateTo) {
            whereClause.createdAt = {};
            if (dateFrom) {
                whereClause.createdAt[sequelize_1.Op.gte] = new Date(dateFrom);
            }
            if (dateTo) {
                whereClause.createdAt[sequelize_1.Op.lte] = new Date(dateTo);
            }
        }
        const leads = await Lead_1.Lead.findAndCountAll({
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
    }
    catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ message: 'Server error while fetching leads' });
    }
};
exports.getAllLeads = getAllLeads;
const exportLeads = async (req, res) => {
    try {
        const leads = await Lead_1.Lead.findAll({});
        let csvContent = 'Name,Email,Phone,Property Title,Created At\n';
        leads.forEach(lead => {
            csvContent += `"${lead.name}","${lead.email}","${lead.phone}","${lead.propertyTitle || 'N/A'}","${lead.createdAt}"\n`;
        });
        const fileName = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
        const filePath = path.join(__dirname, '../../exports', fileName);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, csvContent);
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({ message: 'Error exporting leads' });
            }
            else {
                setTimeout(() => {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }, 5000);
            }
        });
    }
    catch (error) {
        console.error('Error exporting leads:', error);
        res.status(500).json({ message: 'Server error while exporting leads' });
    }
};
exports.exportLeads = exportLeads;
const getLeadStats = async (req, res) => {
    try {
        const totalLeads = await Lead_1.Lead.count();
        const Sequelize = require('sequelize');
        const leadsByUserType = await Lead_1.Lead.findAll({
            attributes: ['userType', [Sequelize.fn('COUNT', Sequelize.col('userType')), 'count']],
            group: ['userType'],
            raw: true
        });
        const leadsByProperty = await Lead_1.Lead.findAll({
            attributes: ['propertyId', [Sequelize.fn('COUNT', Sequelize.col('propertyId')), 'count']],
            group: ['propertyId'],
            include: [{
                    model: Property_1.Property,
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
    }
    catch (error) {
        console.error('Error fetching lead stats:', error);
        res.status(500).json({ message: 'Server error while fetching lead stats' });
    }
};
exports.getLeadStats = getLeadStats;
