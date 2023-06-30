const Timeline = require('../models/Timeline');
// Import any necessary validation libraries or middleware

// Controller function to create a new timeline event
exports.createTimeline = async (req, res) => {
  try {
    // Validate input data if necessary
    const { checklistId, stage, completionTime } = req.body;

    const timeline = new Timeline({ checklist: checklistId, stage, completionTime });
    await timeline.save();

    res.status(201).json(timeline);
  } catch (error) {
    console.error('Error creating timeline event:', error);
    res.status(500).json({ error: 'An error occurred while creating the timeline event.' });
  }
};

// Controller function to retrieve all timeline events for a checklist
exports.getTimelinesByChecklist = async (req, res) => {
  try {
    const { checklistId } = req.params;
    const timelines = await Timeline.find({ checklist: checklistId });

    res.json(timelines);
  } catch (error) {
    console.error('Error retrieving timeline events:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the timeline events.' });
  }
};

// Controller function to update a timeline event by ID
exports.updateTimeline = async (req, res) => {
  try {
    // Validate input data if necessary
    const { timelineId } = req.params;
    const { stage, completionTime } = req.body;

    const timeline = await Timeline.findByIdAndUpdate(
      timelineId,
      { stage, completionTime },
      { new: true }
    );

    if (!timeline) {
      return res.status(404).json({ error: 'Timeline event not found.' });
    }

    res.json(timeline);
  } catch (error) {
    console.error('Error updating timeline event:', error);
    res.status(500).json({ error: 'An error occurred while updating the timeline event.' });
  }
};
