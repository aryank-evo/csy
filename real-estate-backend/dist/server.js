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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const umzug_1 = require("umzug");
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
// const upload = multer(); // Removed as we use custom upload utility
app.use("/api/auth", authRoutes_1.default);
// Remove upload.none() to allow file uploads in propertyRoutes
app.use("/api/properties", propertyRoutes_1.default);
app.use("/api", protectedRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/admin/dashboard", adminDashboardRoutes_1.default);
app.use("/api/lead", leadRoutes_1.default);
// Run pending migrations before starting the server
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Running database migrations...");
        const migrator = new umzug_1.Umzug({
            migrations: {
                glob: ["../migrations/*.js", { cwd: __dirname }],
            },
            context: {
                queryInterface: database_1.sequelize.getQueryInterface(),
                sequelize: database_1.sequelize,
            },
            storage: new umzug_1.SequelizeStorage({ sequelize: database_1.sequelize }),
            logger: console,
        });
        const pendingMigrations = yield migrator.pending();
        if (pendingMigrations.length > 0) {
            console.log(`📦 Found ${pendingMigrations.length} pending migrations, executing...`);
            yield migrator.up();
            console.log(`✅ Migrations completed successfully!`);
        }
        else {
            console.log(`✅ No pending migrations, proceeding to start server...`);
        }
        // Sync models after migrations
        yield database_1.sequelize.sync();
        console.log("📌 Database connected and ready!");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    }
    catch (error) {
        console.error("❌ Migration or startup error:", error);
        process.exit(1);
    }
});
runMigrations();
