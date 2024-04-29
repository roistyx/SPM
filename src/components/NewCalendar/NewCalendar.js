import React, { useState, useEffect } from "react";
import QueryCalendar from "../../api/QueryCalendar";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppointmentData,
  setMonthAvailAppointments,
} from "../../features/Stepper/stepperSlice";
import format from "date-fns/format";
import CalendarBody from "./CalendarBody";
import ChooseAppointment from "../Appointment/ChooseAppointment";

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
  const [datePickerValue, setDatePickerValue] = useState({
    date: new Date(),
    slots: [],
  });

  const dispatch = useDispatch();

  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );

  const monthAvailAppointments = useSelector(
    (state) => state.stepper.monthAvailAppointments
  );

  const fetchMonthData = async () => {
    // console.log('navigationDate', navigationDate);
    const response = await QueryCalendar.getCalendarDataByMonthAndYear(
      navigationDate
    );
    dispatch(setMonthAvailAppointments(response));
  };

  useEffect(() => {
    dispatch(setMonthAvailAppointments({}));
    fetchMonthData();
  }, [navigationDate]); // Add currentDate to the dependency array

  const handleDateChange = async (date) => {
    const response = await QueryCalendar.getDayAppointments(date);
    console.log("response", response);
  };

  return (
    <div className="calendar-container">
      <CalendarBody
        setNavigationDate={setNavigationDate}
        navigationDate={navigationDate}
        daysOfWeek={daysOfWeek}
        handleDateChange={handleDateChange}
      />

      <ChooseAppointment datePickerValue={datePickerValue} />
    </div>
  );
};

export default NewCalendar;
