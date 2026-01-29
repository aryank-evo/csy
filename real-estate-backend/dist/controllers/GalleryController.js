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
exports.reorderGallerySections = exports.deleteGallerySection = exports.updateGallerySection = exports.createGallerySection = exports.getAllGallerySections = void 0;
const GallerySection_1 = require("../models/GallerySection");
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const getAllGallerySections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield GallerySection_1.GallerySection.findAll({
            order: [['order', 'ASC']]
        });
        res.status(200).json({
            success: true,
            data: sections
        });
    }
    catch (error) {
        console.error('Error fetching gallery sections:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch gallery sections',
            error: error.message
        });
    }
});
exports.getAllGallerySections = getAllGallerySections;
const createGallerySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { heading, description, youtube_links = [] } = req.body;
        if (!heading) {
            res.status(400).json({
                success: false,
                message: 'Heading is required'
            });
            return;
        }
        // Get the highest order and add 1
        const lastSection = yield GallerySection_1.GallerySection.findOne({
            order: [['order', 'DESC']]
        });
        const order = ((lastSection === null || lastSection === void 0 ? void 0 : lastSection.order) || 0) + 1;
        const section = yield GallerySection_1.GallerySection.create({
            heading,
            description: description || null,
            youtube_links: Array.isArray(youtube_links) ? youtube_links.filter(link => link.trim()) : [],
            order
        });
        res.status(201).json({
            success: true,
            message: 'Gallery section created successfully',
            data: section
        });
    }
    catch (error) {
        console.error('Error creating gallery section:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create gallery section',
            error: error.message
        });
    }
});
exports.createGallerySection = createGallerySection;
const updateGallerySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { heading, description, youtube_links = [] } = req.body;
        if (!heading) {
            res.status(400).json({
                success: false,
                message: 'Heading is required'
            });
            return;
        }
        const section = yield GallerySection_1.GallerySection.findByPk(id);
        if (!section) {
            res.status(404).json({
                success: false,
                message: 'Gallery section not found'
            });
            return;
        }
        yield section.update({
            heading,
            description: description || null,
            youtube_links: Array.isArray(youtube_links) ? youtube_links.filter(link => link.trim()) : []
        });
        res.status(200).json({
            success: true,
            message: 'Gallery section updated successfully',
            data: section
        });
    }
    catch (error) {
        console.error('Error updating gallery section:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update gallery section',
            error: error.message
        });
    }
});
exports.updateGallerySection = updateGallerySection;
const deleteGallerySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const section = yield GallerySection_1.GallerySection.findByPk(id);
        if (!section) {
            res.status(404).json({
                success: false,
                message: 'Gallery section not found'
            });
            return;
        }
        // Reorder remaining sections
        const deletedOrder = section.order;
        yield GallerySection_1.GallerySection.update({ order: database_1.sequelize.literal(`"order" - 1`) }, { where: { order: { [sequelize_1.Op.gt]: deletedOrder } } });
        yield section.destroy();
        res.status(200).json({
            success: true,
            message: 'Gallery section deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting gallery section:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete gallery section',
            error: error.message
        });
    }
});
exports.deleteGallerySection = deleteGallerySection;
const reorderGallerySections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sections } = req.body; // Array of { id, order }
        if (!Array.isArray(sections)) {
            res.status(400).json({
                success: false,
                message: 'Sections array is required'
            });
            return;
        }
        for (const item of sections) {
            yield GallerySection_1.GallerySection.update({ order: item.order }, { where: { id: item.id } });
        }
        const updated = yield GallerySection_1.GallerySection.findAll({
            order: [['order', 'ASC']]
        });
        res.status(200).json({
            success: true,
            message: 'Gallery sections reordered successfully',
            data: updated
        });
    }
    catch (error) {
        console.error('Error reordering gallery sections:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reorder gallery sections',
            error: error.message
        });
    }
});
exports.reorderGallerySections = reorderGallerySections;
