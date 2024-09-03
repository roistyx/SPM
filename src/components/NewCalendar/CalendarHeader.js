import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAppointmentData,
  setCalendarAvailability,
} from '../../features/Stepper/stepperSlice.js';
import moment from 'moment-timezone';
import upArrow from './images/up_arrow.png';
import downArrow from './images/down_arrow.png';
import disabledUpArrow from './images/disabled_up_arrow.png';
import './CalendarHeader.css';

function CalendarHeader({
  navigationDate,
  setNavigationDate,
  userTimeZone,
  months,
}) {
  const userYear = navigationDate.year();
  const userMonth = navigationDate.month();
  let today = new Date();
  const isMonthDisabled =
    userYear <= today.getFullYear() && userMonth <= today.getMonth();

  useEffect(() => {}, [isMonthDisabled]);
  const buttonStyle = {
    backgroundImage: `url(${
      isMonthDisabled ? disabledUpArrow : upArrow
    })`,
    marginRight: '4px',
  };
  const prevMonth = () => {
    setNavigationDate(
      moment.tz(new Date(userYear, userMonth - 1, 1), userTimeZone)
    );
  };
  const nextMonth = () => {
    setNavigationDate(
      moment.tz(new Date(userYear, userMonth + 1, 1), userTimeZone)
    );
  };
  return (
    <div className="calendar-header">
      <span
        style={{
          fontWeight: 600,
          color: '#171725',
          fontSize: '18px',
        }}
      >
        {months[userMonth]}{' '}
        <span
          style={{
            fontWeight: 14,
            color: '#171725',
            fontSize: '18px',
          }}
        >
          {userYear}
        </span>
      </span>
      <span className="horizontal-line"> </span>
      <span>
        <button
          style={buttonStyle}
          onClick={prevMonth}
          disabled={isMonthDisabled}
        >
          {/* Button content */}
        </button>

        <button
          style={{
            backgroundImage: `url(${downArrow})`,
            marginLeft: '4px',
          }}
          onClick={nextMonth}
        ></button>
      </span>
    </div>
  );
}

export default CalendarHeader;
