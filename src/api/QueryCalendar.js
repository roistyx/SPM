import axios from "axios";
import { DateTime } from "luxon";
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
        "http://localhost:3100/calendar/post-calendar-availability",
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
    // console.log("utcDateTime", dateString);

    try {
      const response = await axios.post(
        "http://localhost:3100/calendar/post-day-appointments",
        {
          requestDateInUtcDateTime,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error while calling getCalendarData API ", error);
    }
  }

  static async addAppointment(userAppointmentData) {
    try {
      const response = await axios.post(
        "http://localhost:3100/calendar/add-appointment",
        userAppointmentData
      );
      return response;
    } catch (error) {
      console.log("Error while calling confirmAppointment API ", error);
    }
  }
}
