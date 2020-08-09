import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Piano from './Piano';

import {stroke, stop} from '../../utils/piano/sound_player';

const PianoEntireView = () => {
  return (
    <View style={styles.mainContainer}>
      <Piano
        noteRange={{first: 'c4', last: 'b4'}}
        onPlayNoteInput={(chord) => {
          stroke(chord.replace('#', 's'));
        }}
        onStopNoteInput={(chord) => {
          stop(chord.replace('#', 's'));
        }}
        heightValue={150}
      />
    </View>
  );
};

export default PianoEntireView;

//TODO: layout 점검
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
