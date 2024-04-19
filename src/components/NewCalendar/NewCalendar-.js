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

  const isToday = (day, isCurrentMonth) => {
    return (
      isCurrentMonth &&
      day === today.getDate() &&
      navigationDate.getMonth() === today.getMonth() &&
      navigationDate.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (day, isCurrentMonth) => {
    const dateToCheck = new Date(
      navigationDate.getFullYear(),
      navigationDate.getMonth(),
      day + 1
    );

    return isCurrentMonth && dateToCheck < today;
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

  const generateCalendarDates = () => {
    const dates = [];
    // Create a Date object for the first day of the current month.
    // This uses the year and month from navigationDate, and sets the day to 1.
    const firstDayOfMonth = new Date(
      navigationDate.getFullYear(), // Get the year from navigationDate
      navigationDate.getMonth(), // Get the month from navigationDate
      1 // Set the day to 1, which is always the first day of any month
    );

    // Create a Date object for the last day of the current month.
    // By setting the day to 0 in the context of the next month, it rolls back to the last day of the current month.
    const lastDayOfMonth = new Date(
      navigationDate.getFullYear(), // Get the year from navigationDate
      navigationDate.getMonth() + 1, // Increment the month by 1, moving to the next month
      0 // Set the day to 0, which JavaScript interprets as the last day of the previous month
    );

    // Create a Date object for the last day of the previous month.
    // By setting the day to 0 with the current month, it gives the last day of the month before the current one.
    const lastDayOfPreviousMonth = new Date(
      navigationDate.getFullYear(), // Get the year from navigationDate
      navigationDate.getMonth(), // Use the current month from navigationDate
      0 // Set the day to 0, which rolls back to the last day of the previous month
    ).getDate(); // .getDate() extracts just the day part, giving us the last day as a number

    // Days from the previous month
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      const prevMonthDay = lastDayOfPreviousMonth - i + 1;
      dates.push({
        fullDate: format(
          new Date(
            navigationDate.getFullYear(),
            navigationDate.getMonth() - 1,
            prevMonthDay
          ),
          "MM-dd-yyyy"
        ),
        day: prevMonthDay,
        isCurrentMonth: false,
        isPreviousMonth: true,
      });
    }

    // Days of the current month
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      dates.push({
        fullDate: format(
          new Date(navigationDate.getFullYear(), navigationDate.getMonth(), d),
          "MM-dd-yyyy"
        ),
        day: d,
        isCurrentMonth: true,
      });
    }

    // Days from the next month to complete the week
    const daysToCompleteRow = 7 - lastDayOfMonth.getDay() - 1;
    for (let d = 1; d <= daysToCompleteRow; d++) {
      dates.push({
        fullDate: format(
          new Date(
            navigationDate.getFullYear(),
            navigationDate.getMonth() + 1,
            d
          ),
          "MM-dd-yyyy"
        ),
        day: d,
        isNextMonth: true,
        isCurrentMonth: false,
      });
    }

    return dates;
  };

  const dates = generateCalendarDates();

  const isMonthDisabled =
    navigationDate.getFullYear() <= today.getFullYear() &&
    navigationDate.getMonth() <= today.getMonth();

  // Choose the background image based on the disabled state
  const buttonStyle = {
    backgroundImage: `url(${isMonthDisabled ? disabledUpArrow : upArrow})`,
    marginRight: "4px",
    // Add any other styles here
  };

  const isPassedDate = (dateStr) => {
    // Create a Date object from the passed date string
    const inputDate = new Date(dateStr);
    inputDate.setHours(0, 0, 0, 0); // Reset time to the start of the day to ignore time differences

    // Get today's date and reset time to the start of the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Return true if the input date is before today
    return inputDate < today;
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
      <div className="calendar-body">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            onClick={() => handleDateChange(date.fullDate)}
            key={index}
            className={`date ${
              isToday(date.day, date.isCurrentMonth) ? "today" : ""
            } ${!date.isCurrentMonth ? "not-current-month" : ""}
               
                ${
                  isPast(date.day, date.isCurrentMonth)
                    ? "not-current-month"
                    : ""
                } ${isPassedDate(date.fullDate) ? "passed-date" : ""}`}>
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCalendar;
