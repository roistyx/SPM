import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import format from "date-fns/format";
import QueryCalendar from "../../api/QueryCalendar";

export default function BasicDateCalendar() {
  const [dateValue, setDateValue] = useState(new Date());

  const handleDateChange = async (newDate) => {
    setDateValue(newDate);
    try {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      const response = await QueryCalendar.getCalendarData(formattedDate);
      console.log("response from getCalendarData API ", response);
    } catch (error) {
      console.log("Error while calling handleDateChange ", error);
    }
    return;
  };

  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        date={dateValue}
        onChange={handleDateChange}
        minDate={minDate}
        views={["day"]}
        openTo="day"
      />
    </LocalizationProvider>
  );
}
