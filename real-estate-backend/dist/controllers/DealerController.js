"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealer = exports.updateDealer = exports.createDealer = exports.getDealerById = exports.getAllDealers = void 0;
const Dealer_1 = require("../models/Dealer");
const getAllDealers = async (req, res) => {
    try {
        const { active_only } = req.query;
        const whereClause = active_only === 'true' ? { is_active: true } : {};
        const dealers = await Dealer_1.Dealer.findAll({
            where: whereClause,
            order: [['display_order', 'ASC'], ['created_at', 'DESC']],
        });
        res.json({
            success: true,
            data: dealers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dealers',
            error: error.message,
        });
    }
};
exports.getAllDealers = getAllDealers;
const getDealerById = async (req, res) => {
    try {
        const { id } = req.params;
        const dealer = await Dealer_1.Dealer.findByPk(id);
        if (!dealer) {
            res.status(404).json({
                success: false,
                message: 'Dealer not found',
            });
            return;
        }
        res.json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dealer',
            error: error.message,
        });
    }
};
exports.getDealerById = getDealerById;
const createDealer = async (req, res) => {
    try {
        const { name, title, short_description, full_description, phone, email, address, is_active, display_order } = req.body;
        let primary_image;
        if (req.file) {
            primary_image = req.file.path;
        }
        const dealer = await Dealer_1.Dealer.create({
            name,
            title,
            short_description,
            full_description,
            primary_image,
            phone,
            email,
            address,
            is_active: is_active !== undefined ? is_active : true,
            display_order: display_order || 0,
        });
        res.status(201).json({
            success: true,
            message: 'Dealer created successfully',
            data: dealer,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating dealer',
            error: error.message,
        });
    }
};
exports.createDealer = createDealer;
const updateDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, short_description, full_description, phone, email, address, is_active, display_order } = req.body;
        const dealer = await Dealer_1.Dealer.findByPk(id);
        if (!dealer) {
            res.status(404).json({
                success: false,
                message: 'Dealer not found',
            });
            return;
        }
        let primary_image = dealer.primary_image;
        if (req.file) {
            primary_image = req.file.path;
        }
        await dealer.update({
            name,
            title,
            short_description,
            full_description,
            primary_image,
            phone,
            email,
            address,
            is_active,
            display_order,
        });
        res.json({
            success: true,
            message: 'Dealer updated successfully',
            data: dealer,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating dealer',
            error: error.message,
        });
    }
};
exports.updateDealer = updateDealer;
const deleteDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const dealer = await Dealer_1.Dealer.findByPk(id);
        if (!dealer) {
            res.status(404).json({
                success: false,
                message: 'Dealer not found',
            });
            return;
        }
        await dealer.destroy();
        res.json({
            success: true,
            message: 'Dealer deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting dealer',
            error: error.message,
        });
    }
};
exports.deleteDealer = deleteDealer;
