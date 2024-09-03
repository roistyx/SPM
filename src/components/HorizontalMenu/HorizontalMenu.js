import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Between, Center } from '../../layouts/Line.js';
import MenuItem from './MenuItem.js';

const HorizontalMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;

  // @media (max-width: 1024px) {
  //   display: none;
  // }
`;

function HorizontalMenu({ menuItems }) {
  return (
    <HorizontalMenuContainer>
      <Between>
        {menuItems.map((item, index) => (
          <Center key={index}>
            <MenuItem
              name={item.name}
              link={item.link}
              // addClass={item.addClassName}
            />
          </Center>
        ))}
      </Between>
    </HorizontalMenuContainer>
  );
}

export default HorizontalMenu;
