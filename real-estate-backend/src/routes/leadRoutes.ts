import { Router } from "express";
import { submitLead, checkLeadAccess } from "../controllers/LeadController";

const router = Router();

// Lead capture routes
router.post("/", (req, res) => submitLead(req, res));
router.get("/check-access/:propertyId", (req, res) => checkLeadAccess(req, res));

export default router;