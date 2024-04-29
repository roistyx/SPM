import axios from 'axios';

export default class QueryCalendar {
  static async getCalendarDataByMonthAndYear(navigationDate) {
    console.log('navigationDate', navigationDate);
    try {
      const response = await axios.post(
        'http://localhost:3100/calendar/get-month-appointments',
        {
          navigationDate,
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
