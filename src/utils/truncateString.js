/**
 * return String truncation result
 * @param {String} str target string
 * @param {Number} length truncation length
 */
const truncateString = (str, length = 10) => {
  if (str.length < length) return;

  return str.slice(0, length) + '...';
};

export default truncateString;
