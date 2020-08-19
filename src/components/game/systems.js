import React from 'react';

import {SPEED} from '../../constants/game/speed';
import {HEIGHT} from '../../constants/dimensions';
import {RADIUS} from '../../constants/game/note';
import {stroke, stop} from '../../utils/piano/sound_player';
import {TEST_CHORD as test} from '../../constants/game/chord_test';
import {TabBarIOSItem} from 'react-native';

import {SAMPLE} from '../../constants/game/output_sample';
import ChordNote from '../../components/game/ChordNote';

const leftChordArr = SAMPLE.items.noteLeft.items;
const rightChordArr = SAMPLE.items.noteRight.items;

let leftChordTimeArr = [];
let rightChordTimeArr = [];

var isStart = true;

var startSecond = 0,
  prevSecond = 0;
rightChordArr.forEach((note) => {
  if (isStart) {
    startSecond = note.second;
    isStart = false;
    return;
  }
  if (note.key[0].noteOn === 1) {
    rightChordTimeArr.push(prevSecond - startSecond);
    startSecond = note.second;
    prevSecond = note.second;
  } else {
    prevSecond = note.second;
  }
});
var isStart = true;

var startSecond = 0,
  prevSecond = 0;
leftChordArr.forEach((note) => {
  if (isStart) {
    startSecond = note.second;
    isStart = false;
    return;
  }
  if (note.key[0].noteOn === 1) {
    leftChordTimeArr.push(prevSecond - startSecond);
    startSecond = note.second;
    prevSecond = note.second;
  } else {
    prevSecond = note.second;
  }
});

var eng = /^[a-zA-Z]*$/;
let curPoint = 0;
let _progress = 0;
let curTime = 0;

let leftChordArrIdx = 0;
let rightChordArrIdx = 0;

let leftChordTimeArrIdx = 0;
let rightChordTimeArrIdx = 0;

let leftChordNumber = 0;
let rightChordNumber = 0;
let noteNumber = 0;
const Spawn = (state, {touches}) => {
  if (!state.timer.isStart) return state;
  curTime += 0.016;
  if (curTime > rightChordArr[rightChordArrIdx].second) {
    if (rightChordArr[rightChordArrIdx].key[0].noteOn === 1) {
      rightChordArr[rightChordArrIdx].key.forEach((key) => {
        state[noteNumber] = {
          position: [RADIUS * 2 * (key.midiNum - 30) + 40, -380],
          renderer: <ChordNote />,
          length: rightChordTimeArr[rightChordTimeArrIdx],
          isRight: true,
        };
        noteNumber++;
      });
      rightChordTimeArrIdx++;
    }
    rightChordArrIdx++;
  }

  if (curTime > leftChordArr[leftChordArrIdx].second) {
    if (leftChordArr[leftChordArrIdx].key[0].noteOn === 1) {
      leftChordArr[leftChordArrIdx].key.forEach((key) => {
        state[noteNumber] = {
          position: [RADIUS * 2 * (key.midiNum - 30) + 40, -380],
          renderer: <ChordNote />,
          length: leftChordTimeArr[leftChordTimeArrIdx],
        };
        noteNumber++;
      });
      leftChordTimeArrIdx++;
    }
    leftChordArrIdx++;
  }

  return state;
};
const Move = (state, {touches}) => {
  for (const key in state) {
    if (eng.test(key)) {
      continue;
    }
    if (state.hasOwnProperty(key)) {
      const obj = state[key];
      obj.position = [
        obj.position[0],
        obj.position[1] < (HEIGHT * 3) / 5
          ? obj.position[1] + SPEED
          : (HEIGHT * 3) / 5 + RADIUS * 2,
      ];
      //end-line event
      if (obj.position[1] > (HEIGHT * 3) / 5) {
        curPoint++;
        // const table = state.chordTable;
        // console.log(curPoint);
        // table.chord = [
        //   test[curPoint - 1].note,
        //   curPoint < test.length ? test[curPoint].note : '',
        //   curPoint < test.length - 1 ? test[curPoint + 1].note : '',
        // ];

        // stroke(obj.code);
        // stop(obj.code);

        // const progressBar = state.progressBar;
        // _progress += 0.143;
        // progressBar.progress = _progress;
        delete state[key];
      }
    }
  }
  return state;
};

export {Spawn, Move};
