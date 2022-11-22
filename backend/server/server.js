const app = require('./index.js');

const httpServer = app.server;

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});