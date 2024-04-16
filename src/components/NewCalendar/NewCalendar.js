import React, { useState, useEffect } from "react";
import QueryCalendar from "../../api/QueryCalendar";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppointmentData,
  setCurrentStep,
} from "../../features/Stepper/stepperSlice";
import format from "date-fns/format";
import upArrow from "./images/up_arrow.png";
import downArrow from "./images/down_arrow.png";
import disabledUpArrow from "./images/disabled_up_arrow.png";
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [requestedDateResults, setRequestedDateResults] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );

  const fetchMonthData = async () => {
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    const response = await QueryCalendar.getCalendarDataByMonthAndYear(
      formattedDate
    );

    console.log("response", response);
  };

  useEffect(() => {
    fetchMonthData();
  }, [currentDate]); // Add currentDate to the dependency array

  const handleDateChange = async (date) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );

    setRequestedDateResults({});
    setDatePickerValue(newDate);
    try {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      setDate(formattedDate);
      const response = await QueryCalendar.getCalendarData(formattedDate, time);
      setRequestedDateResults(response);

      console.log("requestedDateResults", response);
    } catch (error) {
      console.log("Error while calling handleDateChange ", error);
    }
    return;
  };

  const today = new Date();

  const isToday = (day, isCurrentMonth) => {
    return (
      isCurrentMonth &&
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (day, isCurrentMonth) => {
    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day + 1
    );

    return isCurrentMonth && dateToCheck < today;
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const generateCalendarDates = () => {
    const dates = [];

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const lastDayOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    // Days from the previous month
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      dates.push({
        day: lastDayOfPreviousMonth - i + 1,
        isCurrentMonth: false,
      });
    }

    // Days of the current month
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      dates.push({ day: d, isCurrentMonth: true });
    }

    // Days from the next month to complete the week
    const daysToCompleteRow = 7 - lastDayOfMonth.getDay() - 1;
    for (let d = 1; d <= daysToCompleteRow; d++) {
      dates.push({ day: d, isCurrentMonth: false });
    }

    return dates;
  };

  const dates = generateCalendarDates();

  const isDisabled =
    currentDate.getFullYear() <= today.getFullYear() &&
    currentDate.getMonth() <= today.getMonth();

  // Choose the background image based on the disabled state
  const buttonStyle = {
    backgroundImage: `url(${isDisabled ? disabledUpArrow : upArrow})`,
    marginRight: "4px",
    // Add any other styles here
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span
          style={{
            fontWeight: 600,
            color: "#171725",
            fontSize: "18px",
          }}>
          {months[currentDate.getMonth()]}{" "}
          <span
            style={{
              fontWeight: 14,
              color: "#171725",
              fontSize: "18px",
            }}>
            {currentDate.getFullYear()}
          </span>
        </span>
        <span className="horizontal-line"> </span>
        <span>
          <button style={buttonStyle} onClick={prevMonth} disabled={isDisabled}>
            {/* Button content */}
          </button>

          <button
            style={{
              backgroundImage: `url(${downArrow})`,
              marginLeft: "4px",
            }}
            onClick={nextMonth}>
            {/* Unicode for down arrow */}
            {/* &#8744; */}
          </button>
        </span>
      </div>
      <div className="calendar-body">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            onClick={() => handleDateChange(date.day)}
            key={index}
            className={`date ${
              isToday(date.day, date.isCurrentMonth) ? "today" : ""
            } ${!date.isCurrentMonth ? "not-current-month" : ""}
          ${isPast(date.day, date.isCurrentMonth) ? "not-current-month" : ""}`}>
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCalendar;
