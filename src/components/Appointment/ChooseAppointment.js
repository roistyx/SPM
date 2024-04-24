import React, { useState } from "react";
import "./ChooseAppointment.css"; // Import the CSS file

const ChooseAppointment = ({ datePickerValue }) => {
  const dateObject = new Date(datePickerValue.date);
  console.log(dateObject);
  console.log(datePickerValue);
  const style = {
    padding: "20px",
  };
  return <div></div>;
};

export default ChooseAppointment;
