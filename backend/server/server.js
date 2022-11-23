const http = require('./index.js');

http.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});