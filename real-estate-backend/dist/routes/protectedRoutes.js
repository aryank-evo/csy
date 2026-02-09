"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateUser);
router.get('/my-leads', async (req, res) => {
    try {
        const leads = await models_1.Lead.findAll({
            where: {
                email: req.user.email
            },
            order: [['createdAt', 'DESC']]
        });
        res.json({
            success: true,
            data: leads
        });
    }
    catch (error) {
        console.error('Get user leads error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching your leads',
        });
    }
});
router.get('/property/:id/check-access', async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await models_1.Lead.findOne({
            where: {
                propertyId: parseInt(id),
                email: req.user.email
            }
        });
        if (!lead) {
            res.json({
                success: true,
                canAccess: false,
                message: 'Please submit a lead to view property details'
            });
        }
        else {
            res.json({
                success: true,
                canAccess: true,
                message: 'Access granted'
            });
        }
    }
    catch (error) {
        console.error('Check access error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while checking access',
        });
    }
});
exports.default = router;
