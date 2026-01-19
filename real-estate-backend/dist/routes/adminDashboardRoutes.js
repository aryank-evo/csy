"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const AdminController_1 = require("../controllers/AdminController");
const router = express_1.default.Router();
// All admin dashboard routes require authentication
router.use(authMiddleware_1.authenticateAdmin);
// Dashboard overview - get statistics
router.get('/overview', AdminController_1.getAllProperties);
// Get all properties (approved and pending)
router.get('/properties', AdminController_1.getAllProperties);
// Get all pending properties (using getAllProperties with status filter)
router.get('/properties/pending', (req, res) => {
    req.query.status = 'pending';
    (0, AdminController_1.getAllProperties)(req, res);
});
// Get specific property details
router.get('/properties/:id', AdminController_1.getPropertyById);
// Approve property
router.patch('/properties/:id/approve', AdminController_1.approveProperty);
// Reject property
router.patch('/properties/:id/reject', AdminController_1.rejectProperty);
exports.default = router;
