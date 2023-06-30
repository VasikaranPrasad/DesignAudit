const Analysis = require('../models/Analysis');

// Controller function to create analysis data
exports.createAnalysisData = async (req, res) => {
  try {
    const { checklist, TNS, violatingPaths, criticalPathSlack, leafInstanceCount, physicalInstanceCount, sequentialInstanceCount, combinationalInstanceCount, hierarchicalInstanceCount, cellArea, ehvt, lvt, svt, leakage, internal, switching, total } = req.body;

    const analysisData = new Analysis({
      checklist,
      TNS,
      violatingPaths,
      criticalPathSlack,
      leafInstanceCount,
      physicalInstanceCount,
      sequentialInstanceCount,
      combinationalInstanceCount,
      hierarchicalInstanceCount,
      cellArea,
      ehvt,
      lvt,
      svt,
      leakage,
      internal,
      switching,
      total
    });

    await analysisData.save();

    res.status(201).json(analysisData);
  } catch (error) {
    console.error('Error creating analysis data:', error);
    res.status(500).json({ error: 'An error occurred while creating the analysis data.' });
  }
};


// Controller function to retrieve analysis data by checklist ID
exports.getAnalysisData = async (req, res) => {
  try {
    const { checklistId } = req.params;
    const analysisData = await Analysis.findOne({ checklist: checklistId });

    if (!analysisData) {
      return res.status(404).json({ error: 'Analysis data not found.' });
    }

    res.json(analysisData);
  } catch (error) {
    console.error('Error retrieving analysis data:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the analysis data.' });
  }
};
