import axios from "axios";

export default class QueryCalendar {
  static async getCalendarAvailability(navigationDate) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const response = await axios.post(
        "http://localhost:3100/calendar/get-calendar-availability",
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

  static async getDayAppointments(navigationDate) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("timeZone", timeZone);
    try {
      const response = await axios.post(
        "http://localhost:3100/calendar/get-day-appointments",
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

  static async addAppointment(appointmentObject) {
    try {
      const response = await axios.post(
        "http://localhost:3100/calendar/add-appointment",
        appointmentObject
      );
      return response;
    } catch (error) {
      console.log("Error while calling confirmAppointment API ", error);
    }
  }
}
