import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import format from 'date-fns/format';

import './ChooseAppointment.css'; // Import the CSS file
const ChooseAppointment = ({ datePickerValue }) => {
  console.log('appointments', datePickerValue.slots);

  const handleAppointmentClick = (appointment) => {
    console.log('Appointment selected:', appointment);
    // Additional functionality can be implemented here
  };

  return (
    <div className="appointment-container">
      {/* {datePickerValue.slots ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            padding: '20px',
          }}
        >
          {datePickerValue.map((appointment) => {
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
        </div>
      ) : (
        <div>No appointments available</div>
      )} */}
    </div>
  );
};

export default ChooseAppointment;
