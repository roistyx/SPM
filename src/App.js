import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Header from "./features/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import ColorTheme from "./components/ColorTheme/ColorTheme";
import Footer from "./components/Footer/Footer.js";
import "./App.css";

function App() {
  const headerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState("auto");
  const maxWidth = "1024px";

  useEffect(() => {
    if (headerRef.current) {
      const newWidth = `${headerRef.current.offsetWidth}px`;
      document.documentElement.style.setProperty("--content-width", newWidth);
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
        <HeroSection maxWidth={maxWidth} />
        <BrowserRouter>
          <Routes>
            <Route path="/colors" element={<ColorTheme />} />
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
