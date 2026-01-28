import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import multer from "multer";
import { sequelize } from "./config/database";
import { Umzug, SequelizeStorage } from "umzug";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes"; 
import adminRoutes from "./routes/adminRoutes";
import adminDashboardRoutes from "./routes/adminDashboardRoutes";
import leadRoutes from "./routes/leadRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import cmsPageRoutes from "./routes/cmsPageRoutes";
import advertisementRoutes from "./routes/advertisementRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
// const upload = multer(); // Removed as we use custom upload utility

app.use("/api/auth", authRoutes);
// Remove upload.none() to allow file uploads in propertyRoutes
app.use("/api/properties", propertyRoutes);
app.use("/api", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/lead", leadRoutes);
app.use("/api/cms", cmsPageRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);

// Run pending migrations before starting the server
const runMigrations = async () => {
  try {
    console.log("🔄 Running database migrations...");
    
    const migrator = new Umzug({
      migrations: {
        glob: ["../migrations/*.js", { cwd: __dirname }],
        resolve: ({ name, path, context }) => {
          const migration = require(path!);
          return {
            name,
            up: async () => migration.up(context.queryInterface, context.sequelize.constructor),
            down: async () => migration.down(context.queryInterface, context.sequelize.constructor),
          };
        },
      },
      context: {
        queryInterface: sequelize.getQueryInterface(),
        sequelize,
      },
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
    
    const pendingMigrations = await migrator.pending();
    if (pendingMigrations.length > 0) {
      console.log(`📦 Found ${pendingMigrations.length} pending migrations, executing...`);
      await migrator.up();
      console.log(`✅ Migrations completed successfully!`);
    } else {
      console.log(`✅ No pending migrations, proceeding to start server...`);
    }
    
    // Sync models after migrations
    await sequelize.sync();
    console.log("📌 Database connected and ready!");
    
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Migration or startup error:", error);
    process.exit(1);
  }
};

runMigrations();
