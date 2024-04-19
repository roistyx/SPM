import React, { useState, useEffect } from "react";
import QueryCalendar from "../../api/QueryCalendar";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppointmentData,
  setCurrentStep,
} from "../../features/Stepper/stepperSlice";
import format from "date-fns/format";

import CalendarBody from "./CalendarBody";

import "./Calendar.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

const NewCalendar = () => {
  const [navigationDate, setNavigationDate] = useState(new Date());
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [requestedDateResults, setRequestedDateResults] = useState({});
  const [date, setDate] = useState("");
  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );

  const fetchMonthData = async () => {
    const formattedDate = format(navigationDate, "yyyy-MM-dd");
    const response = await QueryCalendar.getCalendarDataByMonthAndYear(
      formattedDate
    );
    console.log("response", response);
  };

  useEffect(() => {
    fetchMonthData();
  }, [navigationDate]); // Add currentDate to the dependency array

  const handleDateChange = async (date) => {
    console.log("date", date);

    try {
      const response = await QueryCalendar.getCalendarData(date);
      // setRequestedDateResults(response);

      console.log("requestedDateResults", response);
    } catch (error) {
      console.log("Error while calling handleDateChange ", error);
    }
    return;
  };

  const today = new Date();

  return (
    <div className="calendar-container">
      <CalendarBody
        setNavigationDate={setNavigationDate}
        navigationDate={navigationDate}
        daysOfWeek={daysOfWeek}
        handleDateChange={handleDateChange}
      />
    </div>
  );
};

export default NewCalendar;
