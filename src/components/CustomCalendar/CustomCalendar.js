import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import format from "date-fns/format";
import dayjs from "dayjs";

export default function BasicDateCalendar() {
  const [dateValue, setDateValue] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
    console.log(format(newDate, "PPP")); // Example of logging the date in a readable format
  };

  // Set the minimum date to the start of the current month using date-fns
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
