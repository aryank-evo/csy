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
exports.checkLeadAccess = exports.submitLead = void 0;
const Lead_1 = require("../models/Lead");
const Property_1 = require("../models/Property");
// Submit lead before property access
const submitLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, phone, userType, propertyId } = req.body;
        // Validate required fields
        if (!name || !email || !phone || !userType || !propertyId) {
            res.status(400).json({
                message: 'Name, email, phone, user type, and property ID are required'
            });
            return;
        }
        // Validate property exists and is approved
        const property = yield Property_1.Property.findByPk(propertyId);
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        if (property.approvalStatus !== 'approved') {
            res.status(400).json({ message: 'Property is not approved for viewing' });
            return;
        }
        // Create lead record
        const newLead = new Lead_1.Lead();
        newLead.name = name;
        newLead.email = email;
        newLead.phone = phone;
        newLead.userType = userType;
        newLead.propertyId = propertyId;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
            newLead.userId = req.user.id;
        }
        const lead = yield newLead.save();
        res.status(201).json({
            message: 'Lead submitted successfully',
            leadId: lead.id
        });
    }
    catch (error) {
        console.error('Error submitting lead:', error);
        res.status(500).json({ message: 'Server error while submitting lead' });
    }
});
exports.submitLead = submitLead;
// Check if user has submitted lead for property
const checkLeadAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { propertyId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // From auth middleware
        // If user is not logged in, check by email from request body
        if (!userId) {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ message: 'User identification required' });
                return;
            }
            const lead = yield Lead_1.Lead.findOne({
                where: {
                    propertyId: parseInt(propertyId),
                    email
                }
            });
            res.status(200).json({ hasAccess: !!lead });
            return;
        }
        // If user is logged in, check by user ID
        const lead = yield Lead_1.Lead.findOne({
            where: {
                propertyId: parseInt(propertyId),
                userId
            }
        });
        res.status(200).json({ hasAccess: !!lead });
    }
    catch (error) {
        console.error('Error checking lead access:', error);
        res.status(500).json({ message: 'Server error while checking lead access' });
    }
});
exports.checkLeadAccess = checkLeadAccess;
