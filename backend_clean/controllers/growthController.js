import GrowthRecord from '../models/GrowthRecord.js';
import Baby from '../models/Baby.js';
import { body, validationResult } from 'express-validator';

// Create growth record
export const createGrowthRecord = async (req, res) => {
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

    const growthRecord = new GrowthRecord(req.body);
    await growthRecord.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Growth record added successfully! 📈',
      data: growthRecord 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get all growth records for a baby
export const getGrowthRecordsByBabyId = async (req, res) => {
  try {
    const records = await GrowthRecord.find({ babyId: req.params.babyId })
      .sort({ date: -1 })
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

// Get growth record by ID
export const getGrowthRecordById = async (req, res) => {
  try {
    const record = await GrowthRecord.findById(req.params.id)
      .populate('babyId', 'babyName gender dateOfBirth');

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Growth record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
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

// Update growth record
export const updateGrowthRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const record = await GrowthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('babyId', 'babyName gender dateOfBirth');

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Growth record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Growth record updated successfully! ✏️',
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

// Delete growth record
export const deleteGrowthRecord = async (req, res) => {
  try {
    const record = await GrowthRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ 
        success: false, 
        message: 'Growth record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Growth record deleted successfully! 🗑️' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get growth chart data
export const getGrowthChartData = async (req, res) => {
  try {
    const records = await GrowthRecord.find({ babyId: req.params.babyId })
      .sort({ date: 1 })
      .select('date weight height');

    const weightData = records.map(record => ({
      date: new Date(record.date).toLocaleDateString(),
      weight: record.weight
    }));

    const heightData = records.map(record => ({
      date: new Date(record.date).toLocaleDateString(),
      height: record.height
    }));

    res.status(200).json({ 
      success: true, 
      data: { weightData, heightData }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
