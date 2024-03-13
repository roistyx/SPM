import React, { useState } from 'react';
import './ChooseAppointment.css'; // Import the CSS file
import BasicDateCalendar from '../CustomCalendar/CustomCalendar';

const ChooseAppointment = () => {
  const style = {
    padding: '20px',
  };
  return (
    <div style={style}>
      <BasicDateCalendar />
    </div>
  );
};

export default ChooseAppointment;
