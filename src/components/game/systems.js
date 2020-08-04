import {BlueNote} from './Note';
import {SPEED} from '../../constants/game/speed';
import {HEIGHT} from '../../constants/dimensions';

const MoveFinger = (entities, {touches}) => {
  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

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

let wormIds = 0;

const Move = (state, {touches}) => {
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      const obj = state[key];
      obj.position = [
        obj.position[0],
        obj.position[1] < (HEIGHT * 3) / 5 ? obj.position[1] + SPEED : 0,
        ,
      ];
    }
  }
  return state;
};

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
