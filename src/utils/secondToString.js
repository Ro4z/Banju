import { string } from 'prop-types';

/**
 * covert second to string format (MM:SS)
 * @param {Number} second
 */
const secondToString = (second = 0) => {
  let minutes = Math.floor(second / 60);
  let seconds = Math.floor(second % 60);

  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

export default secondToString;
