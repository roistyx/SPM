import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment-timezone';

import './ChooseAppointment.css'; // Import the CSS file
const ChooseAppointment = ({ datePickerValue }) => {
  const slots = datePickerValue.slots;
  console.log(
    'datePickerValue.noAppointmentsMessage',
    datePickerValue
  );

  const handleAppointmentClick = (appointment) => {
    console.log(
      'datePickerValue.noAppointmentsMessage',
      datePickerValue.noAppointmentsMessage
    );
    // Additional functionality can be implemented here
  };

  return (
    <div className="appointment-container">
      {!slots || slots.length !== 0 ? (
        <div>
          <span>{datePickerValue.yesAppointmentsMessage}</span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              padding: '20px',
            }}
          >
            {slots.map((appointment) => {
              // Convert UTC time to local time for display
              const startTime = new Date(
                appointment.startTime
              ).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              });
              return (
                <button
                  key={appointment._id}
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  {startTime}
                </button>
              );
            })}
          </div>{' '}
        </div>
      ) : (
        <div>{datePickerValue.noAppointmentsMessage}</div>
      )}
    </div>
  );
};

export default ChooseAppointment;
