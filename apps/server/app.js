const express = require('express');
const app = express();
const port = 8080;
const { ChunkExtractor } = require('@loadable/server');

const apiRouter = require('./router/api.controller');

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
