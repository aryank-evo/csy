"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdvertisement = exports.createOrUpdateAdvertisement = exports.getAdvertisementById = exports.getAllAdvertisements = void 0;
const database_1 = require("../config/database");
const getAllAdvertisements = async (req, res) => {
    try {
        const advertisements = await database_1.Advertisement.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({
            success: true,
            data: advertisements,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching advertisements',
            error: error.message,
        });
    }
};
exports.getAllAdvertisements = getAllAdvertisements;
const getAdvertisementById = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await database_1.Advertisement.findByPk(id);
        if (!advertisement) {
            res.status(404).json({
                success: false,
                message: 'Advertisement not found',
            });
            return;
        }
        res.json({
            success: true,
            data: advertisement,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching advertisement',
            error: error.message,
        });
    }
};
exports.getAdvertisementById = getAdvertisementById;
const createOrUpdateAdvertisement = async (req, res) => {
    try {
        const { id, iframe1_url, iframe2_url, iframe3_url } = req.body;
        if (id) {
            const advertisement = await database_1.Advertisement.findByPk(id);
            if (!advertisement) {
                res.status(404).json({
                    success: false,
                    message: 'Advertisement not found',
                });
                return;
            }
            await advertisement.update({
                iframe1_url,
                iframe2_url,
                iframe3_url,
            });
            res.json({
                success: true,
                message: 'Advertisement updated successfully',
                data: advertisement,
            });
        }
        else {
            const existingAds = await database_1.Advertisement.findAll();
            if (existingAds.length > 0) {
                const advertisement = existingAds[0];
                await advertisement.update({
                    iframe1_url,
                    iframe2_url,
                    iframe3_url,
                });
                res.json({
                    success: true,
                    message: 'Advertisement updated successfully',
                    data: advertisement,
                });
            }
            else {
                const advertisement = await database_1.Advertisement.create({
                    name: 'Advertisement Section',
                    iframe1_url,
                    iframe2_url,
                    iframe3_url,
                });
                res.status(201).json({
                    success: true,
                    message: 'Advertisement created successfully',
                    data: advertisement,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving advertisement',
            error: error.message,
        });
    }
};
exports.createOrUpdateAdvertisement = createOrUpdateAdvertisement;
const deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await database_1.Advertisement.findByPk(id);
        if (!advertisement) {
            res.status(404).json({
                success: false,
                message: 'Advertisement not found',
            });
            return;
        }
        await advertisement.destroy();
        res.json({
            success: true,
            message: 'Advertisement deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting advertisement',
            error: error.message,
        });
    }
};
exports.deleteAdvertisement = deleteAdvertisement;
