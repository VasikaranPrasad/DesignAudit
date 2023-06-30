const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'Software', 'genus_log.txt');

const stages = ['elab', 'generic', 'mapped', 'opt', 'opt_inc'];

fs.readFile(logFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading log file:', err);
    return;
  }

  const lines = data.split('\n');
  const stageLogs = {};

  let currentStage = null;

  for (const line of lines) {
    if (line.startsWith('set STAGE')) {
      const match = line.match(/set STAGE (\w+)/);
      if (match && stages.includes(match[1])) {
        currentStage = match[1];
        stageLogs[currentStage] = { error: [], warning: [], info: [] };
      } else {
        currentStage = null;
      }
    } else if (currentStage) {
      const timestampMatch = line.match(/^(\d{2}:\d{2}:\d{2})/);
      const messageMatch = line.match(/\| (\w+) \|/);
      const type = messageMatch ? messageMatch[1].toLowerCase() : 'error';
      const message = line.replace(/^\d{2}:\d{2}:\d{2} \(.*\) \| \w+ \| /, '');

      if (type === 'warning' || type === 'error' || type === 'info') {
        const logEntry = { type, message };

        if (timestampMatch) {
          logEntry.timestamp = timestampMatch[1];
        }

        stageLogs[currentStage][type].push(logEntry);
      }
    }
  }

  let output = JSON.stringify(stageLogs, null, 2);

  // Add code to extract info, warning, and error messages
  const info = [];
  const warning = [];
  const error = [];

  for (const stage in stageLogs) {
    for (const type in stageLogs[stage]) {
      for (const logEntry of stageLogs[stage][type]) {
        switch (type) {
          case 'info':
            info.push(logEntry);
            break;
          case 'warning':
            warning.push(logEntry);
            break;
          case 'error':
            error.push(logEntry);
            break;
        }
      }
    }
  }

  // Replace the original output with the info, warning, and error messages
  output = JSON.stringify({ info, warning, error }, null, 2);

 

  fs.writeFile('output.json', output, (err) => {
    if (err) {
      console.error('Error writing output JSON file:', err);
      return;
    }

    console.log('Output JSON file has been created: output.json');
  });
});
