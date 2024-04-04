import { OpeningDayHours, formatDayHours } from './DayHour.js';

export function BusinessHours({ isOpen, dayHours }) {
  // TODO: extract function to render list in utils or similar
  const markup = `
    <div>
      <p>${isOpen ? 'Open' : 'Closed'}</p>
      <div>
        ${dayHours
          .map((dayHour) => {
            return OpeningDayHours({ weekday: dayHour[0], hours: dayHour[1] }).getMarkup();
          })
          .join('')}
      </div>
    </div>
  `;

  function getMarkup() {
    return markup;
  }

  return {
    getMarkup,
  };
}