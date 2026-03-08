import express from 'express';
import { body } from 'express-validator';
import {
  createIllnessRecord,
  getIllnessRecordsByBabyId,
  getIllnessStats,
  updateIllnessRecord,
  deleteIllnessRecord
} from '../controllers/illnessController.js';

const router = express.Router();

// Validation middleware
const illnessValidation = [
  body('babyId').notEmpty().withMessage('Baby ID is required'),
  body('illnessType').notEmpty().withMessage('Illness type is required'),
  body('symptoms').isArray({ min: 1 }).withMessage('At least one symptom is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('severity').isIn(['Mild', 'Moderate', 'Severe']).withMessage('Invalid severity')
];

// Routes
router.post('/', illnessValidation, createIllnessRecord);
router.get('/baby/:babyId', getIllnessRecordsByBabyId);
router.get('/stats/:babyId', getIllnessStats);
router.put('/:id', illnessValidation, updateIllnessRecord);
router.delete('/:id', deleteIllnessRecord);

export default router;
