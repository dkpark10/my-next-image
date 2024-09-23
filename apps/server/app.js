import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

import { ChunkExtractor } from '@loadable/server';
import { renderToString } from 'react-dom/server';

// const apiRouter = require('./router/api.controller');
// app.use('/api', apiRouter);

const nodeStats = path.resolve(
  __dirname,
  '../../resources/dist/node/loadable-stats.json'
);

const webStats = path.resolve(
  __dirname,
  '../../resources/dist/web/loadable-stats.json'
);

app.get('/', (_req, res) => {
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();

  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const jsx = webExtractor.collectChunks(<App />);

  const html = renderToString(jsx);

  res.set('content-type', 'text/html');
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="main">${html}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
