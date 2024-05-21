import React from "react";

function AppointmentDateTitle({ selectedObj }) {
  function extractAppointmentInfo(selectedObj) {
    // Parse the start time
    const startTime = new Date(selectedObj.startTime);

    // Extract date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = startTime.toLocaleDateString("en-US", options);

    // Extract start time
    const startTimeStr = startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Calculate duration
    const endTime = new Date(selectedObj.endTime);
    const durationMinutes = (endTime - startTime) / (1000 * 60);
    const durationStr = `${durationMinutes} minutes`;

    return { date, startTime: startTimeStr, duration: durationStr };
  }

  const extractedInfo = extractAppointmentInfo(selectedObj);
  // console.log(extractedInfo);
  return (
    <div className="appointment-date-title">
      <h2>{extractedInfo.date}</h2>
      <h3>
        {extractedInfo.startTime} - {extractedInfo.duration}
      </h3>
    </div>
  );
}

export default AppointmentDateTitle;
