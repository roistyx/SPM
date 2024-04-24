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
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [requestedDateResults, setRequestedDateResults] = useState({});
  const [date, setDate] = useState("");

  const convertDateFromApiToFrontEndHelper = (date) => {
    const parts = date.split("-");
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  };

  const dispatch = useDispatch();
  console.log("datePickerValue", datePickerValue);

  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );

  const monthAvailAppointments = useSelector(
    (state) => state.stepper.monthAvailAppointments
  );

  const fetchMonthData = async () => {
    const formattedDate = format(navigationDate, "yyyy-MM-dd");
    const response = await QueryCalendar.getCalendarDataByMonthAndYear(
      formattedDate
    );
    dispatch(setMonthAvailAppointments(response));
  };

  useEffect(() => {
    fetchMonthData();
  }, [navigationDate]); // Add currentDate to the dependency array

  const handleDateChange = async (date) => {
    const formattedDate = convertDateFromApiToFrontEndHelper(date);
    setDatePickerValue({
      slots: monthAvailAppointments.filteredSlots[formattedDate],
      date: formattedDate,
    });
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

      <ChooseAppointment datePickerValue={datePickerValue} />
    </div>
  );
};

export default NewCalendar;
