import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QueryCalendar from '../../api/QueryCalendar';
import { setCurrentStep } from '../../features/Stepper/stepperSlice';

export default function Confirmation() {
  const [appointmentConfirmed, setAppointmentConfirmed] =
    useState(false);
  const currentFormData = useSelector(
    (state) => state.stepper.currentFormData
  );
  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );
  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  // console.log('currentFormData', currentFormData);
  // console.log('currentAppointmentData', currentAppointmentData);
  let appointmentObject = {
    dateAndTime: currentAppointmentData,
    formData: currentFormData,
  };

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    const response = await QueryCalendar.addAppointment(
      appointmentObject
    );
    setAppointmentConfirmed(true);
  };

  const handleEditAppointment = () => {
    dispatch(setCurrentStep(step - 1));
  };

  return (
    <div className="confirmation-container">
      {!appointmentConfirmed ? (
        <>
          <div>
            <h1>Confirmation</h1>
            <p>First Name: {currentFormData.firstName}</p>
            <p>Last Name: {currentFormData.lastName}</p>
            <p>Address: {currentFormData.address}</p>
            <p>Phone: {currentFormData.phone}</p>
            <p>Date of Birth: {currentFormData.dob}</p>
            <p>Email: {currentFormData.email}</p>
            <p>
              Consultation Method:{' '}
              {currentFormData.consultationMethod}
            </p>
            <p>Diagnosis: {currentFormData.diagnosis}</p>
            <p>Primary Reason: {currentFormData.primaryReason}</p>
            <p>
              Referring Physician:{' '}
              {currentFormData.referringPhysician}
            </p>
            <p>Date: {currentAppointmentData.date}</p>
            <p>Time: {currentAppointmentData.time}</p>
          </div>
          <div>
            <button onClick={handleEditAppointment}>Previous</button>
            <button onClick={handleSubmitAppointment}>Confirm</button>
          </div>
        </>
      ) : (
        <div>
          <h1>Appointment Confirmed</h1>
          <p>Thank you for confirming your appointment</p>
        </div>
      )}
    </div>
  );
}
