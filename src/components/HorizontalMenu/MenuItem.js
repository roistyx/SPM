import React from 'react';
import './MenuItem.css'; // CSS file for styling

function MenuItem({ name, link, addClass }) {
  // console.log('addClass', addClass);

  return (
    <div
    //   className="menu-item"
    >
      <span className={`menu-item ${addClass}`}>{name}</span>
    </div>
  );
}

export default MenuItem;
