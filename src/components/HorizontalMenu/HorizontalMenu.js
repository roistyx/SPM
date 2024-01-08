import React from 'react';
import { Between, Center } from '../../layouts/Line';
import MenuItem from './MenuItem';
import './HorizontalMenu.css';

function HorizontalMenu({ menuItems }) {
  return (
    <div className="horizontal-menu-container">
      <Between>
        {menuItems.map((item, index) => (
          <Center key={index}>
            <MenuItem
              // name={item.name}
              // link={item.link}
              addClass={item.addClassName}
            />
            <a href={item.link}>{item.name}</a>
          </Center>
        ))}
      </Between>
    </div>
  );
}

export default HorizontalMenu;
