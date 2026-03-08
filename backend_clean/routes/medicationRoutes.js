import express from 'express';
import { body } from 'express-validator';
import {
  createMedicationRecord,
  getMedicationRecordsByBabyId,
  getActiveMedications,
  getMedicationStats,
  updateMedicationRecord,
  deleteMedicationRecord
} from '../controllers/medicationController.js';

const router = express.Router();

// Validation middleware
const medicationValidation = [
  body('babyId').notEmpty().withMessage('Baby ID is required'),
  body('medicationName').notEmpty().withMessage('Medication name is required'),
  body('dosage').notEmpty().withMessage('Dosage is required'),
  body('frequency').notEmpty().withMessage('Frequency is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('prescribedBy').notEmpty().withMessage('Prescribed by is required'),
  body('reason').notEmpty().withMessage('Reason is required'),
  body('status').isIn(['Active', 'Completed', 'Discontinued']).withMessage('Invalid status')
];

// Routes
router.post('/', medicationValidation, createMedicationRecord);
router.get('/baby/:babyId', getMedicationRecordsByBabyId);
router.get('/active/:babyId', getActiveMedications);
router.get('/stats/:babyId', getMedicationStats);
router.put('/:id', medicationValidation, updateMedicationRecord);
router.delete('/:id', deleteMedicationRecord);

export default router;
