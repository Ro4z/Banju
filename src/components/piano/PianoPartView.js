import React from 'react';
import { StyleSheet, View } from 'react-native';
import PianoSampler from 'react-native-piano-sampler';

import Piano from './Piano';
import { BACKGROUND_COLOR } from '../../constants/color';

PianoSampler.prepare();

const PianoPartView = ({ touchedKey, nextKey, firstKey = 'f2', lastKey = 'b4' }) => {
  // const x = position[0];
  // const y = position[1];

  return (
    <View style={[styles.mainContainer]}>
      <Piano
        noteRange={{ first: firstKey, last: lastKey }}
        touchedKey={touchedKey || []}
        nextKey={nextKey || []}
        onPlayNoteInput={(chord, midi) => {
          console.log(midi);
          PianoSampler.playNote(midi, 115);
        }}
        onStopNoteInput={(chord, midi) => {
          PianoSampler.stopNote(midi);
        }}
      />
    </View>
  );
};

export default React.memo(PianoPartView, (prevProps, nextProps) => {
  return (
    prevProps.touchedKey === nextProps.touchedKey &&
    prevProps.nextKey === nextProps.nextKey &&
    prevProps.firstKey === nextProps.firstKey
  );
});

// TODO: layout 점검
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
