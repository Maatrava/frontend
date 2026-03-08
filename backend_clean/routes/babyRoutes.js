import express from 'express';
import { body } from 'express-validator';
import {
  createBaby,
  getAllBabies,
  getBabyById,
  updateBaby,
  deleteBaby,
  getBabiesByMotherId
} from '../controllers/babyController.js';

const router = express.Router();

// Validation middleware
const babyValidation = [
  body('babyId').notEmpty().withMessage('Baby ID is required'),
  body('motherId').notEmpty().withMessage('Mother ID is required'),
  body('babyName').notEmpty().withMessage('Baby name is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('birthWeight').isNumeric().withMessage('Birth weight must be a number'),
  body('birthHeight').isNumeric().withMessage('Birth height must be a number'),
  body('birthHospital').notEmpty().withMessage('Birth hospital is required'),
  body('deliveryType').isIn(['Normal', 'C-Section', 'Assisted']).withMessage('Invalid delivery type')
];

// Routes
router.post('/', babyValidation, createBaby);
router.get('/', getAllBabies);
router.get('/mother/:motherId', getBabiesByMotherId);
router.get('/:id', getBabyById);
router.put('/:id', babyValidation, updateBaby);
router.delete('/:id', deleteBaby);

export default router;
