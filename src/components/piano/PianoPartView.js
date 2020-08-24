import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Player from 'react-native-sound-player';

import Piano from './Piano';
import PianoSampler from '../../utils/engine/piano_sampler';
import {stroke, stop} from '../../utils/piano/sound_player';
import MidiNumbers from './MidiNumbers';

const PianoPartView = ({position}) => {
  // const x = position[0];
  // const y = position[1];

  return (
    <View style={[styles.mainContainer]}>
      <Piano
        noteRange={{first: 'c4', last: 'b4'}}
        onPlayNoteInput={(chord, midi) => {
          PianoSampler.playNote(midi, 115);
        }}
        onStopNoteInput={(chord) => {
          //stop(chord.replace('#', 's'));
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
  },
});
