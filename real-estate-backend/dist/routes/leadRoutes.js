"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeadController_1 = require("../controllers/LeadController");
const router = (0, express_1.Router)();
// Lead capture routes
router.post("/", (req, res) => (0, LeadController_1.submitLead)(req, res));
router.get("/check-access/:propertyId", (req, res) => (0, LeadController_1.checkLeadAccess)(req, res));
exports.default = router;
