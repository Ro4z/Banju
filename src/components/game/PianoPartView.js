import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Piano from '../piano';

const PianoEntireView = () => {
  return (
    <View style={styles.mainContainer}>
      <Piano
        noteRange={{first: 'c4', last: 'b4'}}
        onPlayNoteInput={(midi) => {}}
        onStopNoteInput={(midi) => {}}
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
