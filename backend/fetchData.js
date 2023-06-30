const fs = require('fs');
const { Client } = require('ssh2');


const config = {
  host: 'sjrrntlserver',
  port: 22,
  username: 'vasikaran',
  password: 'Vasikaran@123',
};

const filePath = '/projects/data/sigmasense/sdc300/users/subash/RUNS/Merge/genus.log';

const stages = ['elab', 'generic', 'mapped', 'opt', 'opt_inc'];

const extractData = (fileContent) => {
  const data = {};

  stages.forEach((stage) => {
    const regex = new RegExp(`set STAGE ${stage}(.+?)\\[.*?\\]`, 'gs');
    const matches = fileContent.match(regex);

    const stageData = matches
      ? matches.map((match) => {
          const [, timestamp] = match.match(/set STAGE .+ (.+)/);
          return {
            timestamp: timestamp.trim(),
            type: 'STAGE',
            message: stage,
          };
        })
      : [];

    data[stage] = stageData;
  });

  return data;
};

const connectAndExtractData = () => {
    const conn = new Client();
  
    conn.on('ready', () => {
      conn.sftp((err, sftp) => {
        if (err) {
          console.error('Error while creating SFTP session:', err);
          conn.end();
          return;
        }
  
        sftp.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error while reading file:', err);
          } else {
            const fileContent = data.toString();
            const extractedData = extractData(fileContent);
  
            // Convert extractedData to JSON string
            const jsonData = JSON.stringify(extractedData, null, 2);
  
            // Write the JSON string to the output.json file
            fs.writeFile('output.json', jsonData, 'utf8', (err) => {
              if (err) {
                console.error('Error while writing to output.json:', err);
              } else {
                console.log('Data extracted and saved to output.json successfully.');
              }
            });
          }
  
          conn.end();
        });
      });
    });
  
    conn.connect(config);
  };

connectAndExtractData();
