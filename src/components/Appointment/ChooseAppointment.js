import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setSetSelectedAppointment,
  setCurrentStep,
} from '../../features/Stepper/stepperSlice';
import './ChooseAppointment.css'; // Import the CSS file
const ChooseAppointment = ({
  datePickerValue,
  navigationDate,
  setNavigationDate,
}) => {
  const [appointmentSelected, setAppointmentSelected] =
    useState(false);
  const [clickedAppointmentId, setClickedAppointmentId] =
    useState(null);

  const slots = datePickerValue.slots;
  const dispatch = useDispatch();
  // const selectedAppointment = useSelector(
  //   (state) => state.stepper.selectedAppointment
  // );
  const currentDatePickerValue = useSelector(
    (state) => state.stepper.currentDatePickerValue
  );

  const handleAppointmentClick = (appointment) => {
    // console.log('appointment', appointment._id);
    dispatch(setSetSelectedAppointment(appointment));
    setAppointmentSelected(true);
    setClickedAppointmentId(appointment._id);
    // setNavigationDate(new Date(datePickerValue.date));
  };
  useEffect(() => {
    setAppointmentSelected(false);
  }, [currentDatePickerValue.value]);

  return (
    <>
      <div className="vertical-line"></div>
      <div className="appointment-container">
        <div className="appointment-header">
          {/* {datePickerValue.longDateFormat} */}
          {currentDatePickerValue.value}
        </div>
        {!slots || slots.length !== 0 ? (
          <div className="grid-container">
            <div className="appointment-time-grid">
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
                    className={` ${
                      clickedAppointmentId === appointment._id
                        ? 'active'
                        : ''
                    } ${
                      appointment.isBooked
                        ? 'disabled'
                        : 'appointment-button'
                    }`}
                    key={appointment._id}
                    console={console.log(
                      'appointment',
                      appointment.isBooked
                    )}
                    onClick={() =>
                      handleAppointmentClick(appointment)
                    }
                  >
                    {startTime}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="no-appointments-div">
            <div
              style={{ marginTop: '1rem', marginBottom: '1.2rem' }}
            >
              No appointments for this day
            </div>
            <img
              style={{ padding: '2.82rem' }}
              src={'No_appointments _for_this_day.png'}
              alt="No_appointments _for_this_day"
            />
          </div>
        )}
        <div className="continue-button-container">
          {appointmentSelected ? (
            <button
              className="appointment-selected-button"
              onClick={() => {
                dispatch(setCurrentStep(2));
              }}
            >
              Appointment Selected{' '}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChooseAppointment;
