import {SAMPLE} from './game/output_sample';

const leftNoteArr = SAMPLE.items.noteLeft.items;
const rightNoteArr = SAMPLE.items.noteRight.items;
const chordArr = SAMPLE.items.chord.notes;

let leftNoteTimeArr = [];
let rightNoteTimeArr = [];

var startSecond = 0,
  prevSecond = 0;
rightNoteArr.forEach((note) => {
  if (isStart) {
    startSecond = note.second;
    isStart = false;
    return;
  }
  if (note.key[0].noteOn === 1) {
    rightNoteTimeArr.push(prevSecond - startSecond);
    startSecond = note.second;
    prevSecond = note.second;
  } else {
    prevSecond = note.second;
  }
});
var isStart = true;

var startSecond = 0,
  prevSecond = 0;

leftNoteArr.forEach((note) => {
  if (isStart) {
    startSecond = note.second;
    isStart = false;
    return;
  }
  if (note.key[0].noteOn === 1) {
    leftNoteTimeArr.push(prevSecond - startSecond);
    startSecond = note.second;
    prevSecond = note.second;
  } else {
    prevSecond = note.second;
  }
});

export {leftNoteArr, rightNoteArr, chordArr};
