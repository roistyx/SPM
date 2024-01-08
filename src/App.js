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
  }, []);

  return (
    <div className="App">
      <div ref={headerRef}>
        <Header height="60px" gap="10px" />
      </div>

      <div className="content" style={{ width: contentWidth }}>
        <BrowserRouter>
          <Routes>
            <Route path="/colors" element={<ColorTheme />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
