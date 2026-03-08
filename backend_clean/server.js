import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import all routes
import babyRoutes from "./routes/babyRoutes.js";
import growthRoutes from "./routes/growthRoutes.js";
import vaccinationRoutes from "./routes/vaccinationRoutes.js";
import illnessRoutes from "./routes/illnessRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Baby Health Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/baby", babyRoutes);
app.use("/api/growth", growthRoutes);
app.use("/api/vaccination", vaccinationRoutes);
app.use("/api/illness", illnessRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/reports", reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// MongoDB Connection & Server Start
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/baby_health_tracker';
const PORT = process.env.PORT || 5000;

mongoose.set("bufferCommands", false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
    console.log(`📊 Database: ${MONGO_URI}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 API Documentation: http://localhost:${PORT}/health`);
    console.log(`👶 Baby Health Tracker API Ready!`);
  });
};

startServer();
