// WeekListView.js
import React from 'react';
import moment from 'moment';

const WeekListView = ({ events, date, localizer }) => {
  const startOfWeek = moment(date).startOf('week');
  const endOfWeek = moment(date).endOf('week');

  const eventsForWeek = events.filter((event) => {
    const eventStart = moment(event.start);
    const eventEnd = moment(event.end);
    return (
      eventStart.isBetween(startOfWeek, endOfWeek, null, '[]') ||
      eventEnd.isBetween(startOfWeek, endOfWeek, null, '[]')
    );
  });

  return (
    <div>
      {eventsForWeek.map((event, index) => (
        <div key={index}>
          <strong>
            {localizer.format(event.start, 'dddd, MMMM Do')}
          </strong>
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
};

// Define the title function for the custom view
WeekListView.title = (date, { localizer }) => {
  const startOfWeek = localizer.startOfWeek(date);
  const endOfWeek = moment(startOfWeek).add(6, 'days'); // Adjust based on how you define a week
  return `${localizer.format(
    startOfWeek,
    'MMM DD'
  )} - ${localizer.format(endOfWeek, 'MMM DD, YYYY')}`;
};

export default WeekListView;
