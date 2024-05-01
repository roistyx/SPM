import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppointmentData,
  setCalendarAvailability,
} from "../../features/Stepper/stepperSlice";
import format from "date-fns/format";
import upArrow from "./images/up_arrow.png";
import downArrow from "./images/down_arrow.png";
import disabledUpArrow from "./images/disabled_up_arrow.png";
import "./CalendarHeader.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CalendarHeader({ navigationDate, setNavigationDate }) {
  const dispatch = useDispatch();
  const today = new Date();
  const isMonthDisabled =
    navigationDate.getFullYear() <= today.getFullYear() &&
    navigationDate.getMonth() <= today.getMonth();

  // Choose the background image based on the disabled state
  const buttonStyle = {
    backgroundImage: `url(${isMonthDisabled ? disabledUpArrow : upArrow})`,
    marginRight: "4px",
    // Add any other styles here
  };
  const prevMonth = () => {
    setNavigationDate(
      new Date(navigationDate.getFullYear(), navigationDate.getMonth() - 1, 1)
    );
  };
  const nextMonth = () => {
    setNavigationDate(
      new Date(navigationDate.getFullYear(), navigationDate.getMonth() + 1, 1)
    );
  };
  return (
    <div className="calendar-header">
      <span
        style={{
          fontWeight: 600,
          color: "#171725",
          fontSize: "18px",
        }}>
        {months[navigationDate.getMonth()]}{" "}
        <span
          style={{
            fontWeight: 14,
            color: "#171725",
            fontSize: "18px",
          }}>
          {navigationDate.getFullYear()}
        </span>
      </span>
      <span className="horizontal-line"> </span>
      <span>
        <button
          style={buttonStyle}
          onClick={prevMonth}
          disabled={isMonthDisabled}>
          {/* Button content */}
        </button>

        <button
          style={{
            backgroundImage: `url(${downArrow})`,
            marginLeft: "4px",
          }}
          onClick={nextMonth}></button>
      </span>
    </div>
  );
}

export default CalendarHeader;
