import axios from 'axios';

export default class QueryCalendar {
  static async getCalendarData(date) {
    console.log('date', date);
    try {
      const response = await axios.get(
        `http://localhost:3100/calendar/get-day-appointments/${date}`
      );
      return response.data;
    } catch (error) {
      console.log('Error while calling getCalendarData API ', error);
    }
  }

  static async getCalendarDataByMonthAndYear(date) {
    console.log('date', date);
    // try {
    //   const response = await axios.get(
    //     `http://localhost:3100/calendar/get-month-appointments/${date}`
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.log('Error while calling getCalendarData API ', error);
    // }
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
