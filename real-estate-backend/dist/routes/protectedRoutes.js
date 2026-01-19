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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const Property_1 = require("../models/Property");
const Lead_1 = require("../models/Lead");
const authMiddleware_1 = require("../middleware/authMiddleware");
const PropertyController_1 = require("../controllers/PropertyController");
const router = (0, express_1.Router)();
router.get("/profile", authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = yield User_1.User.findByPk(req.user.id, {
            attributes: ["name", "email", "firstName", "lastName", "phoneNumber", "about"]
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
router.put("/profile", authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { firstName, lastName, phoneNumber, about } = req.body;
        if (!firstName || !lastName || !phoneNumber || !about) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }
        yield User_1.User.update({ firstName, lastName, phoneNumber, about }, { where: { id: req.user.id } });
        res.json({ message: "Profile updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
// Get property details with lead access check
router.get("/properties/:id", authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Get the property
        const property = yield Property_1.Property.findByPk(id);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        // Check if property is approved
        if (property.approvalStatus !== "approved") {
            res.status(404).json({ message: "Property not found" }); // Don't reveal pending/rejected properties
            return;
        }
        // Check if user has submitted lead for this property
        const lead = yield Lead_1.Lead.findOne({
            where: {
                propertyId: parseInt(id),
                userId: req.user.id
            }
        });
        // If user hasn't submitted lead, hide contact information
        if (!lead) {
            // Return property without owner contact info
            const _a = property.toJSON(), { createdAt, updatedAt } = _a, propertyData = __rest(_a, ["createdAt", "updatedAt"]);
            // Omit sensitive contact fields if no lead submitted
            res.json(Object.assign(Object.assign({}, propertyData), { contactInfoHidden: true, message: "Submit lead form to view contact information" }));
        }
        else {
            // User has submitted lead, return full property details
            res.json(property);
        }
    }
    catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ message: "Server error while fetching property" });
    }
}));
// Create new property route moved to public routes
// router.post("/properties", authenticateUser, createProperty);
// Get user's properties
router.get("/my-properties", authMiddleware_1.authenticateUser, PropertyController_1.getUserProperties);
// Get all properties (filtered by approval status)
router.get("/properties", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Property_1.Property.findAll({
            where: { approvalStatus: "approved" },
            order: [["createdAt", "DESC"]]
        });
        res.json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Server error while fetching properties" });
    }
}));
exports.default = router;
