const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

// Define API endpoints for timelines
router.post('/', timelineController.createTimeline);
router.get('/:checklistId', timelineController.getTimelinesByChecklist);
router.put('/:timelineId', timelineController.updateTimeline);

module.exports = router;
