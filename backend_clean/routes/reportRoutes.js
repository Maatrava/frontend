import express from 'express';
import { generateBabyReport, getReportSummary } from '../controllers/reportController.js';

const router = express.Router();

// Routes
router.get('/baby/:babyId', generateBabyReport);
router.get('/summary/:babyId', getReportSummary);

export default router;
