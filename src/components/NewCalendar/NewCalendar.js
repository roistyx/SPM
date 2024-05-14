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

const NewCalendar = () => {
  const [navigationDate, setNavigationDate] = useState(
    moment(new Date())
  );
  const [datePickerValue, setDatePickerValue] = useState({
    date: navigationDate,
    slots: [],
  });
  const dispatch = useDispatch();

  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );

  // console.log('monthAvailAppointments', monthAvailAppointments);

  const checkCalendarAvailability = async () => {
    // console.log('navigationDate', navigationDate);
    const response = await QueryCalendar.postCalendarAvailability(
      navigationDate
    );
    dispatch(setCalendarAvailability(response));
  };

  useEffect(() => {
    dispatch(setCalendarAvailability({}));
    checkCalendarAvailability();
  }, [navigationDate]); // Add currentDate to the dependency array

  const handleDateChange = async (date) => {
    const response = await QueryCalendar.postDayAppointments(date);
    setDatePickerValue({ date, slots: response });
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
