import React, { useState } from 'react';
import Drawer from '../../components/Drawer/Drawer.js';
import LogoComponent from '../../components/LogoComponent/LogoComponent';
import HorizontalMenu from '../../components/HorizontalMenu/HorizontalMenu.js';
import './Header.css';
import BookNowModal from '../../components/BookNowModal/BookNowModal.js';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuItems = [
    { name: 'Home', link: '/', addClassName: 'home-class' },
    { name: 'About Us', link: '/about-us' },
    { name: 'Services', link: '/services' },
    { name: "FAQ's", link: '/faqs' },
    { name: 'Contact Us', link: '/contact-us' },
  ];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="header-container">
      <header className="header">
        <LogoComponent />
        <HorizontalMenu menuItems={menuItems} />

        <div>
          {/* Button to open the modal */}
          <button onClick={toggleModal}>Book Now</button>

          {/* Modal component */}
          <BookNowModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </header>
    </div>
  );
}
