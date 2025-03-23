/**
 * Entry point of the React application.
 * 
 * This file initializes the root container and renders the main App component.
 * It uses React 18's `createRoot` API to enable concurrent rendering.
 * If the root DOM element is not found, an error is thrown.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.scss';

const container = document.getElementById('root') as HTMLElement;

if (!container) {
  throw new Error('Root container not found!');
}

const root = ReactDOM.createRoot(container);

root.render(<App />);
