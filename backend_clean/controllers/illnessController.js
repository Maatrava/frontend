import IllnessRecord from '../models/IllnessRecord.js';
import Baby from '../models/Baby.js';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';

// Create illness record
export const createIllnessRecord = async (req, res) => {
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

    const illnessRecord = new IllnessRecord(req.body);
    await illnessRecord.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Illness record added successfully! 🤒',
      data: illnessRecord 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get all illness records for a baby
export const getIllnessRecordsByBabyId = async (req, res) => {
  try {
    const records = await IllnessRecord.find({ babyId: req.params.babyId })
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

// Get illness statistics
export const getIllnessStats = async (req, res) => {
  try {
    const stats = await IllnessRecord.aggregate([
      { $match: { babyId: new mongoose.Types.ObjectId(req.params.babyId) } },
      {
        $group: {
          _id: '$illnessType',
          count: { $sum: 1 },
          severityDistribution: {
            $push: '$severity'
          }
        }
      },
      {
        $project: {
          illnessType: '$_id',
          count: 1,
          mildCount: {
            $size: {
              $filter: {
                input: '$severityDistribution',
                cond: { $eq: ['$$this', 'Mild'] }
              }
            }
          },
          moderateCount: {
            $size: {
              $filter: {
                input: '$severityDistribution',
                cond: { $eq: ['$$this', 'Moderate'] }
              }
            }
          },
          severeCount: {
            $size: {
              $filter: {
                input: '$severityDistribution',
                cond: { $eq: ['$$this', 'Severe'] }
              }
            }
          }
        }
      }
    ]);

    res.status(200).json({ 
      success: true, 
      data: stats 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update illness record
export const updateIllnessRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const record = await IllnessRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('babyId', 'babyName gender dateOfBirth');

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Illness record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Illness record updated successfully! ✏️',
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

// Delete illness record
export const deleteIllnessRecord = async (req, res) => {
  try {
    const record = await IllnessRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Illness record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Illness record deleted successfully! 🗑️' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
