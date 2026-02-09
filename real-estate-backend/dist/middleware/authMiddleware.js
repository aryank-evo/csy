"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const getSecretKey = () => process.env.JWT_SECRET || "fallback_secret_key";
const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, getSecretKey());
        const user = await database_1.User.findByPk(decoded.id);
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Auth error:", error);
        res.status(400).json({ error: "Invalid token" });
    }
};
exports.authenticateUser = authenticateUser;
const authenticateAdmin = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, getSecretKey());
        const user = await database_1.User.findByPk(decoded.id);
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }
        if (!user.isAdmin) {
            res.status(403).json({ error: "Access denied. Admin privileges required." });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Admin auth error:", error);
        res.status(400).json({ error: "Invalid token" });
    }
};
exports.authenticateAdmin = authenticateAdmin;
