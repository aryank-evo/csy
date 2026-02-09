"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const AdminController_1 = require("../controllers/AdminController");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateAdmin);
router.get('/overview', AdminController_1.getAllProperties);
router.get('/properties', AdminController_1.getAllProperties);
router.get('/properties/pending', (req, res) => {
    req.query.status = 'pending';
    (0, AdminController_1.getAllProperties)(req, res);
});
router.get('/properties/:id', AdminController_1.getPropertyById);
router.patch('/properties/:id/approve', AdminController_1.approveProperty);
router.patch('/properties/:id/reject', AdminController_1.rejectProperty);
exports.default = router;
