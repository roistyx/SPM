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
  .scale(['#77A2A8', '#112734', '#BC8DA0'])
  .mode('lch')
  .colors(7);

// Define color names
const colorNames = {
  primary: colorScale[0],
  secondary: colorScale[1],
  accent: chroma(colorScale[0]).set('hsl.h', '+180').hex(),
  text: colorScale[3],
  textSecondary: chroma(colorScale[3]).brighten(2).hex(),
  link: chroma(colorScale[3]).set('hsl.h', '240').hex(),
  dark: colorScale[4],
  light: colorScale[5],
  unknown: colorScale[6],
};

console.log('colorNames', colorNames);

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
