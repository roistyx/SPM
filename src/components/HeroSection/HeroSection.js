import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { Between } from '../../layouts/Line';
import getImage from '../../api/getImage';

function HeroSection() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  console.log(backgroundImage);
  useEffect(() => {
    async function fetchAndSetBackgroundImage() {
      const response = await getImage.getHeroSectionBackgroundImage(
        'hero-section-background.png',
        '0.3'
      );
      const imageUrl = response.data.url;

      setBackgroundImage(imageUrl);
    }

    fetchAndSetBackgroundImage();
  }, []);
  return (
    <Between style={{ margin: '10px 0 0 0' }}>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: 'cover', // Cover the entire div
          backgroundPosition: 'center', // Center the background image
          backgroundColor: `var(--color-primary)`, // Your existing background color
        }}
      >
        <div className="hero-section__container">
          <div className="hero-section__text">
            <h1 className="hero-section__text__title">
              Silver Palms Medical
            </h1>
            <p className="hero-section__text__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, voluptates.
            </p>
          </div>
          <div className="hero-section__image">
            <img
              src="https://picsum.photos/200/300"
              alt="hero section image"
            />
          </div>
        </div>
      </div>
    </Between>
  );
}

export default HeroSection;
