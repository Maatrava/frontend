import MedicationRecord from '../models/MedicationRecord.js';
import Baby from '../models/Baby.js';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';

// Create medication record
export const createMedicationRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    // Validate baby exists
    const baby = await Baby.findById(req.body.babyId);
    if (!baby) {
      return res.status(404).json({ 
        success: false, 
        message: 'Baby not found' 
      });
    }

    const medication = new MedicationRecord(req.body);
    await medication.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Medication record added successfully! 💊',
      data: medication 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get all medication records for a baby
export const getMedicationRecordsByBabyId = async (req, res) => {
  try {
    const records = await MedicationRecord.find({ babyId: req.params.babyId })
      .sort({ startDate: -1 })
      .populate('babyId', 'babyName gender dateOfBirth');

    res.status(200).json({ 
      success: true, 
      data: records 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get active medications
export const getActiveMedications = async (req, res) => {
  try {
    const active = await MedicationRecord.find({
      babyId: req.params.babyId,
      status: 'Active'
    })
    .sort({ startDate: -1 })
    .populate('babyId', 'babyName gender dateOfBirth');

    res.status(200).json({ 
      success: true, 
      data: active 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get medication statistics
export const getMedicationStats = async (req, res) => {
  try {
    const stats = await MedicationRecord.aggregate([
      { $match: { babyId: new mongoose.Types.ObjectId(req.params.babyId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      active: 0,
      completed: 0,
      discontinued: 0
    };

    stats.forEach(stat => {
      result[stat._id.toLowerCase()] = stat.count;
    });

    res.status(200).json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update medication record
export const updateMedicationRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const record = await MedicationRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('babyId', 'babyName gender dateOfBirth');

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Medication record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Medication record updated successfully! ✏️',
      data: record 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete medication record
export const deleteMedicationRecord = async (req, res) => {
  try {
    const record = await MedicationRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Medication record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Medication record deleted successfully! 🗑️' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
