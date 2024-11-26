import 'core-js';
import React from 'react'; // 진입 파일인 react 반드시 import
import { hydrateRoot } from 'react-dom/client';
import App from './App';

hydrateRoot(
  document,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
