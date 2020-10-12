/**
 * get play time each note
 * @param {Array} noteArr array of piano note from Banju API
 */
const getNoteTimeEachNote = (noteArr) => {
  var noteTimeArr = [];
  var isStart = true;
  var startSecond = 0,
    prevSecond = 0;
  noteArr.forEach((note) => {
    if (isStart && note.key.length !== 0) {
      startSecond = note.second;
      isStart = false;
      return;
    }
    if (note.key.length !== 0) {
      if (note.key[0].noteOn === 1) {
        noteTimeArr.push(note.second - startSecond);
        startSecond = note.second;
        prevSecond = note.second;
      } else {
        prevSecond = note.second;
      }
    }
  });

  return noteTimeArr;
};

export default getNoteTimeEachNote;
