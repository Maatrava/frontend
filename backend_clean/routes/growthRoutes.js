import express from 'express';
import { body } from 'express-validator';
import {
  createGrowthRecord,
  getGrowthRecordsByBabyId,
  getGrowthRecordById,
  updateGrowthRecord,
  deleteGrowthRecord,
  getGrowthChartData
} from '../controllers/growthController.js';

const router = express.Router();

// Validation middleware
const growthValidation = [
  body('babyId').notEmpty().withMessage('Baby ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('weight').isNumeric().withMessage('Weight must be a number'),
  body('height').isNumeric().withMessage('Height must be a number'),
  body('recordedBy').notEmpty().withMessage('Recorded by is required')
];

// Routes
router.post('/', growthValidation, createGrowthRecord);
router.get('/baby/:babyId', getGrowthRecordsByBabyId);
router.get('/chart/:babyId', getGrowthChartData);
router.get('/:id', getGrowthRecordById);
router.put('/:id', growthValidation, updateGrowthRecord);
router.delete('/:id', deleteGrowthRecord);

export default router;
