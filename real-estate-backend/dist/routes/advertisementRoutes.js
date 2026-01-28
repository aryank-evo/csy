"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const AdvertisementController_1 = require("../controllers/AdvertisementController");
const router = express_1.default.Router();
// Public routes - anyone can view advertisements
router.get('/', AdvertisementController_1.getAllAdvertisements);
// Protected admin routes
router.get('/:id', authMiddleware_1.authenticateAdmin, AdvertisementController_1.getAdvertisementById);
router.post('/', authMiddleware_1.authenticateAdmin, AdvertisementController_1.createOrUpdateAdvertisement);
router.delete('/:id', authMiddleware_1.authenticateAdmin, AdvertisementController_1.deleteAdvertisement);
exports.default = router;
