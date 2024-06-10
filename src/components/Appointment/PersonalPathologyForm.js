import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  setFormData,
  setCurrentStep,
} from "../../features/Stepper/stepperSlice";

import "./PersonalPathologyForm.css";

export default function PersonalPathologyForm() {
  const currentFormData = useSelector((state) => state.stepper.currentFormData);
  const selectedAppointmentObject = useSelector(
    (state) => state.stepper.selectedAppointment
  );
  console.log("selectedAppointmentObject", selectedAppointmentObject);
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
    setFormUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormUserData((prevState) => ({
      ...prevState,
      dob: newValue,
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
        <div className="title-personal-information">Personal Information</div>
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formUserData.firstName}
          onChange={handleChange}
        />
        <label className="label">Last name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formUserData.lastName}
          onChange={handleChange}
        />
        <label className="label">Date of birth</label>
        <input
          type="text"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formUserData.dob}
          onChange={handleChange}
        />
        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formUserData.address}
          onChange={handleChange}
        />
        <label className="label">Phone</label>
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
        <span className="label">Consultation Method</span>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="consultationMethod"
              value="Phone Call"
              onChange={handleChange}
            />{" "}
            Phone Call
          </label>
          <label>
            <input
              type="radio"
              name="consultationMethod"
              value="Facetime"
              onChange={handleChange}
            />{" "}
            Facetime
          </label>
          <label>
            <input
              type="radio"
              name="consultationMethod"
              value="Zoom"
              onChange={handleChange}
            />{" "}
            Zoom
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
        <button type="button" onClick={handleEditAppointment}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
}
