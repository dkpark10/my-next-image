import 'core-js';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';
import App from './app';

const rootElement = document.getElementById('root');

loadableReady(() => {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
