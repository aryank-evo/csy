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
exports.deleteDealer = exports.updateDealer = exports.createDealer = exports.getDealerById = exports.getAllDealers = void 0;
const Dealer_1 = require("../models/Dealer");
// Get all dealers (only active ones for frontend)
const getAllDealers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { active_only } = req.query;
        const whereClause = active_only === 'true' ? { is_active: true } : {};
        const dealers = yield Dealer_1.Dealer.findAll({
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
});
exports.getAllDealers = getAllDealers;
// Get single dealer by ID
const getDealerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dealer = yield Dealer_1.Dealer.findByPk(id);
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
});
exports.getDealerById = getDealerById;
// Create new dealer
const createDealer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, title, short_description, full_description, phone, email, address, is_active, display_order } = req.body;
        // Handle uploaded primary image (Cloudinary)
        let primary_image;
        if (req.file) {
            // For Cloudinary upload, the file URL is in req.file.path
            primary_image = req.file.path;
        }
        const dealer = yield Dealer_1.Dealer.create({
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
});
exports.createDealer = createDealer;
// Update existing dealer
const updateDealer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, title, short_description, full_description, phone, email, address, is_active, display_order } = req.body;
        const dealer = yield Dealer_1.Dealer.findByPk(id);
        if (!dealer) {
            res.status(404).json({
                success: false,
                message: 'Dealer not found',
            });
            return;
        }
        // Handle uploaded primary image (Cloudinary)
        let primary_image = dealer.primary_image;
        if (req.file) {
            // For Cloudinary upload, the file URL is in req.file.path
            primary_image = req.file.path;
        }
        yield dealer.update({
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
});
exports.updateDealer = updateDealer;
// Delete dealer
const deleteDealer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dealer = yield Dealer_1.Dealer.findByPk(id);
        if (!dealer) {
            res.status(404).json({
                success: false,
                message: 'Dealer not found',
            });
            return;
        }
        yield dealer.destroy();
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
});
exports.deleteDealer = deleteDealer;
