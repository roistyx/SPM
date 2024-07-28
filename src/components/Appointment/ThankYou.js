import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ThankYou() {
  const confirmationData = useSelector(
    (state) => state.stepper.confirmationData
  );
  console.log('confirmationData', confirmationData);
  return (
    <div>
      {/* <h1>Thank You</h1> */}
      {confirmationData.isBooked ? (
        <div>
          <p>
            <strong>Appointment Status:</strong>{' '}
            {confirmationData.isBooked ? 'Booked' : 'Not Booked'}
          </p>
          <p>
            <strong>Start Time:</strong>{' '}
            {new Date(confirmationData.startTime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong>{' '}
            {new Date(confirmationData.endTime).toLocaleString()}
          </p>
          <p>
            <strong>First Name:</strong> {confirmationData.firstName}
          </p>
        </div>
      ) : (
        <p>No confirmation data available.</p>
      )}
    </div>
  );
}
