import path from 'path';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../client/App';

const log = console.log;
const app = express();

const port = 8080;

app.set('view engine', 'html');

log(path.join(__dirname, '../../resources'));
app.use(express.static(path.join(__dirname, '../../resources')));

app.get('*', (_req, res) => {
  const stream = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/main.js'],
    onShellReady() {
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onError(x) {
      console.error(x);
    },
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`${port} server start`));
