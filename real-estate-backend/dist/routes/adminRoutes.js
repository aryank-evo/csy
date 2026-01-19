"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminAuthController_1 = require("../controllers/AdminAuthController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const AdminController_1 = require("../controllers/AdminController");
const router = (0, express_1.Router)();
// Admin authentication
router.post('/login', AdminAuthController_1.adminLogin);
// Admin routes (require authentication)
router.get('/properties', authMiddleware_1.authenticateAdmin, AdminController_1.getAllProperties);
router.get('/properties/:id', authMiddleware_1.authenticateAdmin, AdminController_1.getPropertyById);
router.patch('/properties/:id/approve', authMiddleware_1.authenticateAdmin, AdminController_1.approveProperty);
router.patch('/properties/:id/reject', authMiddleware_1.authenticateAdmin, AdminController_1.rejectProperty);
router.get('/stats', authMiddleware_1.authenticateAdmin, AdminController_1.getPropertyStats);
// Leads management
router.get('/leads', authMiddleware_1.authenticateAdmin, AdminController_1.getAllLeads);
router.get('/leads/export', authMiddleware_1.authenticateAdmin, AdminController_1.exportLeads);
router.get('/leads/stats', authMiddleware_1.authenticateAdmin, AdminController_1.getLeadStats);
exports.default = router;
