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
exports.getLeadStats = exports.exportLeads = exports.getAllLeads = exports.getPropertyStats = exports.rejectProperty = exports.approveProperty = exports.getPropertyById = exports.getAllProperties = void 0;
const Property_1 = require("../models/Property");
const Lead_1 = require("../models/Lead");
const database_1 = require("../config/database");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = require("sequelize");
const Sequelize = require('sequelize');
// Get all properties with pagination and filtering
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const whereClause = {};
        if (status) {
            whereClause.approvalStatus = status;
        }
        if (search) {
            whereClause.title = { [sequelize_1.Op.iLike]: `%${search}%` };
        }
        const properties = yield Property_1.Property.findAndCountAll({
            where: whereClause,
            limit: Number(limit),
            offset,
            order: [['createdAt', 'DESC']],
            include: [{
                    model: database_1.User,
                    attributes: ['id', 'name', 'email']
                }]
        });
        res.status(200).json({
            properties: properties.rows,
            totalPages: Math.ceil(properties.count / Number(limit)),
            currentPage: Number(page),
            total: properties.count
        });
    }
    catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server error while fetching properties' });
    }
});
exports.getAllProperties = getAllProperties;
// Get property by ID
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield Property_1.Property.findByPk(id, {
            include: [{
                    model: database_1.User,
                    attributes: ['id', 'name', 'email']
                }, {
                    model: Lead_1.Lead,
                    attributes: ['id', 'name', 'email', 'phone', 'userType', 'createdAt']
                }]
        });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Server error while fetching property' });
    }
});
exports.getPropertyById = getPropertyById;
// Approve property
const approveProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { fieldVisibility, imageVisibility } = req.body;
        const property = yield Property_1.Property.findByPk(id);
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        property.approvalStatus = 'approved';
        // Update visibility settings if provided
        if (fieldVisibility) {
            property.fieldVisibility = fieldVisibility;
        }
        if (imageVisibility) {
            property.imageVisibility = imageVisibility;
        }
        yield property.save();
        res.status(200).json({ message: 'Property approved successfully', property });
    }
    catch (error) {
        console.error('Error approving property:', error);
        res.status(500).json({ message: 'Server error while approving property' });
    }
});
exports.approveProperty = approveProperty;
// Reject property
const rejectProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { reason, fieldVisibility, imageVisibility } = req.body;
        const property = yield Property_1.Property.findByPk(id);
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        property.approvalStatus = 'rejected';
        // Update visibility settings if provided
        if (fieldVisibility) {
            property.fieldVisibility = fieldVisibility;
        }
        if (imageVisibility) {
            property.imageVisibility = imageVisibility;
        }
        yield property.save();
        res.status(200).json({ message: 'Property rejected successfully', property });
    }
    catch (error) {
        console.error('Error rejecting property:', error);
        res.status(500).json({ message: 'Server error while rejecting property' });
    }
});
exports.rejectProperty = rejectProperty;
// Get property statistics
const getPropertyStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalProperties = yield Property_1.Property.count();
        const pendingProperties = yield Property_1.Property.count({ where: { approvalStatus: 'pending' } });
        const approvedProperties = yield Property_1.Property.count({ where: { approvalStatus: 'approved' } });
        const rejectedProperties = yield Property_1.Property.count({ where: { approvalStatus: 'rejected' } });
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
});
exports.getPropertyStats = getPropertyStats;
// Get all leads
const getAllLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const leads = yield Lead_1.Lead.findAndCountAll({
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
});
exports.getAllLeads = getAllLeads;
// Export leads to CSV
const exportLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leads = yield Lead_1.Lead.findAll({});
        // Create CSV content
        let csvContent = 'Name,Email,Phone,User Type,Property Title,Created At\n';
        leads.forEach(lead => {
            csvContent += `"${lead.name}","${lead.email}","${lead.phone}","${lead.userType}","${lead.propertyId}","${lead.createdAt}"\n`;
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
            }
            else {
                // Clean up the file after download
                setTimeout(() => {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }, 5000); // Delete file after 5 seconds
            }
        });
    }
    catch (error) {
        console.error('Error exporting leads:', error);
        res.status(500).json({ message: 'Server error while exporting leads' });
    }
});
exports.exportLeads = exportLeads;
// Get lead statistics
const getLeadStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalLeads = yield Lead_1.Lead.count();
        const Sequelize = require('sequelize');
        const leadsByUserType = yield Lead_1.Lead.findAll({
            attributes: ['userType', [Sequelize.fn('COUNT', Sequelize.col('userType')), 'count']],
            group: ['userType'],
            raw: true
        });
        const leadsByProperty = yield Lead_1.Lead.findAll({
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
});
exports.getLeadStats = getLeadStats;
