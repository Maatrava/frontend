import express from 'express';
import { body } from 'express-validator';
import {
  createVaccinationRecord,
  getVaccinationRecordsByBabyId,
  getVaccinationStats,
  updateVaccinationRecord,
  deleteVaccinationRecord
} from '../controllers/vaccinationController.js';

const router = express.Router();

// Validation middleware
const vaccinationValidation = [
  body('babyId').notEmpty().withMessage('Baby ID is required'),
  body('vaccineName').notEmpty().withMessage('Vaccine name is required'),
  body('vaccineType').isIn(['Routine', 'Optional', 'Emergency']).withMessage('Invalid vaccine type'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('status').isIn(['Scheduled', 'Completed', 'Missed', 'Postponed']).withMessage('Invalid status')
];

// Routes
router.post('/', vaccinationValidation, createVaccinationRecord);
router.get('/baby/:babyId', getVaccinationRecordsByBabyId);
router.get('/stats/:babyId', getVaccinationStats);
router.put('/:id', vaccinationValidation, updateVaccinationRecord);
router.delete('/:id', deleteVaccinationRecord);

export default router;
