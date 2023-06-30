const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  designName: { type: String, required: true },
  version: { type: String, required: true },
  runCount: { type: Number, required: true },
  // Add other checklist properties as per your requirement
});

module.exports = mongoose.model('Checklist', checklistSchema);
