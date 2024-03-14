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
  TextareaAutosize,
} from "@mui/material";
import "./PersonalPathologyForm.css";

export default function PersonalPathologyForm() {
  const currentFormData = useSelector((state) => state.stepper.currentFormData);
  const dispatch = useDispatch();

  console.log("currentFormData", currentFormData);

  const [formData, setFormData] = useState({
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      dob: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({
      type: "SET_FORM_DATA",
      payload: { ...formData },
    });
  };

  return (
    <div className="personal-pathology-form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={formData.dob}
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
          value={formData.email}
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
            value={formData.consultationMethod}
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
          value={formData.diagnosis}
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
          value={formData.primaryReason}
          onChange={handleChange}
        />

        <TextField
          label="Referring Physician, if applicable"
          name="referringPhysician"
          value={formData.referringPhysician}
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
