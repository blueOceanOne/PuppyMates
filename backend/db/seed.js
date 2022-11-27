const path = require('path');
const db = require('./db');
const { Breed, User, Photo, Invitation, Event, Request, Message } = require('./models/models');

db.sync({ force: true })
  .then(() =>
    db.query(
      `
TRUNCATE TABLE breeds CASCADE;`
    )
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
  .then(() => Breed.count())
  .then((count) => db.query(`ALTER SEQUENCE "breeds_id_seq" RESTART WITH ${count + 1}`))
  .then(() =>
    db.query(`
COPY users("id", "email", "dog_name", "breed_id", "size", "dog_friendly", "people_friendly", "energy", "city", "state", "bio", "createdAt", "updatedAt")
FROM '${path.join(__dirname, './sampleData/example_users.csv')}'
DELIMITER ','
NULL AS 'null'
CSV HEADER;
`)
  )
  .then(() => User.count())
  .then((count) => db.query(`ALTER SEQUENCE "users_id_seq" RESTART with ${count + 1}`))
  .then(() =>
    db.query(`COPY photos("id","user_id","url","createdAt","updatedAt")
  FROM '${path.join(__dirname, './sampleData/example_photos.csv')}'
  DELIMITER ','
  CSV HEADER;`)
  )
  .then(() => Photo.count())
  .then((count) => db.query(`ALTER SEQUENCE "photos_id_seq" RESTART with ${count + 1}`))
  .then(() =>
    db.query(
      `COPY events("id", "host_id", "title", "description", "date", "latitude", "longitude", "createdAt", "updatedAt")
      FROM '${path.join(__dirname, './sampleData/example_events.csv')}'
      DELIMITER ','
      CSV HEADER;`
    )
  )
  .then(() => Event.count())
  .then((count) => db.query(`ALTER SEQUENCE "events_id_seq" RESTART with ${count + 1}`))
  .then(() =>
    db.query(`COPY invitations("id", "invitee_id", "event_id", "status", "createdAt", "updatedAt")
    FROM '${path.join(__dirname, './sampleData/example_invitations.csv')}'
    DELIMITER ','
    CSV HEADER;`)
  )
  .then(() => Invitation.count())
  .then((count) => db.query(`ALTER SEQUENCE "invitations_id_seq" RESTART with ${count + 1}`))
  .then(() =>
    db.query(`COPY requests("id", "sender_id", "recipient_id", "status", "createdAt", "updatedAt")
    FROM '${path.join(__dirname, './sampleData/example_requests.csv')}'
    DELIMITER ','
    CSV HEADER;`)
  )
  .then(() => Request.count())
  .then((count) => db.query(`ALTER SEQUENCE "requests_id_seq" RESTART with ${count + 1}`))
  .then(() =>
    db.query(`COPY messages("id", "sender_id", "recipient_id", "content", "createdAt", "updatedAt")
  FROM '${path.join(__dirname, './sampleData/example_messages.csv')}'
  DELIMITER ','
  CSV HEADER;`)
  )
  .then(() => Message.count())
  .then((count) => db.query(`ALTER SEQUENCE "messages_id_seq" RESTART with ${count + 1}`));
