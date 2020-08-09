import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Piano from '.';

const PianoEntireView = () => {
  return (
    <View style={styles.mainContainer}>
      <Piano
        noteRange={{first: 'a0', last: 'c8'}}
        onPlayNoteInput={(chord) => {
          console.log(chord);
        }}
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
