import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QueryCalendar from '../../api/QueryCalendar';
import { setCurrentStep } from '../../features/Stepper/stepperSlice';
import AppointmentDateTitle from './AppointmentDateTitle';
import './Confirmation.css';

export default function Confirmation() {
  const [appointmentConfirmed, setAppointmentConfirmed] =
    useState(false);
  const currentFormData = useSelector(
    (state) => state.stepper.currentFormData
  );
  const selectedAppointmentObject = useSelector(
    (state) => state.stepper.selectedAppointment
  );
  console.log('currentFormData', currentFormData);

  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    const response = await QueryCalendar.addAppointment({
      currentFormData,
      selectedAppointmentObject,
    });
    console.log('response', response);
    setAppointmentConfirmed(true);
  };

  const handleEditAppointment = () => {
    dispatch(setCurrentStep(step - 1));
  };

  return (
    <div className="confirmation-container">
      <AppointmentDateTitle selectedObj={selectedAppointmentObject} />
      <div className="left-container"></div>
      <div className="vertical-line"></div>
      <div className="right-container">
        <div className="input-container"></div>
        <div className="submission-or-buttons">
          <button type="button" onClick={handleEditAppointment}>
            Back
          </button>
          <button
            type="submit"
            // onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
