import axios from 'axios';
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const timeZone = 'America/Los_Angeles';

export default class QueryCalendar {
  static async postCalendarAvailability(navigationDate) {
    try {
      const response = await axios.post(
        'http://localhost:3100/calendar/post-calendar-availability',
        {
          navigationDate,
          timeZone,
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error while calling getCalendarData API ', error);
    }
  }

  static async postDayAppointments(navigationDate) {
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log('timeZone', timeZone);
    try {
      const response = await axios.post(
        'http://localhost:3100/calendar/post-day-appointments',
        {
          navigationDate,
          timeZone,
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error while calling getCalendarData API ', error);
    }
  }

  static async addAppointment(appointmentObject) {
    try {
      const response = await axios.post(
        'http://localhost:3100/calendar/add-appointment',
        appointmentObject
      );
      return response;
    } catch (error) {
      console.log(
        'Error while calling confirmAppointment API ',
        error
      );
    }
  }
}
