import React, { useRef } from 'react';
import { Between } from '../../layouts/Line.js';
import Drawer from '../../components/Drawer/Drawer.js';
import LogoComponent from '../../components/LogoComponent/LogoComponent';
import HorizontalMenu from '../../components/HorizontalMenu/HorizontalMenu.js';
import './Header.css';

export default function Header({ height, gap }) {
  const headerRef = useRef(null);
  const menuItems = [
    { name: 'Home', link: '/', addClassName: 'home-class' },
    { name: 'About Us', link: '/about-us' },
    { name: 'Services', link: '/services' },
    { name: "FAQ's", link: '/faqs' },
    { name: 'Contact Us', link: '/contact-us' },
    { name: 'Instagram-icon', link: '/instagram' },
    { name: '(647) 883-6567', link: '/:text=Client' },
    { name: 'Facebook-icon', link: '/facebook' },
    { name: 'Twitter-icon', link: '/twitter' },
  ];
  const style = {
    ...(height ? { '--height': height } : {}),
    ...(gap ? { '--gap': gap } : {}),
  };

  return (
    <div className="header" style={style}>
      <LogoComponent height={height} />
      <HorizontalMenu menuItems={menuItems} />

      <div className="hidden-drawer">
        <Drawer links={menuItems} height={height} gap={gap} />
      </div>
    </div>
  );
}
