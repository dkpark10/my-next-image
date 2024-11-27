import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import nunjucks from 'nunjucks';
import apiRouter from './router/api.controller.js';

const app = express();

const port = 8080;

app.set('view engine', 'html');
nunjucks.configure(process.env.INIT_CWD, {
  express: app,
  watch: true,
});

app.use(express.static(path.resolve(process.env.INIT_CWD, 'resources')));

app.use('/api', apiRouter);

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpackConfig = require('../../webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath);
      },
    })
  );
}

const nodeStats = path.resolve(
  process.env.INIT_CWD,
  'resources/dist/node/loadable-stats.json'
);

const webStats = path.resolve(
  process.env.INIT_CWD,
  'resources/dist/web/loadable-stats.json'
);

app.get('*', (_req, res) => {
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();

  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const jsx = webExtractor.collectChunks(<App />);

  const html = renderToString(jsx);

  res.set('content-type', 'text/html');
  return res.render('index', {
    links: webExtractor.getLinkTags(),
    tags: webExtractor.getStyleTags(),
    html,
    scripts: webExtractor.getScriptTags(),
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`${port} server start`));
