const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
  TNS: {
    type: Number,
    required: true,
  },
  violatingPaths: {
    type: Number,
    required: true,
  },
  criticalPathSlack: {
    type: Number,
    required: true,
  },
  leafInstanceCount: {
    type: Number,
    required: true,
  },
  physicalInstanceCount: {
    type: Number,
    required: true,
  },
  sequentialInstanceCount: {
    type: Number,
    required: true,
  },
  combinationalInstanceCount: {
    type: Number,
    required: true,
  },
  hierarchicalInstanceCount: {
    type: Number,
    required: true,
  },
  cellArea: {
    type: Number,
    required: true,
  },
  ehvt: {
    type: Number,
    required: true,
  },
  lvt: {
    type: Number,
    required: true,
  },
  svt: {
    type: Number,
    required: true,
  },
  leakage: {
    type: Number,
    required: true,
  },
  internal: {
    type: Number,
    required: true,
  },
  switching: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Analysis', analysisSchema);
