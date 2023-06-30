const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  checklist: { type: mongoose.Schema.Types.ObjectId, ref: 'Checklist', required: true },
  stage: { type: String, required: true },
  completionTime: { type: Date, required: true },
  // Add other timeline properties as per your requirement
});

module.exports = mongoose.model('Timeline', timelineSchema);
