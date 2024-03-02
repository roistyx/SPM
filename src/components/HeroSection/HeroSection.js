import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HeroSection.css";
import { Appointments } from "../Appointment/ChooseAppointment";
import { Between } from "../../layouts/Line";
import getImage from "../../api/getImage";
import Button from "../../elements/Button";

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

  useEffect(() => {
    async function fetchAndSetBackgroundImage() {
      try {
        const response = await getImage.getHeroSectionBackgroundImage(
          "hero-section-background.png",
          "0.3"
        );

        // Check if response and response.data.url are defined
        if (response && response.data && response.data.url) {
          const imageUrl = response.data.url;

          // Further validation for URL format can be added here if necessary
          // For example, checking if imageUrl is a valid URL string
          isValidUrl(imageUrl);
          setBackgroundImage(imageUrl);
        } else {
          // Handle the case where the URL is not available
          console.error("URL not found in the response");
        }
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error fetching the background image:", error);
      }
    }

    fetchAndSetBackgroundImage();
  }, []);

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
            <Button onClick={() => navigate("/appointments")}>
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </Between>
  );
}

export default HeroSection;
