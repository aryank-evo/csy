"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../utils/cloudinary");
const PropertyController_1 = require("../controllers/PropertyController");
const router = express_1.default.Router();
// Public routes - no authentication required
router.post('/', cloudinary_1.upload.array('images'), PropertyController_1.createProperty); // Create property listing with image upload
router.get('/', PropertyController_1.getAllProperties); // Get all approved properties
router.get('/all-combined', PropertyController_1.getAllPropertiesCombined); // Get ALL properties from ALL tables
router.get('/:id', PropertyController_1.getPropertyById); // Get specific approved property
router.put('/:id', cloudinary_1.upload.array('images'), PropertyController_1.updateProperty); // Update property details with image upload
router.put('/:id/status', PropertyController_1.updateApprovalStatus); // Update property approval status
// Admin routes - would require admin authentication in production
router.get('/pending/all', PropertyController_1.getAllPendingProperties); // Get all pending properties for admin
router.put('/:id/approve', PropertyController_1.approveProperty); // Approve property
router.put('/:id/reject', PropertyController_1.rejectProperty); // Reject property
router.delete('/:id', PropertyController_1.deleteProperty); // Delete property
exports.default = router;
