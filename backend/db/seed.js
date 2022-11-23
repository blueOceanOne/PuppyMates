const path = require('path');
const db = require('./db');

db.query(
  `
TRUNCATE TABLE breeds CASCADE;`
)
  .then(() =>
    db.query(
      `
  COPY breeds(id, breed, "createdAt", "updatedAt")
  FROM '${path.join(__dirname, './sampleData/example_breeds.csv')}'
  DELIMITER ','
  CSV HEADER;
  `
    )
  )
  .then(() =>
    db.query(`
COPY users("id", "email", "dog_name", "breed_id", "size", "dog_friendly", "people_friendly", "energy", "city", "state", "bio", "createdAt", "updatedAt")
FROM '${path.join(__dirname, './sampleData/example_users.csv')}'
DELIMITER ','
NULL AS 'null'
CSV HEADER;
`)
  )
  .then(() =>
    db.query(`COPY photos("id","user_id","url","createdAt","updatedAt")
  FROM '${path.join(__dirname, './sampleData/example_photos.csv')}'
  DELIMITER ','
  CSV HEADER;`)
  )
  .then(() =>
    db.query(
      `COPY events("id", "host_id", "title", "description", "date", "latitude", "longitude", "createdAt", "updatedAt")
      FROM '${path.join(__dirname, './sampleData/example_events.csv')}'
      DELIMITER ','
      CSV HEADER`
    )
  );
