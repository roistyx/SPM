import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HeroSection.css";
import { Appointments } from "../Appointment/ChooseAppointment.js";
import { Between } from "../../layouts/Line.js";
import Button from "../../elements/Button.js";

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}

function HeroSection() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);
  // console.log(backgroundImage);
  let navigate = useNavigate();

  return (
    <Between style={{ margin: "10px 0 0 0" }}>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: "cover", // Cover the entire div
          backgroundPosition: "center", // Center the background image
          backgroundColor: `var(--color-primary)`, // Your existing background color
        }}>
        <div className="hero-section__container">
          <div className="hero-section__content">
            <h1 className="hero-section__text__title">
              Pathology Focused on Patient Care
            </h1>
            <p className="hero-section__text__description">
              Have queries regarding your pathology results? Book a personalized
              consultation for a comprehensive second opinion today!
            </p>
            <Button
              onClick={() => navigate("/appointments")}
              text="Book a Consultation"
            />
          </div>
        </div>
      </div>
    </Between>
  );
}

export default HeroSection;
