const fs = require('fs');

// Read the log file
fs.readFile('genus_log.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the log data by lines
  const logLines = data.split('\n');

  // Initialize an empty report object
  const report = {};

  let currentStage = ''; // Variable to track the current stage

  // Process each log line
  logLines.forEach((line) => {
    // Match the stage
    const stageMatch = line.match(/set STAGE ([a-zA-Z_]+)/);
    if (stageMatch) {
      const stage = stageMatch[1];
      currentStage = stage; // Set the current stage
      report[currentStage] = []; // Initialize the stage array in the report
    }

    // Match the step
    const stepMatch = line.match(/set ([a-zA-Z_]+) ([a-zA-Z_]+)/);
    if (stepMatch) {
      const type = stepMatch[1];
      const message = stepMatch[2];
      const timestamp = new Date().toISOString();

      // Check if the current stage exists in the report
      if (report[currentStage]) {
        report[currentStage].push({
          timestamp,
          type,
          message,
        });
      }
    }
  });

  // Convert report object to JSON
  const jsonReport = JSON.stringify(report, null, 2);

  // Save the JSON report to a file
  fs.writeFile('../frontend/src/output.json', jsonReport, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('JSON report generated successfully.');
  });
});
