import mongoose from 'mongoose';

const medicationRecordSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true
  },
  medicationName: {
    type: String,
    required: true,
    maxlength: 100
  },
  dosage: {
    type: String,
    required: true,
    maxlength: 50
  },
  frequency: {
    type: String,
    required: true,
    maxlength: 100
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  prescribedBy: {
    type: String,
    required: true,
    maxlength: 100
  },
  reason: {
    type: String,
    required: true,
    maxlength: 500
  },
  instructions: {
    type: String,
    maxlength: 1000
  },
  sideEffects: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Completed', 'Discontinued'],
    default: 'Active'
  },
  nextDoseTime: {
    type: Date
  },
  totalDoses: {
    type: Number,
    min: 1
  },
  dosesTaken: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
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

// Indexes for efficient queries
medicationRecordSchema.index({ babyId: 1, startDate: -1 });
medicationRecordSchema.index({ babyId: 1, status: 1 });

// Update timestamp on save
medicationRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const MedicationRecord = mongoose.model('MedicationRecord', medicationRecordSchema);

export default MedicationRecord;
