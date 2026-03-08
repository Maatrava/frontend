import mongoose from 'mongoose';

const growthRecordSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  headCircumference: {
    type: Number,
    min: 0
  },
  notes: {
    type: String,
    maxlength: 500
  },
  recordedBy: {
    type: String,
    required: true
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

// Index for efficient queries
growthRecordSchema.index({ babyId: 1, date: -1 });

// Update timestamp on save
growthRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const GrowthRecord = mongoose.model('GrowthRecord', growthRecordSchema);

export default GrowthRecord;
