import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setFormData,
  setCurrentStep,
} from '../../features/Stepper/stepperSlice';
import DynamicDateInput from '../../elements/DynamicDateInput';
import './PersonalPathologyForm.css';

export default function PersonalPathologyForm() {
  const currentFormData = useSelector(
    (state) => state.stepper.currentFormData
  );
  const selectedAppointmentObject = useSelector(
    (state) => state.stepper.selectedAppointment
  );
  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  const [formUserData, setFormUserData] = useState({
    firstName: currentFormData.firstName,
    lastName: currentFormData.lastName,
    address: currentFormData.address,
    phone: currentFormData.phone,
    dob: currentFormData.dob,
    email: currentFormData.email,
    consultationMethod: currentFormData.consultationMethod,
    diagnosis: currentFormData.diagnosis,
    primaryReason: currentFormData.primaryReason,
    referringPhysician: currentFormData.referringPhysician,
    appointmentId: selectedAppointmentObject._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name, value', name, value);
    setFormUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFormData({ ...formUserData }));
    dispatch(setCurrentStep(step + 1));
  };

  const handleEditAppointment = () => {
    dispatch(setCurrentStep(step - 1));
  };

  return (
    <form className="form-container">
      <div className="demographics-container">
        {/* <label className="label">Name</label> */}
        <input
          type="text"
          name="firstName"
          placeholder="Name"
          value={formUserData.firstName}
          onChange={handleChange}
        />
        {/* <label className="label">Last name</label> */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formUserData.lastName}
          onChange={handleChange}
        />
        <DynamicDateInput handleChange={handleChange} />

        {/* <input
          type="text"
          name="dob"
          // min={}
          placeholder="Date of Birth"
          value={formUserData.dob}
          onChange={handleChange}
        /> */}
        {/* <label className="label">Address</label> */}
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formUserData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formUserData.address}
          onChange={handleChange}
        />
        {/* <label className="label">Phone</label> */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formUserData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="vertical-line"></div>
      <div className="consultation-container">
        <div className="input-container">
          <span className="title-consultation-method">
            Consultation Method
          </span>
          <div className="radio-buttons">
            <label className="radio-button-container">
              <input
                type="radio"
                name="consultationMethod"
                value="Phone Call"
                onChange={handleChange}
              />
              <span class="checkmark" />

              <span class="consultation-label">Phone Call</span>
            </label>
            <label className="radio-button-container">
              <input
                type="radio"
                name="consultationMethod"
                value="Facetime"
                onChange={handleChange}
              />
              <span class="checkmark" />
              <span class="consultation-label">Facetime</span>
            </label>
            <label className="radio-button-container">
              <input
                type="radio"
                name="consultationMethod"
                value="Zoom"
                onChange={handleChange}
              />
              <span class="checkmark" />
              <span class="consultation-label">Zoom</span>
            </label>
          </div>
          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={formUserData.diagnosis}
            onChange={handleChange}
          />
          <input
            type="text"
            name="primaryReason"
            placeholder="Primary Reason"
            value={formUserData.primaryReason}
            onChange={handleChange}
          />
          <input
            type="text"
            name="referringPhysician"
            placeholder="Referring Physician"
            value={formUserData.referringPhysician}
            onChange={handleChange}
          />
        </div>
        <div className="submission-or-edit-buttons ">
          <button type="button" onClick={handleEditAppointment}>
            Back
          </button>
          <button type="submit" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
