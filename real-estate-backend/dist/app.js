"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const dealerRoutes_1 = __importDefault(require("./routes/dealerRoutes"));
const abroadRoutes_1 = __importDefault(require("./routes/abroadRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
require("./custom");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/auth', authRoutes_1.default);
exports.app.use('/api/properties', propertyRoutes_1.default);
exports.app.use('/api/dealers', dealerRoutes_1.default);
exports.app.use('/api/abroad', abroadRoutes_1.default);
exports.app.use('/api/contact', contactRoutes_1.default);
exports.app.use('/api', protectedRoutes_1.default);
database_1.sequelize.sync().then(() => {
    console.log("Database connected!");
});
