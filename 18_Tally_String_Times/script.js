const listItems = Array.from(document.querySelectorAll("li[data-time]"));
const accumulatedTime = listItems.reduce(
  (acc, listItem, currentindex, listItemsArray) => {
    const [minutes, seconds] = listItem.dataset.time.split(":");
    acc.minutes += parseInt(minutes);
    acc.seconds += parseInt(seconds);
    return acc;
  },
  {
    minutes: 0,
    seconds: 0,
  }
);

const accumulatedTimeString = createTimeString(accumulatedTime);

function createTimeString(accumulatedTimeObj) {
  const { minutes, seconds } = accumulatedTimeObj;
  if (minutes < 0) throw new Error(`value of minutes was ${minutes}`);
  if (seconds < 0) throw new Error(`value of seconds was ${seconds}`);
  const minutesInHour = 60;
  const secondsInMinute = 60;
  const totalHours = Math.trunc(
    (minutes + secondsToMinutesInt(seconds)) / minutesInHour
  );
  const totalSeconds = seconds % secondsInMinute;
  const totalMinutes = (minutes + secondsToMinutesInt(seconds)) % minutesInHour;
  return `${totalHours} Hours, ${totalMinutes} Minutes, ${totalSeconds} Seconds`;
}

function secondsToMinutesInt(seconds) {
  if (typeof seconds !== "number") {
    throw Error(
      `seconds must be of type Number, recieved type ${typeof seconds} instead`
    );
  }
  if (seconds < 0) {
    throw new Error(`seconds must be positive, recieved ${seconds} instead`);
  }
  const secondsInMinute = 60;
  return Math.trunc(seconds / secondsInMinute);
}

console.log(accumulatedTimeString);

module.exports = {
  secondsToMinutesInt,
  createTimeString,
};
