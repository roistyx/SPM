import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import chroma from 'chroma-js';

// Generate color scale
const colorScale = chroma
  .scale(['#fafa6e', '#77A2A8'])
  .mode('lch')
  .colors(6);

// Define color names
const colorNames = {
  primary: colorScale[0],
  secondary: colorScale[1],
  accent: colorScale[2],
  highlight: colorScale[3],
  dark: colorScale[4],
  light: colorScale[5],
};

// Set CSS variables on the document's root element
const docRoot = document.documentElement;
Object.entries(colorNames).forEach(([name, color]) => {
  docRoot.style.setProperty(`--color-${name}`, color);
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
