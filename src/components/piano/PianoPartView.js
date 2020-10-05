import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Player from 'react-native-sound-player';

import Piano from './Piano';
import PianoSampler from '../../utils/engine/piano_sampler';
import {BACKGROUND_COLOR} from '../../constants/color';

const PianoPartView = ({position, firstKey = 'c4', lastKey = 'b4'}) => {
  // const x = position[0];
  // const y = position[1];

  return (
    <View style={[styles.mainContainer]}>
      <Piano
        noteRange={{first: firstKey, last: lastKey}}
        onPlayNoteInput={(chord, midi) => {
          PianoSampler.playNote(midi, 115);
        }}
        onStopNoteInput={(chord, midi) => {
          PianoSampler.stopNote(midi);
        }}
        heightValue={150}
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
