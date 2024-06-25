import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QueryCalendar from '../../api/QueryCalendar';
import { setCurrentStep } from '../../features/Stepper/stepperSlice';
import AppointmentDateTitle from './AppointmentDateTitle';
import AppointmentDetails from './AppointmentDetails';
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
      <AppointmentDetails
        currentFormData={currentFormData}
        handleEditAppointment={handleEditAppointment}
      />
      {/* <div className="columns-container">
        <div className="left-container">
          <div className="detail-box">
            <span className="title-data">Name </span>
            <span className="form-data">
              {currentFormData.firstName} {currentFormData.lastName}
            </span>
            <span className="title-data">Date of Birth </span>
            <span className="form-data">{currentFormData.dob}</span>
            <span className="title-data">Address </span>
            <span className="form-data">
              {currentFormData.address}
            </span>
            <span className="title-data">Phone </span>
            <span className="form-data">{currentFormData.phone}</span>
            <span className="title-data">Email </span>
            <span className="form-data">{currentFormData.email}</span>
          </div>
        </div>
        <div className="right-container">
          <span className="title-data">Consultation Method </span>
          <span className="form-data">
            {currentFormData.consultationMethod}
          </span>
          <span className="title-data">Diagnosis </span>
          <span className="form-data">
            {currentFormData.diagnosis}
          </span>
          <span className="title-data">Primary Reason </span>
          <span className="form-data">
            {currentFormData.primaryReason}
          </span>
          <span className="title-data">Referring Physician </span>
          <span className="form-data">
            {currentFormData.referringPhysician}
          </span>
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
      </div> */}
    </div>
  );
}
