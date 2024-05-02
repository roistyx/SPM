import React from 'react';
import {
  setAppointmentData,
  setCalendarAvailability,
} from '../../features/Stepper/stepperSlice';
import { useSelector, useDispatch } from 'react-redux';

import './CalendarBody.css';
import format from 'date-fns/format';

import CalendarHeader from './CalendarHeader.js';
import { ne } from '@faker-js/faker';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarBody({
  handleDateChange,
  navigationDate,
  setNavigationDate,
}) {
  const today = new Date();
  const calendarAvailability = useSelector(
    (state) => state.stepper.calendarAvailability
  );

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
          'yyyy-MM-dd'
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
          new Date(
            navigationDate.getFullYear(),
            navigationDate.getMonth(),
            d
          ),
          'yyyy-MM-dd'
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
          'yyyy-MM-dd'
        ),
        day: d,
        isNextMonth: true,
        isCurrentMonth: false,
      });
    }

    return dates;
  };

  const dates = generateCalendarDates();

  const isToday = (todayDate) => {
    if (format(today, 'yyyy-MM-dd') === todayDate) {
      return true;
    }
    return;
  };
  const isPassedDate = (dateStr) => {
    const parts = dateStr.split('-'); // Split the date string into parts
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Subtract 1 because months are zero-indexed
    const day = parseInt(parts[2], 10);

    const inputDate = new Date(year, month, day);
    inputDate.setHours(0, 0, 0, 0); // Set time to start of the day

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of today
    return inputDate < today;
  };

  const isDateAvailable = (date) => {
    if (!calendarAvailability) {
      return false;
    }
    return calendarAvailability[date];
  };

  return (
    <div className="calendar-body-container">
      <CalendarHeader
        navigationDate={navigationDate}
        setNavigationDate={setNavigationDate}
      />
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
            className={`date ${isToday(date.fullDate) ? 'today ' : ''}
            ${!date.isCurrentMonth ? 'not-current-month' : ''} ${
              isPassedDate(date.fullDate) ? 'passed-date' : ''
            }`}
          >
            {date.day}
            <div
              style={{
                height: '4px',
                width: '4px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div
                className={`${
                  isDateAvailable(date.fullDate)
                    ? 'date-available'
                    : ''
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarBody;
