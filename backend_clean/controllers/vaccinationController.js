import VaccinationRecord from '../models/VaccinationRecord.js';
import Baby from '../models/Baby.js';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';

// Create vaccination record
export const createVaccinationRecord = async (req, res) => {
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

    const vaccination = new VaccinationRecord(req.body);
    await vaccination.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Vaccination record added successfully! 💉',
      data: vaccination 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get all vaccination records for a baby
export const getVaccinationRecordsByBabyId = async (req, res) => {
  try {
    const records = await VaccinationRecord.find({ babyId: req.params.babyId })
      .sort({ scheduledDate: -1 })
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

// Get vaccination statistics
export const getVaccinationStats = async (req, res) => {
  try {
    const stats = await VaccinationRecord.aggregate([
      { $match: { babyId: new mongoose.Types.ObjectId(req.params.babyId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      completed: 0,
      scheduled: 0,
      missed: 0,
      postponed: 0
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

// Update vaccination record
export const updateVaccinationRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const record = await VaccinationRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('babyId', 'babyName gender dateOfBirth');

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vaccination record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Vaccination record updated successfully! ✏️',
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

// Delete vaccination record
export const deleteVaccinationRecord = async (req, res) => {
  try {
    const record = await VaccinationRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vaccination record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Vaccination record deleted successfully! 🗑️' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
