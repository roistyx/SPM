import React, { useState } from 'react';
import './Calendar.css';
import upArrow from './images/up_arrow.png';
import downArrow from './images/down_arrow.png';
import disabledUpArrow from './images/disabled_up_arrow.png';
import { set } from 'lodash';

const NewCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [disabled, setDisabled] = useState(false);

  const daysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = new Date();

  const isToday = (day, isCurrentMonth) => {
    return (
      isCurrentMonth &&
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Handlers for previous and next month navigation
  const prevMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };
  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  // Generate calendar dates
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

  // Assuming currentDate and today are defined somewhere in your component

  // Determine if the button should be disabled
  const isDisabled =
    currentDate.getFullYear() <= today.getFullYear() &&
    currentDate.getMonth() <= today.getMonth();

  // Choose the background image based on the disabled state
  const buttonStyle = {
    backgroundImage: `url(${isDisabled ? disabledUpArrow : upArrow})`,
    marginRight: '4px',
    // Add any other styles here
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span
          style={{
            fontWeight: 600,
            color: '#171725',
            fontSize: '18px',
          }}
        >
          {months[currentDate.getMonth()]}{' '}
          <span
            style={{
              fontWeight: 14,
              color: '#171725',
              fontSize: '18px',
            }}
          >
            {currentDate.getFullYear()}
          </span>
        </span>
        <span className="horizontal-line"> </span>
        <span>
          <button
            style={buttonStyle}
            onClick={prevMonth}
            disabled={isDisabled}
          >
            {/* Button content */}
          </button>

          <button
            style={{
              backgroundImage: `url(${downArrow})`,
              marginLeft: '4px',
            }}
            onClick={nextMonth}
          >
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
            key={index}
            className={`date ${
              isToday(date.day, date.isCurrentMonth) ? 'today' : ''
            } ${!date.isCurrentMonth ? 'not-current-month' : ''}`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCalendar;
