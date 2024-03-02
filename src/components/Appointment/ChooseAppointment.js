import React, { useState } from "react";
import "./ChooseAppointment.css"; // Import the CSS file
import ReactBigCalendar from "../ReactBigCalendar/ReactBigCalendar";

const ChooseAppointment = () => {
  const style = {
    padding: "20px",
  };
  return (
    <div style={style}>
      <ReactBigCalendar />
    </div>
  );
};

export default ChooseAppointment;
