import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Header from './features/Header/Header';
import ColorTheme from './components/ColorTheme/ColorTheme.js';
import './App.css';

function App() {
  const headerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState('auto');
  console.log('contentWidth', contentWidth);

  useEffect(() => {
    if (headerRef.current) {
      setContentWidth(`${headerRef.current.offsetWidth}px`);
    }
  }, [contentWidth]);

  return (
    <div className="App">
      <nav className="nav-container">
        <div ref={headerRef}>
          <Header height="60px" gap="10px" />
        </div>
      </nav>

      <div className="content" style={{ maxWidth: contentWidth }}>
        <BrowserRouter>
          <Routes>
            <Route path="/colors" element={<ColorTheme />} />
          </Routes>
        </BrowserRouter>
      </div>
      <footer className="footer-container">footer</footer>
    </div>
  );
}

export default App;
