const path = require('path');
const db = require('./db');

db.query(
  `
COPY breeds(id, breed, "createdAt", "updatedAt")
FROM '${path.join(__dirname, './sampleData/example_breeds.csv')}'
DELIMITER ','
CSV HEADER;
`
).then(() => {
  db.query(`
COPY users("id", "email", "dog_name", "breed_id", "size", "dog_friendly", "people_friendly", "energy", "city", "state", "bio", "createdAt", "updatedAt")
FROM '${path.join(__dirname, './sampleData/example_users.csv')}'
DELIMITER ','
CSV HEADER;
`);
});
