export function getTimePeriod(hour) {
  return hour > 11 ? 'pm' : 'am';
}

export function formatHour(hourString) {
  const hour = hourString.slice(0, 2) % 24;
  const minutes = hourString.slice(2);

  const formattedHour = `${hour}:${minutes}`;

  return `${formattedHour} ${getTimePeriod(hour)}`;
}

export function getFormattedHoursForDay([weekday, hours]) {
  const formattedHours = hours.map(
    (hourObject) => `${formatHour(hourObject.start)} - ${formatHour(hourObject.end)}`
  );

  return [weekday, ...formattedHours];
}

export function formatDayHours(groupDayHours) {
  return Object.entries(groupDayHours).map(getFormattedHoursForDay);
}

export function groupHoursByDay(hours) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const hoursByDay = hours.reduce(function groupHours(groupByDayStore, currentValue) {
    const weekday = weekdays[currentValue.day];
    const hoursToAppend = groupByDayStore[weekday]
      ? [...groupByDayStore[weekday], currentValue]
      : [currentValue];

    return { ...groupByDayStore, [weekday]: hoursToAppend };
  }, {});

  return hoursByDay;
}

export function OpeningDayHours({ weekday, hours }) {
  const componentContainer = document.createElement('div');

  const markup = `
    <div>
      <p>
        ${weekday} - ${hours}
      </p>
    </div>
  `;

  initComponent();

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);
  }

  function getContainer() {
    return componentContainer;
  }

  return { getContainer };
}