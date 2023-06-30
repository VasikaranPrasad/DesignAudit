const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb+srv://vasikaranprasad2662:designaudit@cluster0.xwi0w0h.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  // Read the log file, generate JSON report, and serve it via API
app.get('/api/data', (req, res) => {
  const logFilePath = 'genus_log.txt';

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const logLines = data.split('\n');
    const report = {};
    let currentStage = '';

    logLines.forEach((line) => {
      const stageMatch = line.match(/set STAGE ([a-zA-Z_]+)/);
      if (stageMatch) {
        const stage = stageMatch[1];
        currentStage = stage;
        report[currentStage] = [];
      }

      const stepMatch = line.match(/set ([a-zA-Z_]+) ([a-zA-Z_]+)/);
      if (stepMatch) {
        const type = stepMatch[1];
        const message = stepMatch[2];
        const timestamp = new Date().toISOString();

        if (report[currentStage]) {
          report[currentStage].push({
            timestamp,
            type,
            message,
          });
        }
      }
    });
    const jsonReport = JSON.stringify(report, null, 2);


    // Save the JSON report to a file
    const jsonFilePath = 'path/to/your/json/file.json';
    fs.writeFile(jsonFilePath, jsonReport, (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Read the saved JSON file and send it as the API response
      fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
        if (err) {
          console.error('Error reading JSON file:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
          const parsedData = JSON.parse(jsonData);
          res.json(parsedData);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    });
  });
});


// Define API routes
app.use(express.json());
app.use('/api/checklists', require('./routes/checklists'));
app.use('/api/timelines', require('./routes/timelines'));
app.use('/api/analysis', require('./routes/analysis'));
