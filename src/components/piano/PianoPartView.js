import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Player from 'react-native-sound-player';

import Piano from './Piano';
import {stroke, stop} from '../../utils/piano/sound_player';

const PianoPartView = ({position}) => {
  const x = position[0];
  const y = position[1];

  return (
    <View style={[styles.mainContainer, {left: x, top: y}]}>
      <Piano
        noteRange={{first: 'c4', last: 'b4'}}
        onPlayNoteInput={(chord) => {
          Player.playSoundFile(chord.replace('#', 's'), 'mp3');
          //stroke(chord.replace('#', 's'));
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
    width: 500,
    height: 300,
  },
});
