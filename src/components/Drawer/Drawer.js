import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer, openDrawer } from './drawerSlice';
// import MenuIcon from "@mui/icons-material/Menu";
import MenuIcon from '../../elements/MenuIcon.js';
import './Drawer.css';

function extractInt(cssValue) {
  const numericValue = parseInt(cssValue, 2);

  return numericValue;
}

function Drawer({ links, marginTop }) {
  console.log('marginTop: ', extractInt(marginTop));

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const overlayRef = useRef(null);

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      dispatch(closeDrawer());
    }
  };

  // Focus the overlay when it opens so it can capture keyboard events.
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    if (isOpen) {
      dispatch(closeDrawer());
    } else {
      dispatch(openDrawer());
    }
  };

  return (
    <>
      <div
        className="icon-container"
        // style={height}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </div>

      {isOpen && (
        <div
          tabIndex={0}
          ref={overlayRef}
          className="drawer-overlay"
          onKeyUp={handleEscape}
          onClick={() => dispatch(closeDrawer())}
          // style={{ marginTop: '80px' }}
        >
          <div
            className="drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((item) => (
              <div className="drawer-item">
                <a className="menu-link" href={item.link}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Drawer;
