import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import format from "date-fns/format";
import QueryCalendar from "../../api/QueryCalendar";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppointmentData,
  setCurrentStep,
} from "../../features/Stepper/stepperSlice";

import "./Calendar.css";

export default function Calendar() {
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [requestedDateResults, setRequestedDateResults] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const currentAppointmentData = useSelector(
    (state) => state.stepper.currentAppointmentData
  );

  const step = useSelector((state) => state.stepper.currentStep);
  const dispatch = useDispatch();
  let appointmentObject = {
    date: date,
    time: time,
  };
  // console.log("currentAppointmentDate", currentAppointmentData);

  const handleDateChange = async (newDate) => {
    setRequestedDateResults({});
    setDatePickerValue(newDate);
    try {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      const response = await QueryCalendar.getCalendarData(formattedDate, time);
      setRequestedDateResults(response.data);
      setDate(formattedDate);
    } catch (error) {
      console.log("Error while calling handleDateChange ", error);
    }
    return;
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    // console.log("appointmentObject", appointmentObject);
    dispatch(setAppointmentData(appointmentObject));

    dispatch(setCurrentStep(step + 1));
  };

  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  return (
    <div className="calendar-container">
      <div className="calendar">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            date={datePickerValue}
            onChange={handleDateChange}
            minDate={minDate}
            views={["day"]}
            openTo="day"
          />
        </LocalizationProvider>
      </div>
      <div className="calendar-results">
        <h3>{format(datePickerValue, "EEEE, d MMMM yyyy")}</h3>
        <div className="appointments-container">
          {requestedDateResults.slots &&
          requestedDateResults.slots.length > 0 ? (
            requestedDateResults.slots.map((appointment, index) => (
              <div key={appointment} className="appointment-item">
                <button onClick={() => setTime(appointment)}>
                  {appointment}
                </button>
              </div>
            ))
          ) : (
            <p>No appointments for this day</p>
          )}
          {time && date ? (
            <button onClick={handleSubmitAppointment}>Next</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
