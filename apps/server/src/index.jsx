import 'core-js'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady } from '@loadable/component'
import App from './App'

loadableReady(() => {
  const rootElement = document.getElementById('root');
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})
