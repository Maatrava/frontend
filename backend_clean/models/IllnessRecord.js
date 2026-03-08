import mongoose from 'mongoose';

const illnessRecordSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true
  },
  illnessType: {
    type: String,
    required: true,
    maxlength: 100
  },
  symptoms: {
    type: [String],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  severity: {
    type: String,
    required: true,
    enum: ['Mild', 'Moderate', 'Severe']
  },
  diagnosis: {
    type: String,
    maxlength: 500
  },
  treatment: {
    type: String,
    maxlength: 1000
  },
  doctorName: {
    type: String,
    maxlength: 100
  },
  hospitalName: {
    type: String,
    maxlength: 100
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
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
illnessRecordSchema.index({ babyId: 1, startDate: -1 });
illnessRecordSchema.index({ babyId: 1, illnessType: 1 });

// Update timestamp on save
illnessRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const IllnessRecord = mongoose.model('IllnessRecord', illnessRecordSchema);

export default IllnessRecord;
