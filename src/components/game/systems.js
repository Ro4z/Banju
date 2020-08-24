import React from 'react';

import {SPEED} from '../../constants/game/speed';
import {HEIGHT} from '../../constants/dimensions';
import {RADIUS} from '../../constants/game/note';
import {stroke, stop} from '../../utils/piano/sound_player';
import PianoSampler from '../../utils/engine/piano_sampler';

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

  var elapsedTime = Date.now() - state.timer.startTime;
  curTime = (elapsedTime / 1000).toFixed(3);

  if (curTime > rightChordArr[rightChordArrIdx].second) {
    if (rightChordArr[rightChordArrIdx].key[0].noteOn === 1) {
      console.log('right note', rightChordArr[rightChordArrIdx].second);
      rightChordArr[rightChordArrIdx].key.forEach((key) => {
        state[noteNumber] = {
          isRight: true,
          position: [
            RADIUS * 2 * (key.midiNum - 30) + 40,
            -400 - rightChordTimeArr[rightChordTimeArrIdx] * HEIGHT * 0.407,
          ],
          renderer: <ChordNote />,
          second: rightChordTimeArr[rightChordTimeArrIdx],
          midiNum: key.midiNum,
          isPlayed: false,
        };
        noteNumber++;
      });
      rightChordTimeArrIdx++;
    }
    rightChordArrIdx++;
  }

  if (curTime > leftChordArr[leftChordArrIdx].second) {
    if (leftChordArr[leftChordArrIdx].key[0].noteOn === 1) {
      console.log('left note', leftChordArr[leftChordArrIdx].second);
      leftChordArr[leftChordArrIdx].key.forEach((key) => {
        state[noteNumber] = {
          position: [
            RADIUS * 2 * (key.midiNum - 30) + 40,
            -400 - leftChordTimeArr[leftChordTimeArrIdx] * HEIGHT * 0.407,
          ],
          renderer: <ChordNote />,
          second: leftChordTimeArr[leftChordTimeArrIdx],
          midiNum: key.midiNum,
          isPlayed: false,
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
      const length = obj.second * HEIGHT * 0.407;
      obj.position = [
        obj.position[0],
        obj.position[1] < (HEIGHT * 3) / 5
          ? obj.position[1] + SPEED
          : (HEIGHT * 3) / 5 + RADIUS * 2,
      ];

      // check the note reach at end-line first
      if (
        obj.position[1] > (HEIGHT * 3) / 5 - length + 40 &&
        obj.isPlayed === false
      ) {
        console.log(obj.midiNum);
        obj.isPlayed = true;
        PianoSampler.playNote(obj.midiNum, 115);
      }

      if (obj.position[1] > (HEIGHT * 3) / 5) {
        delete state[key];

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
        // delete state[key];
      }
    }
  }
  return state;
};

export {Spawn, Move};
