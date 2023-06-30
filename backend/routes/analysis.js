const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Define API endpoint for analysis data
router.get('/:checklistId', analysisController.getAnalysisData);
// Define API endpoint for creating analysis data
router.post('/', analysisController.createAnalysisData);


module.exports = router;
