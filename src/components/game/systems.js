import React from 'react';

import {SPEED} from '../../constants/game/speed';
import {HEIGHT} from '../../constants/dimensions';
import {RADIUS} from '../../constants/game/note';
import {stroke, stop} from '../../utils/piano/sound_player';
import PianoSampler from '../../utils/engine/piano_sampler';

import {SAMPLE} from '../../constants/game/output_sample';
import ChordNote from '../../components/game/ChordNote';

const leftNoteArr = SAMPLE.items.noteLeft.items;
const rightNoteArr = SAMPLE.items.noteRight.items;
const chordArr = SAMPLE.items.chord.notes;

let leftNoteTimeArr = [];
let rightNoteTimeArr = [];

var isStart = true;

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

var eng = /^[a-zA-Z]*$/;

// These below variables are must be initialized
let curTime = 0;
let tableTime = 0;

let leftNoteArrIdx = 0;
let rightNoteArrIdx = 0;

let leftNoteTimeArrIdx = 0;
let rightNoteTimeArrIdx = 0;
let chordArrIdx = 0;

const startYPos = (3 * HEIGHT) / 5 - (882 / 2515) * HEIGHT - 548000 / 2516 + 80;
let noteNumber = 0;
const Spawn = (state, {touches}) => {
  if (!state.timer.isStart) return state;

  var elapsedTime = Date.now() - state.timer.startTime;
  curTime = (elapsedTime / 1000 + 1.37).toFixed(3);
  tableTime = (elapsedTime / 1000).toFixed(3);

  // move chord table
  if (tableTime > chordArr[chordArrIdx].second) {
    const table = state.chordTable;
    chordArrIdx++;
    table.chord = [
      chordArr[chordArrIdx - 1].name,
      chordArrIdx < chordArr.length ? chordArr[chordArrIdx].name : '',
      chordArrIdx < chordArr.length - 1 ? chordArr[chordArrIdx + 1].name : '',
    ];
  }

  if (curTime > rightNoteArr[rightNoteArrIdx].second) {
    if (rightNoteArr[rightNoteArrIdx].key[0].noteOn === 1) {
      console.log('right note', rightNoteArr[rightNoteArrIdx].second);
      rightNoteArr[rightNoteArrIdx].key.forEach((key) => {
        state[noteNumber] = {
          isRight: true,
          position: [
            RADIUS * 2 * (key.midiNum - 30) + 40,
            startYPos - rightNoteTimeArr[rightNoteTimeArrIdx] * HEIGHT * 0.407,
          ],
          renderer: <ChordNote />,
          second: rightNoteTimeArr[rightNoteTimeArrIdx],
          midiNum: key.midiNum,
          isPlayed: false,
        };
        noteNumber++;
      });
      rightNoteTimeArrIdx++;
    }
    rightNoteArrIdx++;
  }

  if (curTime > leftNoteArr[leftNoteArrIdx].second) {
    if (leftNoteArr[leftNoteArrIdx].key[0].noteOn === 1) {
      console.log('left note', leftNoteArr[leftNoteArrIdx].second);
      leftNoteArr[leftNoteArrIdx].key.forEach((key) => {
        state[noteNumber] = {
          position: [
            RADIUS * 2 * (key.midiNum - 30) + 40,
            startYPos - leftNoteTimeArr[leftNoteTimeArrIdx] * HEIGHT * 0.407,
          ],
          renderer: <ChordNote />,
          second: leftNoteTimeArr[leftNoteTimeArrIdx],
          midiNum: key.midiNum,
          isPlayed: false,
        };
        noteNumber++;
      });
      leftNoteTimeArrIdx++;
    }
    leftNoteArrIdx++;
  }

  return state;
};
const Move = (state, {touches}) => {
  if (!state.timer.isStart) return state;
  for (const key in state) {
    if (eng.test(key)) {
      continue;
    }
    if (state.hasOwnProperty(key)) {
      const obj = state[key];
      const length = obj.second * HEIGHT * 0.407;
      obj.position = [
        obj.position[0],
        obj.position[1] < (HEIGHT * 3) / 5
          ? obj.position[1] + SPEED
          : (HEIGHT * 3) / 5 + RADIUS * 2,
      ];

      // check the note reach at end-line first, and played
      if (
        obj.position[1] > (HEIGHT * 3) / 5 - length + 40 &&
        obj.isPlayed === false
      ) {
        obj.isPlayed = true;
        PianoSampler.playNote(obj.midiNum, 115);
      }

      if (obj.position[1] > (HEIGHT * 3) / 5) {
        PianoSampler.stopNote(obj.midiNum);
        delete state[key];
      }
    }
  }
  return state;
};

export {Spawn, Move};
