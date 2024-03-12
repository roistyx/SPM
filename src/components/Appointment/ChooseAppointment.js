import React, { useState } from 'react';
import './ChooseAppointment.css'; // Import the CSS file
import BasicDatePicker from '../CustomCalendar/CustomCalendar';

const ChooseAppointment = () => {
  const style = {
    padding: '20px',
  };
  return (
    <div style={style}>
      <BasicDatePicker />
    </div>
  );
};

export default ChooseAppointment;
