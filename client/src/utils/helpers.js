export function addZeroes(num) {
  return num.toFixed(Math.max(((`${num}`).split('.')[1] || '').length, 2));
}

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
export function dayDifference(date1, date2) {
  const timeDiff = Math.abs(new Date(date2) - new Date(date1));
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays + 1;
};


export function greeting() {
  const today = new Date()
  const curHr = today.getHours()
  let time = "";

  if (curHr < 12) {
    time = "Morning";
  } else if (curHr < 18) {
    time = "Afternoon";
  } else {
    time = "Evening";
  }

  return time;
};