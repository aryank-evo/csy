import express from "express";
import cors from "cors";
import { sequelize } from './config/database';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import propertyRoutes from './routes/propertyRoutes';
import dealerRoutes from './routes/dealerRoutes';
import abroadRoutes from './routes/abroadRoutes';
import './custom';




export const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/abroad', abroadRoutes);
app.use('/api', protectedRoutes);

// Ensure database connection on server startup
sequelize.sync().then(() => {
  console.log("Database connected!");
});