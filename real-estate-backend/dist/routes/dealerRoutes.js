"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DealerController_1 = require("../controllers/DealerController");
const dealerCloudinary_1 = require("../utils/dealerCloudinary");
const router = (0, express_1.Router)();
// Public routes
router.get('/', DealerController_1.getAllDealers);
router.get('/:id', DealerController_1.getDealerById);
// Protected routes (require authentication)
router.post('/', dealerCloudinary_1.dealerUpload.single('primary_image'), DealerController_1.createDealer);
router.put('/:id', dealerCloudinary_1.dealerUpload.single('primary_image'), DealerController_1.updateDealer);
router.delete('/:id', DealerController_1.deleteDealer);
exports.default = router;
