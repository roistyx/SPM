import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stepper from "./features/Stepper/Stepper.js";
import HeroSection from "./components/HeroSection/HeroSection.js";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Calendar from "./components/NewCalendar/NewCalendar.js";
import PersonalPathologyForm from "./components/Appointment/PersonalPathologyForm.js";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header height="60px" />

        <div className="background-image">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/appointments" element={<Stepper />} />
            <Route path="/new-calendar" element={<Calendar />} />
            <Route path="/form" element={<PersonalPathologyForm />} />
          </Routes>
        </div>

        <div className="nav-container">
          <Footer>footer</Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
