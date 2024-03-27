import React, { useState } from 'react';
import Drawer from '../../components/Drawer/Drawer.js';
import LogoComponent from '../../components/LogoComponent/LogoComponent';
import HorizontalMenu from '../../components/HorizontalMenu/HorizontalMenu.js';
import BookNowModal from '../../components/BookNowModal/BookNowModal.js';
import Button from '../../elements/Button.js';
import './Header.css';

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

        <Button onClick={toggleModal} text="Book Now" />

        <BookNowModal isOpen={isModalOpen} onClose={toggleModal} />
      </header>
    </div>
  );
}
