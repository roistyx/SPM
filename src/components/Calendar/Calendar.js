import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import format from "date-fns/format";
import QueryCalendar from "../../api/QueryCalendar";
import "./Calendar.css";

export default function Calendar() {
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [requestedDateResults, setRequestedDateResults] = useState({});
  // console.log("response from getCalendarData API ", requestedDateResults);

  const handleDateChange = async (newDate) => {
    setRequestedDateResults({});
    setDatePickerValue(newDate);
    try {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      const response = await QueryCalendar.getCalendarData(formattedDate);
      setRequestedDateResults(response.data);
    } catch (error) {
      console.log("Error while calling handleDateChange ", error);
    }
    return;
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
                <button
                  onClick={() =>
                    console.log(`Appointment selected: ${appointment}`)
                  }>
                  {appointment}
                </button>
              </div>
            ))
          ) : (
            <p>No appointments for this day</p>
          )}
        </div>
      </div>
    </div>
  );
}
