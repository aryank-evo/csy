"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadStatus = exports.getLeadById = exports.getAllLeads = exports.createLead = void 0;
const database_1 = require("../config/database");
const nodemailer_1 = require("../utils/nodemailer");
const createLead = async (req, res) => {
    try {
        const { name, phone, address, email, description, propertyId, propertyTitle, propertyPrice, propertyLocation, propertyType } = req.body;
        if (!name || !phone || !address || !description) {
            res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, phone, address, description',
            });
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            res.status(400).json({
                success: false,
                message: 'Phone number must be 10 digits',
            });
            return;
        }
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
        const lead = await database_1.Lead.create({
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
        try {
            await (0, nodemailer_1.sendLeadNotificationEmail)({
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
        }
        catch (emailError) {
            console.error('Failed to send lead notification email:', emailError);
        }
        res.status(201).json({
            success: true,
            message: 'Lead created successfully',
            data: lead
        });
    }
    catch (error) {
        console.error('Create lead error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the lead. Please try again.',
        });
    }
};
exports.createLead = createLead;
const getAllLeads = async (req, res) => {
    try {
        const leads = await database_1.Lead.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({
            success: true,
            data: leads
        });
    }
    catch (error) {
        console.error('Get leads error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching leads',
        });
    }
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await database_1.Lead.findByPk(id);
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
    }
    catch (error) {
        console.error('Get lead by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the lead',
        });
    }
};
exports.getLeadById = getLeadById;
const updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const lead = await database_1.Lead.findByPk(id);
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
    }
    catch (error) {
        console.error('Update lead status error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating lead status',
        });
    }
};
exports.updateLeadStatus = updateLeadStatus;
