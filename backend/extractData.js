const fs = require('fs');

// Read the contents of the genus_log.txt file
fs.readFile('genus_log.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Extract info, warning, and error based on stages
  const stages = ['elab', 'generic', 'mapped', 'opt', 'opt_inc'];
  const extractedData = {};

  for (const stage of stages) {
    const regex = new RegExp(`set STAGE ${stage} \\((info|warning|error)\\)`, 'g');
    extractedData[stage] = data.match(regex) || [];
  }

  // Convert extracted data to JSON
  const jsonData = JSON.stringify(extractedData, null, 2);
  console.log(jsonData);
});
