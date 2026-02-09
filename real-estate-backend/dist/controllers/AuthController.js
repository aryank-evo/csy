"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const getSecretKey = () => process.env.JWT_SECRET || "fallback_secret_key";
const signup = async (req, res) => {
    try {
        const { name, email, password, termsAccepted } = req.body;
        console.log("Received Data:", req.body);
        if (!termsAccepted) {
            res.status(400).json({ error: "You must accept the terms and conditions" });
            return;
        }
        const existingUser = await User_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.User.create({ name, email, password: hashedPassword, termsAccepted });
        res.status(201).json({ message: "User created successfully!", user });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Error creating user", details: error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        console.log("Login attempt:", req.body);
        const { email, password } = req.body;
        const [users] = await database_1.sequelize.query('SELECT id, email, password, "isAdmin" FROM users WHERE email = ?', { replacements: [email], type: sequelize_1.QueryTypes.SELECT });
        console.log("Users found:", users);
        if (!users) {
            console.log("User not found for email:", email);
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const user = users;
        console.log("Selected user:", user);
        console.log("User data:", {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        });
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, getSecretKey(), { expiresIn: "24h" });
        console.log("JWT token created successfully");
        res.json({
            message: "Login successful!",
            token,
            user: {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                name: user.name || user.email.split('@')[0]
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Error logging in" });
    }
};
exports.login = login;
