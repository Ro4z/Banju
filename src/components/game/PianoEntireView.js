import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Piano} from 'react-native-piano';

const PianoEntireView = () => {
  return (
    <View style={styles.mainContainer}>
      {/* 아니 빨간 줄 왜 생기는거야 */}
      <Piano
        noteRange={{first: 'a0', last: 'c8'}}
        onPlayNoteInput={(midi) => {}}
        onStopNoteInput={(midi) => {}}
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
    backgroundColor: 'yellow',
  },
});
