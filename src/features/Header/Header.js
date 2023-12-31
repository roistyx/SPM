import React from 'react';
import { Between } from '../../layouts/Line.js';
import Drawer from '../Drawer/Drawer';
import LogoComponent from '../../components/LogoComponent/LogoComponent';
import './Header.css';

export default function Header({ baseColor, height, gap }) {
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about-us' },
    { name: 'Services', link: '/services' },
    { name: "FAQ's", link: '/faqs' },
    { name: 'Contact Us', link: '/contact-us' },
    { name: 'Instagram-icon', link: '/instagram' },
    { name: 'phone-icon-(647) 883-6567', link: '/:text=Client' },
    { name: 'Facebook-icon', link: '/facebook' },
  ];
  const style = {
    ...(baseColor ? { '--base-color': baseColor } : {}),
    ...(height ? { '--height': height } : {}),
    ...(gap ? { '--gap': gap } : {}),
  };

  return (
    <div className="header" style={style}>
      {/* <img
        src="http://localhost:3200/SilverPalmsMedical.svg"
        alt="logo"
        className="logo"
      /> */}

      <LogoComponent />

      <div className="hidden-drawer">
        <Drawer links={menuItems} position={height} />
      </div>
    </div>
  );
}
