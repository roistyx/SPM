import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Stepper from './features/Stepper/Stepper.js';
import HeroSection from './components/HeroSection/HeroSection';
import ColorTheme from './components/ColorTheme/ColorTheme';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Calendar from './components/NewCalendar/NewCalendar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header height="60px" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/colors" element={<ColorTheme />} />
          <Route path="/appointments" element={<Stepper />} />
          <Route path="/new-calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>

      <div className="nav-container">
        <Footer>footer</Footer>
      </div>
    </div>
  );
}

export default App;
