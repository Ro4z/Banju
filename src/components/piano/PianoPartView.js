import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PianoSampler from 'react-native-piano-sampler';

import Piano from './Piano';
import {BACKGROUND_COLOR} from '../../constants/color';

PianoSampler.prepare();

const PianoPartView = ({
  touchedKey,
  nextKey,
  firstKey = 'c4',
  lastKey = 'b4',
}) => {
  // const x = position[0];
  // const y = position[1];

  return (
    <View style={[styles.mainContainer]}>
      <Piano
        noteRange={{first: firstKey, last: lastKey}}
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

export default PianoPartView;

//TODO: layout 점검
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
