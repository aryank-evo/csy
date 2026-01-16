import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes"; 
import adminRoutes from "./routes/adminRoutes";
import adminDashboardRoutes from "./routes/adminDashboardRoutes";
import leadRoutes from "./routes/leadRoutes";
import propertyRoutes from "./routes/propertyRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer();

app.use("/api/auth", authRoutes);
// Apply multer middleware to property routes to handle multipart/form-data
app.use("/api/properties", upload.none(), propertyRoutes);
app.use("/api", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/lead", leadRoutes);

sequelize.sync().then(() => {
  console.log("📌 Database connected!");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((error) => {
  console.error("❌ Database connection error:", error);
});
