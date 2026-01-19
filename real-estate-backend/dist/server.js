"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const adminDashboardRoutes_1 = __importDefault(require("./routes/adminDashboardRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configure multer for file uploads
const upload = (0, multer_1.default)();
app.use("/api/auth", authRoutes_1.default);
// Apply multer middleware to property routes to handle multipart/form-data
app.use("/api/properties", upload.none(), propertyRoutes_1.default);
app.use("/api", protectedRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/admin/dashboard", adminDashboardRoutes_1.default);
app.use("/api/lead", leadRoutes_1.default);
database_1.sequelize.sync().then(() => {
    console.log("📌 Database connected!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((error) => {
    console.error("❌ Database connection error:", error);
});
