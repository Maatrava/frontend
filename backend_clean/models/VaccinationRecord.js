import mongoose from 'mongoose';

const vaccinationRecordSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true
  },
  vaccineName: {
    type: String,
    required: true,
    maxlength: 100
  },
  vaccineType: {
    type: String,
    required: true,
    enum: ['Routine', 'Optional', 'Emergency']
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  administeredDate: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Completed', 'Missed', 'Postponed'],
    default: 'Scheduled'
  },
  administeredBy: {
    type: String,
    maxlength: 100
  },
  batchNumber: {
    type: String,
    maxlength: 50
  },
  nextDoseDate: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: 500
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
vaccinationRecordSchema.index({ babyId: 1, scheduledDate: 1 });
vaccinationRecordSchema.index({ babyId: 1, status: 1 });

// Update timestamp on save
vaccinationRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const VaccinationRecord = mongoose.model('VaccinationRecord', vaccinationRecordSchema);

export default VaccinationRecord;
