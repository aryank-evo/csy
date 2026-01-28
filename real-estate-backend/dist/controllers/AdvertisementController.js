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
exports.deleteAdvertisement = exports.createOrUpdateAdvertisement = exports.getAdvertisementById = exports.getAllAdvertisements = void 0;
const database_1 = require("../config/database");
const getAllAdvertisements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advertisements = yield database_1.Advertisement.findAll({
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
});
exports.getAllAdvertisements = getAllAdvertisements;
const getAdvertisementById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const advertisement = yield database_1.Advertisement.findByPk(id);
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
});
exports.getAdvertisementById = getAdvertisementById;
const createOrUpdateAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, iframe1_url, iframe2_url, iframe3_url } = req.body;
        if (id) {
            // Update existing advertisement
            const advertisement = yield database_1.Advertisement.findByPk(id);
            if (!advertisement) {
                res.status(404).json({
                    success: false,
                    message: 'Advertisement not found',
                });
                return;
            }
            yield advertisement.update({
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
            // Create new advertisement (or update if one exists)
            const existingAds = yield database_1.Advertisement.findAll();
            if (existingAds.length > 0) {
                // Update the first advertisement record
                const advertisement = existingAds[0];
                yield advertisement.update({
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
                const advertisement = yield database_1.Advertisement.create({
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
});
exports.createOrUpdateAdvertisement = createOrUpdateAdvertisement;
const deleteAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const advertisement = yield database_1.Advertisement.findByPk(id);
        if (!advertisement) {
            res.status(404).json({
                success: false,
                message: 'Advertisement not found',
            });
            return;
        }
        yield advertisement.destroy();
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
});
exports.deleteAdvertisement = deleteAdvertisement;
