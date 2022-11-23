const path = require('path');
const db = require('./db');

db.query(`
COPY breeds(id, breed, createdAt, updatedAt)
FROM '${path.join(__dirname, './sampleData/example_breeds.csv')}'
DELIMITER ','
CSV HEADER;
`);
