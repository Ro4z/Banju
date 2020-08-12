import {WIDTH, HEIGHT} from '../dimensions';
import {RADIUS} from './note';

const PADDING = 40;

const TEST_CHORD = [
  {
    note: 'A4',
    position: [RADIUS * 2 * 35 + PADDING, HEIGHT / 3.5],
  },
  {
    note: 'G4',
    position: [RADIUS * 2 * 34 + PADDING, HEIGHT / 3.5],
  },
  {
    note: 'F4',
    position: [RADIUS * 2 * 33 + PADDING, HEIGHT / 3.5],
  },
  {
    note: 'G4',
    position: [RADIUS * 2 * 34 + PADDING, HEIGHT / 3.5],
  },
  {
    note: 'A4',
    position: [RADIUS * 2 * 35 + PADDING, HEIGHT / 3.5],
  },
  {
    note: 'A4',
    position: [RADIUS * 2 * 35 + PADDING, HEIGHT / 3.5],
  },
  {
    note: 'A4',
    position: [RADIUS * 2 * 35 + PADDING, HEIGHT / 3.5],
  },
];

export {TEST_CHORD};
