import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Header from './features/Header/Header';
import Stepper from './features/Stepper/Stepper.js';
import HeroSection from './components/HeroSection/HeroSection';
import ColorTheme from './components/ColorTheme/ColorTheme';
import Footer from './components/Footer/Footer.js';
import ChooseAppointment from './components/Appointment/ChooseAppointment';
import YourInfo from './components/Appointment/YourInfo';
import Confirmation from './components/Appointment/Confirmation';
import './App.css';

function App() {
  const headerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState('auto');
  const maxWidth = '1024px';

  const steps = [
    { label: 'Choose Appointment', content: <ChooseAppointment /> },
    { label: 'Your Info', content: <YourInfo /> },
    { label: 'Confirmation', content: <Confirmation /> },
  ];

  useEffect(() => {
    if (headerRef.current) {
      const newWidth = `${headerRef.current.offsetWidth}px`;
      document.documentElement.style.setProperty(
        '--content-width',
        newWidth
      );
      setContentWidth(newWidth);
    }
  }, [contentWidth]);

  return (
    <div className="App">
      <nav className="nav-container">
        <div ref={headerRef}>
          <Header height="60px" />
        </div>
      </nav>

      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<HeroSection maxWidth={maxWidth} />}
            />
            <Route path="/colors" element={<ColorTheme />} />
            <Route
              path="/appointments"
              element={<Stepper steps={steps} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="nav-container">
        <Footer>footer</Footer>
      </div>
    </div>
  );
}

export default App;
