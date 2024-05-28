import React, { useState, useEffect } from 'react';
import QueryCalendar from '../../api/QueryCalendar';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAppointmentData,
  setCalendarAvailability,
} from '../../features/Stepper/stepperSlice';
import moment from 'moment-timezone';

import CalendarBody from './CalendarBody';
import ChooseAppointment from '../Appointment/ChooseAppointment';
import './Calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

function formatDateWithIntl(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}
const userTime = moment(new Date());

const NewCalendar = () => {
  const [navigationDate, setNavigationDate] = useState(userTime);

  const longDateFormat = formatDateWithIntl(navigationDate);

  const [datePickerValue, setDatePickerValue] = useState({
    date: navigationDate,
    slots: [],
    longDateFormat,
  });
  const dispatch = useDispatch();

  const checkCalendarAvailability = async () => {
    // console.log('navigationDate', navigationDate);
    const response = await QueryCalendar.postCalendarAvailability(
      navigationDate
    );
    dispatch(setCalendarAvailability(response));
  };

  useEffect(() => {
    const formattedNavigationDate = userTime.format('YYYY-MM-DD');
    if (
      userTime.month() === navigationDate.month() &&
      userTime.year() === navigationDate.year()
    ) {
      handleDateChange(formattedNavigationDate);
    }
    setDatePickerValue({
      date: {},
      slots: [],
      longDateFormat,
    });
  }, [navigationDate]);

  useEffect(() => {
    dispatch(setCalendarAvailability({}));
    checkCalendarAvailability();
  }, [navigationDate]);

  const handleDateChange = async (date) => {
    console.log('date', date);
    const response = await QueryCalendar.postDayAppointments(date);
    setDatePickerValue({
      date,
      slots: response,
      longDateFormat,
    });
  };

  return (
    <div className="calendar-container">
      <CalendarBody
        setNavigationDate={setNavigationDate}
        navigationDate={navigationDate}
        daysOfWeek={daysOfWeek}
        months={months}
        handleDateChange={handleDateChange}
      />

      <ChooseAppointment
        datePickerValue={datePickerValue}
        navigationDate={navigationDate}
        setNavigationDate={setNavigationDate}
      />
    </div>
  );
};

export default NewCalendar;
