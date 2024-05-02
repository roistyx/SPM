import React, { useState, useEffect } from 'react';
import QueryCalendar from '../../api/QueryCalendar';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAppointmentData,
  setCalendarAvailability,
} from '../../features/Stepper/stepperSlice';
import format from 'date-fns/format';
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
  const [navigationDate, setNavigationDate] = useState(new Date());
  const [datePickerValue, setDatePickerValue] = useState({
    date: new Date(),
    slots: [],
  });
  // console.log('datePickerValue', datePickerValue);
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

  function processSlots(slots) {
    const groupedByDate = {};

    // Helper function to convert UTC to local time and format it
    function formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    slots.forEach((slot) => {
      const startDate = new Date(slot.startTime);
      const endDate = new Date(slot.endTime);
      const newYorkTime = slot.NewYorkTime;

      // Format start and end times to local time
      const startTime = formatTime(slot.startTime);
      const endTime = formatTime(slot.endTime);

      // Get local date for grouping
      const date = startDate.toLocaleDateString('en-US');

      // Initialize date key in the grouped object if it does not exist
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }

      // Combine start and end times to create a time range string
      const timeRange = `${startTime} to ${endTime}`;

      // Add the time range and booking status to the corresponding date
      groupedByDate[date].push({
        [timeRange]: slot.isBooked,
        newYorkTime,
      });
    });

    // Convert the groupedByDate object to the desired array format
    return Object.keys(groupedByDate).map((date) => ({
      date: date,
      appointments: groupedByDate[date],
    }));
  }

  const handleDateChange = async (date) => {
    const response = await QueryCalendar.postDayAppointments(date);
    console.log('response', processSlots(response));
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
