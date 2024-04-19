import React from "react";

function CalendarBody(date, today, dateData, onDateSelect) {
  const generateCalendarDates = () => {
    const dates = [];
    const monthAndYear = format(processedDate, "MMMM yyyy");

    const firstDayOfMonth = new Date(
      processedDate.getFullYear(),
      processedDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      processedDate.getFullYear(),
      processedDate.getMonth() + 1,
      0
    );
    const lastDayOfPreviousMonth = new Date(
      processedDate.getFullYear(),
      processedDate.getMonth(),
      0
    ).getDate();

    // Days from the previous month
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      dates.push({
        day: lastDayOfPreviousMonth - i + 1,
        isCurrentMonth: false,
        isPreviousMonth: true,
      });
    }

    // Days of the current month
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      dates.push({
        day: d,
        isCurrentMonth: true,
      });
    }

    // Days from the next month to complete the week
    const daysToCompleteRow = 7 - lastDayOfMonth.getDay() - 1;
    for (let d = 1; d <= daysToCompleteRow; d++) {
      dates.push({
        day: d,
        isNextMonth: true,
        isCurrentMonth: false,
      });
    }

    return dates;
  };

  const dates = generateCalendarDates();

  return <div onClick={() => onDateSelect}> {date.day} </div>;
}

export default CalendarBody;
