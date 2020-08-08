import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Piano from '../piano';

const PianoEntireView = () => {
  return (
    <View style={styles.mainContainer}>
      <Piano
        noteRange={{first: 'a0', last: 'c8'}}
        onPlayNoteInput={(midi) => {}}
        onStopNoteInput={(midi) => {}}
        heightValue={70}
      />
    </View>
  );
};

export default PianoEntireView;

//TODO: layout 점검
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 120,
  },
});
