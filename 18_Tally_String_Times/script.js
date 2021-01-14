const listItems = Array.from(document.querySelectorAll("[data-time]"));
const accumulatedTime = listItems.reduce(accumulateTime, {
  minutes: 0,
  seconds: 0,
});
const accumulatedTimeString = createTimeString(accumulatedTime);
console.log(accumulatedTimeString);

//helper functions
function accumulateTime(acc, listItem) {
  if (listItem.length === 0) return acc;
  const [minutes, seconds] = listItem.dataset.time.split(":");
  acc.minutes += parseInt(minutes);
  acc.seconds += parseInt(seconds);
  console.log(acc);
  return acc;
}

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
  //Type checking
  if (typeof seconds !== "number") {
    throw Error(
      `seconds must be of type Number, recieved type ${typeof seconds} instead`
    );
  }
  if (seconds < 0) {
    throw Error(`seconds must be positive, recieved ${seconds} instead`);
  }
  //end Type checking
  const secondsInMinute = 60;
  return Math.trunc(seconds / secondsInMinute);
}

module.exports = {
  secondsToMinutesInt,
  createTimeString,
  accumulateTime,
};
