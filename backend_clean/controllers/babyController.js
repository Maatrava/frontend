import Baby from '../models/Baby.js';
import { body, validationResult } from 'express-validator';

// Create baby
export const createBaby = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const baby = new Baby(req.body);
    await baby.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Baby created successfully! 🎉',
      data: baby 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Baby ID already exists' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get all babies
export const getAllBabies = async (req, res) => {
  try {
    const babies = await Baby.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: babies 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get baby by ID
export const getBabyById = async (req, res) => {
  try {
    const baby = await Baby.findById(req.params.id);
    
    if (!baby) {
      return res.status(404).json({ 
        success: false, 
        message: 'Baby not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: baby 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update baby
export const updateBaby = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const baby = await Baby.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!baby) {
      return res.status(404).json({ 
        success: false, 
        message: 'Baby not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Baby updated successfully! ✏️',
      data: baby 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete baby
export const deleteBaby = async (req, res) => {
  try {
    const baby = await Baby.findByIdAndDelete(req.params.id);
    
    if (!baby) {
      return res.status(404).json({ 
        success: false, 
        message: 'Baby not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Baby deleted successfully! 🗑️' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get babies by mother ID
export const getBabiesByMotherId = async (req, res) => {
  try {
    const babies = await Baby.find({ motherId: req.params.motherId }).sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: babies 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
