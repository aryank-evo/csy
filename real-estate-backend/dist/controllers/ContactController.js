"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSmtpConnection = exports.sendContactForm = void 0;
const nodemailer_1 = require("../utils/nodemailer");
const sendContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message',
            });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: 'Please provide a valid email address',
            });
            return;
        }
        const result = await (0, nodemailer_1.sendContactEmail)(name, email, message);
        if (result.success) {
            res.json({
                success: true,
                message: 'Your message has been sent successfully!',
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: result.message,
            });
        }
    }
    catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending your message. Please try again.',
        });
    }
};
exports.sendContactForm = sendContactForm;
const testSmtpConnection = async (req, res) => {
    try {
        const result = await (0, nodemailer_1.verifySmtpConnection)();
        if (result.success) {
            res.json({
                success: true,
                message: result.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: result.message,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `SMTP test failed: ${error.message}`,
        });
    }
};
exports.testSmtpConnection = testSmtpConnection;
