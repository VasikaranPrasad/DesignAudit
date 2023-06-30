const Checklist = require('../models/Checklist');

// Controller function to create a new checklist
exports.createChecklist = async (req, res) => {
  try {
    const { designName, version, runCount } = req.body;

    const checklist = new Checklist({ designName, version, runCount });
    await checklist.save();

    res.status(201).json(checklist);
  } catch (error) {
    console.error('Error creating checklist:', error);
    res.status(500).json({ error: 'An error occurred while creating the checklist.' });
  }
};

// Controller function to retrieve all checklists
exports.getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find();
    res.json(checklists);
  } catch (error) {
    console.error('Error retrieving checklists:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the checklists.' });
  }
};

// Controller function to retrieve a single checklist by ID
exports.getChecklistById = async (req, res) => {
  try {
    const { checklistId } = req.params;
    const checklist = await Checklist.findById(checklistId);

    if (!checklist) {
      return res.status(404).json({ error: 'Checklist not found.' });
    }

    res.json(checklist);
  } catch (error) {
    console.error('Error retrieving checklist:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the checklist.' });
  }
};

// Controller function to update a checklist by ID
exports.updateChecklist = async (req, res) => {
  try {
    const { checklistId } = req.params;
    const { designName, version, runCount } = req.body;

    const checklist = await Checklist.findByIdAndUpdate(
      checklistId,
      { designName, version, runCount },
      { new: true }
    );

    if (!checklist) {
      return res.status(404).json({ error: 'Checklist not found.' });
    }

    res.json(checklist);
  } catch (error) {
    console.error('Error updating checklist:', error);
    res.status(500).json({ error: 'An error occurred while updating the checklist.' });
  }
};
