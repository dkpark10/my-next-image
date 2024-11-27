import path from 'path';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../client/App';

const app = express();

const port = 8080;

app.set('view engine', 'html');

app.use(express.static(path.resolve(process.env.INIT_CWD, 'resources')));

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
