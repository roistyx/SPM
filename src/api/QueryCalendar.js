import axios from "axios";
import { DateTime } from "luxon";

const serverUrl = process.env.REACT_APP_API_URL;
console.log("serverUrl: ", serverUrl);
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
function convertToUTCNewYorkTime(dateString) {
  // Create a DateTime in the America/New_York timezone at the start of the given date
  const newYorkTime = DateTime.fromISO(dateString, {
    zone: timeZone,
  }).startOf("day");

  // Convert this DateTime to UTC
  const utcTime = newYorkTime.toUTC();

  // Return the UTC DateTime as an ISO string
  return utcTime.toISO();
}

export default class QueryCalendar {
  static async postCalendarAvailability(navigationDate) {
    try {
      const response = await axios.post(
        `${serverUrl}/calendar/post-calendar-availability`,
        {
          navigationDate,
          timeZone,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error while calling getCalendarData API ", error);
    }
  }

  static async postDayAppointments(dateString) {
    const requestDateInUtcDateTime = convertToUTCNewYorkTime(dateString);

    try {
      const response = await axios.post(
        `${serverUrl}/calendar/post-day-appointments`,
        {
          requestDateInUtcDateTime,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error while calling getCalendarData API ", error);
    }
  }

  static async submitAppointment(currentFormData, selectedAppointmentObject) {
    try {
      const response = await axios.post(
        `${serverUrl}/calendar/submit-appointment`,
        currentFormData,
        selectedAppointmentObject
      );
      return response;
    } catch (error) {
      console.log("Error while calling confirmAppointment API ", error);
      return {
        error: error.response
          ? error.response.data
          : "An unexpected error occurred",
      };
    }
  }
}
