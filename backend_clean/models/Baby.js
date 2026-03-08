import mongoose from 'mongoose';

const babySchema = new mongoose.Schema({
  babyId: {
    type: String,
    required: true,
    unique: true
  },
  motherId: {
    type: String,
    required: true
  },
  babyName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  birthWeight: {
    type: Number,
    required: true,
    min: 0
  },
  birthHeight: {
    type: Number,
    required: true,
    min: 0
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  birthHospital: {
    type: String,
    required: true
  },
  deliveryType: {
    type: String,
    enum: ['Normal', 'C-Section', 'Assisted']
  },
  complications: {
    type: String,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
babySchema.index({ babyId: 1 });
babySchema.index({ motherId: 1 });
babySchema.index({ babyName: 1 });

// Update timestamp on save
babySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Baby = mongoose.model('Baby', babySchema);

export default Baby;
