import React from 'react';
import './AppointmentDateTitle.css';

function AppointmentDateTitle({ selectedObj }) {
  function extractAppointmentInfo(selectedObj) {
    // Parse the start time
    const startTime = new Date(selectedObj.startTime);

    // Extract date
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = startTime.toLocaleDateString('en-US', options);

    // Extract start time
    const startTimeStr = startTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
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
    <div className="appointment-title-container">
      Appointment date:
      <span className="date-and-time">{extractedInfo.date}</span>
      Time:
      <span className="date-and-time">
        {extractedInfo.startTime} - {extractedInfo.duration}
      </span>
    </div>
  );
}

export default AppointmentDateTitle;
