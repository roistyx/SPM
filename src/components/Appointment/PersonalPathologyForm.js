import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import {
  setFormData,
  setCurrentStep,
} from "../../features/Stepper/stepperSlice";

import "./PersonalPathologyForm.css";

export default function PersonalPathologyForm() {
  const currentFormData = useSelector((state) => state.stepper.currentFormData);
  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );
  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();

  const [formUserData, setFormUserData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    dob: null,
    email: "",
    consultationMethod: "",
    diagnosis: "",
    primaryReason: "",
    referringPhysician: "",
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

  return (
    <div className="personal-pathology-form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formUserData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formUserData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formUserData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formUserData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={formUserData.dob}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formUserData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">
            Select your preferred method of consultation
          </FormLabel>
          <RadioGroup
            row
            name="consultationMethod"
            value={formUserData.consultationMethod}
            onChange={handleChange}>
            <FormControlLabel
              value="Phone Call"
              control={<Radio />}
              label="Phone Call"
            />
            <FormControlLabel
              value="Facetime"
              control={<Radio />}
              label="Facetime"
            />
            <FormControlLabel value="Zoom" control={<Radio />} label="Zoom" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Diagnosis"
          name="diagnosis"
          value={formUserData.diagnosis}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormLabel component="legend" style={{ marginTop: 20 }}>
          Primary reason for contacting Personal Pathology Consulting
        </FormLabel>
        <textarea
          className="primary-reason-textarea"
          name="primaryReason"
          value={formUserData.primaryReason}
          onChange={handleChange}
        />

        <TextField
          label="Referring Physician, if applicable"
          name="referringPhysician"
          value={formUserData.referringPhysician}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" style={{ marginTop: 20 }}>
          Submit
        </Button>
      </form>
    </div>
  );
}
