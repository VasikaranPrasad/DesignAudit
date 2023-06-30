const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

// Define API endpoints for checklists
router.post('/', checklistController.createChecklist);
router.get('/', checklistController.getAllChecklists);
router.get('/:checklistId', checklistController.getChecklistById);
router.put('/:checklistId', checklistController.updateChecklist);

module.exports = router;

