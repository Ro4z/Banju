/**
 * @param {TimeStamp} date
 */
const calculateDaybefore = (date = null) => {
  const date1 = Date.now();
  const date2 = date;
  // To calculate the time difference of two dates

  const milliseconds = date1 - date2;
  const totalSeconds = parseInt(Math.floor(milliseconds / 1000), 10);
  const totalMinutes = parseInt(Math.floor(totalSeconds / 60), 10);
  const totalHours = parseInt(Math.floor(totalMinutes / 60), 10);
  const days = parseInt(Math.floor(totalHours / 24), 10);

  if (totalHours === 0) {
    return `${totalMinutes}분 전`;
  }
  if (days === 0) {
    return `${totalHours}분 전`;
  }
  return `${days}일 전`;
};

export default calculateDaybefore;
