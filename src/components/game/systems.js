import {BlueNote} from './Note';
import {SPEED} from '../../constants/game/speed';
import {HEIGHT} from '../../constants/dimensions';
import {RADIUS} from '../../constants/game/note';
import {stroke, stop} from '../../utils/piano/sound_player';
import {TEST_CHORD as test} from '../../constants/game/chord_test';
import {TabBarIOSItem} from 'react-native';

const MoveFinger = (entities, {touches}) => {
  touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      let finger = entities[t.id];
      if (finger && finger.position) {
        finger.position = [
          finger.position[0] + t.delta.pageX,
          finger.position[1] + t.delta.pageY,
        ];
      }
    });

  return entities;
};

var eng = /^[a-zA-Z]*$/;
let curPoint = 0;
let _progress = 0;
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
        const table = state['table'];
        console.log(curPoint);
        table.chord = [
          test[curPoint - 1].note,
          curPoint < test.length ? test[curPoint].note : '',
          curPoint < test.length - 1 ? test[curPoint + 1].note : '',
        ];

        stroke(obj.code);
        stop(obj.code);

        const progressBar = state['progressBar'];
        _progress += 0.143;
        progressBar.progress = _progress;
        delete state[key];
      }
    }
  }
  return state;
};

let wormIds = 0;
const Spawn = (state, {touches}) => {
  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      console.log(Object.keys(state).length);
      if (Object.keys(state).length < 10) {
        state[++wormIds] = {
          position: [t.event.pageX, t.event.pageY],
          renderer: BlueNote,
        };
      }
    });

  return state;
};

export {MoveFinger, Spawn, Move};
