const truncateString = (str, length) => {
  if (str.length < length) return;

  return str.slice(0, length) + '...';
};

export default truncateString;
