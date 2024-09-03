import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QueryCalendar from '../../api/QueryCalendar.js';
import {
  setCurrentStep,
  setConfirmationData,
} from '../../features/Stepper/stepperSlice.js';
import AppointmentDateTitle from './AppointmentDateTitle.js';
import AppointmentDetails from './AppointmentDetails.js';
import BookNowModal from '../BookNowModal/BookNowModal.js';
import ErrorList from './ErrorListComponent.js';

import './SubmitUserAppointment.css';

export default function Confirmation() {
  const [appointmentConfirmed, setAppointmentConfirmed] =
    useState(false);
  const [errors, setErrors] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const currentFormData = useSelector(
    (state) => state.stepper.currentFormData
  );

  const selectedAppointmentObject = useSelector(
    (state) => state.stepper.selectedAppointment
  );

  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    const response = await QueryCalendar.submitAppointment({
      currentFormData,
      selectedAppointmentObject,
    });
    if (response.error) {
      console.log('response.error.errors', response.error);
      setErrors(response.error.errors);
      setIsModalOpen(true);
      return;
    }
    if (response.statusText !== 'OK') {
      {
        console.log('An unexpected error occurred');
        // setErrors(response.error.errors);
        // setIsModalOpen(true);
      }
    }
    if (response.data.status === false) {
      const errors = [
        {
          type: 'status',
          value: '',
          msg: response.data.message,
          path: 'Schedular',
          location: 'body',
        },
      ];
      setErrors(errors);
      setIsModalOpen(true);
    }
    // setErrors(response.data.message);
    // setIsModalOpen(true);
    console.log('response', response);
    dispatch(setConfirmationData(response.data));
    dispatch(setCurrentStep(step + 1));
  };

  const handleEditAppointment = () => {
    dispatch(setCurrentStep(step - 1));
  };

  return (
    <div className="confirmation-container">
      <BookNowModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        content={<ErrorList errors={errors} />}
      />

      <AppointmentDateTitle selectedObj={selectedAppointmentObject} />
      <AppointmentDetails
        currentFormData={currentFormData}
        handleEditAppointment={handleEditAppointment}
        handleSubmitAppointment={handleSubmitAppointment}
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
