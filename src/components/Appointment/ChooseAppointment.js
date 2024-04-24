import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";

import "./ChooseAppointment.css"; // Import the CSS file

const ChooseAppointment = ({ datePickerValue }) => {
  const formattedDate = format(datePickerValue.date, "yyyy-MM-dd");
  const monthAvailAppointments = useSelector(
    (state) => state.stepper.monthAvailAppointments
  );
  // console.log("monthAvailAppointments.filteredSlots", monthAvailAppointments);

  useEffect(() => {
    // console.log(monthAvailAppointments.filteredSlots[formattedDate]);s
    // Fetch the data for the selected date
  });

  const style = {
    padding: "20px",
  };

  return <div></div>;
};

export default ChooseAppointment;
